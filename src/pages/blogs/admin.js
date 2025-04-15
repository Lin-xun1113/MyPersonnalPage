import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useWeb3 } from '../../utils/Web3Provider';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ADMIN_ADDRESSES } from '../../utils/web3Config';
import { mockBlogs } from '../../utils/mockData';
import '../../styles/modern-blog.css';

const AdminPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { isConnected, address, isAdmin, signMessage } = useWeb3();
  const [adminAddress, setAdminAddress] = useState('');
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // 检查是否有管理员权限
  useEffect(() => {
    if (!isConnected) {
      // 如果未连接钱包，等待连接
      return;
    }
    
    // 从本地存储获取管理员地址列表
    const storedAdminAddresses = window.localStorage.getItem('adminAddresses');
    let adminList = [];
    
    if (storedAdminAddresses) {
      try {
        adminList = JSON.parse(storedAdminAddresses);
      } catch (e) {
        console.error('解析管理员地址失败:', e);
      }
    }
    
    // 添加内置的管理员地址
    adminList = [...adminList, ...ADMIN_ADDRESSES];
    
    // 检查当前连接的地址是否在管理员列表中
    const hasAccess = adminList.some(
      admin => admin.toLowerCase() === address?.toLowerCase()
    );
    
    if (!hasAccess) {
      // 如果不是管理员，重定向到博客列表页面
      alert('您没有管理员权限访问此页面');
      router.push('/blogs');
    }
  }, [isConnected, address, router, isAdmin]);
  
  // 获取博客列表
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        
        // 判断是否在本地开发环境
        const isLocalDev = process.env.NODE_ENV === 'development';
        
        if (isLocalDev) {
          // 在本地开发环境中使用模拟数据
          console.log('管理页面：使用模拟数据');
          // 模拟加载时间
          setTimeout(() => {
            const sortedBlogs = [...mockBlogs].sort((a, b) => 
              new Date(b.createdAt) - new Date(a.createdAt)
            );
            setBlogs(sortedBlogs);
            setLoading(false);
          }, 800);
        } else {
          // 在生产环境中使用Netlify Functions
          const response = await fetch('/.netlify/functions/blogs');
          if (!response.ok) {
            throw new Error('获取博客列表失败');
          }
          const data = await response.json();
          // 按创建时间排序，最新的在前面
          const sortedBlogs = data.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBlogs(sortedBlogs);
          setLoading(false);
        }
      } catch (error) {
        console.error('获取博客列表出错:', error);
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);
  
  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 处理添加/编辑博客表单提交
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected || !isAdmin) {
      alert('您需要使用管理员钱包连接才能执行此操作');
      return;
    }
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('标题和内容不能为空');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // 生成要签名的消息
      const operation = editingId ? 'update' : 'add';
      const messageToSign = `我正在${operation === 'add' ? '创建' : '更新'}博客: ${formData.title}`;
      console.log('准备签名消息:', messageToSign);
      
      let signature, message;
      try {
        const result = await signMessage(messageToSign);
        signature = result.signature;
        message = result.message;
        console.log('签名成功:', {
          signatureLength: signature ? signature.length : 0,
          message
        });
      } catch (signError) {
        console.error('签名失败:', signError);
        alert(`签名失败: ${signError.message}`);
        setSubmitting(false);
        return;
      }
      
      // 获取管理员地址列表
      const storedAdminAddresses = window.localStorage.getItem('adminAddresses');
      let adminList = [];
      
      if (storedAdminAddresses) {
        try {
          adminList = JSON.parse(storedAdminAddresses);
        } catch (e) {}
      }
      
      // 判断是否在本地开发环境
      const isLocalDev = process.env.NODE_ENV === 'development';
      
      if (isLocalDev) {
        // 在本地开发环境中模拟添加/更新博客
        console.log(`管理页面：${operation === 'add' ? '创建' : '更新'}博客`);
        
        // 模拟加载时间
        setTimeout(() => {
          let updatedBlogs = [...blogs];
          
          if (operation === 'add') {
            // 创建新博客
            const newBlog = {
              id: Date.now().toString(),
              title: formData.title,
              content: formData.content,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              comments: []
            };
            updatedBlogs = [newBlog, ...updatedBlogs];
          } else {
            // 更新现有博客
            const index = updatedBlogs.findIndex(b => b.id === editingId);
            if (index !== -1) {
              updatedBlogs[index] = {
                ...updatedBlogs[index],
                title: formData.title,
                content: formData.content,
                updatedAt: new Date().toISOString()
              };
            }
          }
          
          // 重置表单
          setFormData({ title: '', content: '' });
          setEditingId(null);
          setBlogs(updatedBlogs);
          
          alert(operation === 'add' ? '博客创建成功' : '博客更新成功');
          setSubmitting(false);
        }, 1000);
      } else {
        // 在生产环境中使用Netlify Functions
        console.log('正在尝试发送请求到Netlify Function...');
        console.log('请求URL:', '/.netlify/functions/updateBlog');
        console.log('请求数据:', {
          operation: editingId ? 'update' : 'add',
          blogTitle: formData.title,
          address: address,
          signatureAvailable: !!signature,
          adminListLength: adminList.length + ADMIN_ADDRESSES.length
        });
        
        try {
          const requestBody = {
            operation: editingId ? 'update' : 'add',
            blog: editingId ? { ...formData, id: editingId } : formData,
            address,
            signature,
            message: messageToSign,
            adminList: [...adminList, ...ADMIN_ADDRESSES],
          };
          
          console.log('完整请求内容:', JSON.stringify(requestBody).substring(0, 200) + '...');
          
          // 直接使用XMLHttpRequest而非fetch，更容易跟踪错误
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/.netlify/functions/updateBlog', true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          
          xhr.onreadystatechange = function() {
            console.log(`XHR状态变化: readyState=${xhr.readyState}, status=${xhr.status}`);
            
            if (xhr.readyState === 4) { // 请求完成
              if (xhr.status >= 200 && xhr.status < 300) { // 成功
                console.log('已收到成功响应:', xhr.status);
                const data = JSON.parse(xhr.responseText);
                
                // 重置表单
                setFormData({ title: '', content: '' });
                setEditingId(null);
                setBlogs(data.blogs);
                
                alert(editingId ? '博客更新成功' : '博客创建成功');
                setSubmitting(false);
              } else { // 失败
                console.error('请求失败:', xhr.status, xhr.responseText);
                try {
                  const errorData = JSON.parse(xhr.responseText);
                  alert(`操作失败: ${errorData.error || '未知错误'}`);
                } catch (e) {
                  alert(`服务器错误 (${xhr.status}): ${xhr.responseText.substring(0, 100)}`);
                }
                setSubmitting(false);
                document.getElementById('submitButton')?.removeAttribute('disabled');
              }
            }
          };
          
          xhr.onerror = function() {
            console.error('网络错误:', xhr.statusText);
            alert(`网络错误: 无法连接到服务器`);
            setSubmitting(false);
            document.getElementById('submitButton')?.removeAttribute('disabled');
          };
          
          xhr.send(JSON.stringify(requestBody));
          console.log('请求已发送');
          return; // 不再继续原始的fetch请求逻辑
          
          // 这些代码不再执行
          // const response = await fetch('/.netlify/functions/updateBlog', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(requestBody),
          // });
          // 
          // console.log('收到响应:', response.status, response.statusText);
          
          // 这部分代码不再执行，上面的XMLHttpRequest已经处理了响应
        } catch (error) {
          console.error('初始化请求时出错:', error);
          alert(`初始化请求失败: ${error.message}`);
          setSubmitting(false);
          document.getElementById('submitButton')?.removeAttribute('disabled');
        }
      }
    } catch (error) {
      console.error('提交博客出错:', error);
      alert(`操作失败: ${error.message}`);
      setSubmitting(false);
      // 重置提交状态，让用户可以重试
      document.getElementById('submitButton')?.removeAttribute('disabled');
    }
  };
  
  // 处理编辑博客
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content
    });
    setEditingId(blog.id);
    
    // 滚动到表单位置
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // 处理删除博客
  const handleDelete = async (blog) => {
    if (!confirm(`确定要删除博客《${blog.title}》吗？此操作不可撤销。`)) {
      return;
    }
    
    if (!isConnected || !isAdmin) {
      alert('您需要使用管理员钱包连接才能执行此操作');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // 生成要签名的消息
      const messageToSign = `我正在删除博客: ${blog.title}`;
      const { signature, message } = await signMessage(messageToSign);
      
      // 获取管理员地址列表
      const storedAdminAddresses = window.localStorage.getItem('adminAddresses');
      let adminList = [];
      
      if (storedAdminAddresses) {
        try {
          adminList = JSON.parse(storedAdminAddresses);
        } catch (e) {}
      }
      
      // 判断是否在本地开发环境
      const isLocalDev = process.env.NODE_ENV === 'development';
      
      if (isLocalDev) {
        // 在本地开发环境中模拟删除博客
        console.log('管理页面：删除博客');
        
        // 模拟加载时间
        setTimeout(() => {
          // 更新博客列表
          const updatedBlogs = blogs.filter(b => b.id !== blog.id);
          setBlogs(updatedBlogs);
          
          // 如果正在编辑被删除的博客，重置表单
          if (editingId === blog.id) {
            setFormData({ title: '', content: '' });
            setEditingId(null);
          }
          
          alert('博客删除成功');
          setSubmitting(false);
        }, 800);
      } else {
        // 在生产环境中使用Netlify Functions
        const response = await fetch('/.netlify/functions/updateBlog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'delete',
            blog: { id: blog.id, title: blog.title },
            address,
            signature,
            message: messageToSign,
            adminList: [...adminList, ...ADMIN_ADDRESSES],
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '删除失败');
        }
        
        const data = await response.json();
        setBlogs(data.blogs);
        
        // 如果正在编辑被删除的博客，重置表单
        if (editingId === blog.id) {
          setFormData({ title: '', content: '' });
          setEditingId(null);
        }
        
        alert('博客删除成功');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('删除博客出错:', error);
      alert(`删除失败: ${error.message}`);
      setSubmitting(false);
    }
  };
  
  // 处理添加管理员地址
  const handleAddAdmin = () => {
    if (!adminAddress.trim() || !adminAddress.startsWith('0x')) {
      alert('请输入有效的钱包地址');
      return;
    }
    
    // 从本地存储获取现有管理员地址
    const storedAdminAddresses = window.localStorage.getItem('adminAddresses');
    let adminList = [];
    
    if (storedAdminAddresses) {
      try {
        adminList = JSON.parse(storedAdminAddresses);
      } catch (e) {}
    }
    
    // 检查地址是否已存在
    if (adminList.some(addr => addr.toLowerCase() === adminAddress.toLowerCase())) {
      alert('此地址已在管理员列表中');
      return;
    }
    
    // 添加新地址
    adminList.push(adminAddress);
    window.localStorage.setItem('adminAddresses', JSON.stringify(adminList));
    
    alert(`已将 ${adminAddress} 添加为管理员`);
    setAdminAddress('');
  };
  
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (!isConnected) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <h1 className="text-white mb-4">博客管理</h1>
          <p className="text-white fs-5 mb-4">请连接您的管理员钱包以访问管理功能</p>
          <ConnectButton />
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <section className="admin-section py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(90deg, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>博客管理</h1>
            <div className="d-flex align-items-center">
              <Link href="/blogs" className="btn btn-primary-custom">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                返回博客列表
              </Link>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-8 mb-4">
              {/* 创建/编辑博客卡片 */}
              <div className="card admin-card mb-4">
                <div className="card-header">
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    {editingId ? '编辑博客' : '创建新博客'}
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">标题</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="输入博客标题..."
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label">内容</label>
                      <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        rows="10"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="输入博客内容..."
                        required
                      ></textarea>
                      <small className="text-muted">支持换行，但不支持Markdown格式</small>
                    </div>
                    
                    <div className="d-flex gap-2">
                      <button
                        id="submitButton"
                        type="submit"
                        className="submit-btn"
                        disabled={submitting}
                      >
                        {!submitting && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        )}
                        {submitting ? '提交中...' : editingId ? '更新博客' : '发布博客'}
                      </button>
                      
                      {editingId && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            setFormData({ title: '', content: '' });
                            setEditingId(null);
                          }}
                        >
                          取消编辑
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              
              {/* 管理员设置卡片 */}
              <div className="card admin-card">
                <div className="card-header">
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    管理员设置
                  </h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor="adminAddress" className="form-label">添加管理员钱包地址</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="adminAddress"
                        placeholder="0x..."
                        value={adminAddress}
                        onChange={(e) => setAdminAddress(e.target.value)}
                      />
                      <button 
                        className="btn btn-primary-custom" 
                        type="button"
                        onClick={handleAddAdmin}
                      >
                        添加
                      </button>
                    </div>
                    <small className="text-muted">添加的管理员地址将存储在浏览器本地，仅在当前设备有效</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              {/* 博客列表卡片 */}
              <div className="card admin-card">
                <div className="card-header">
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    博客列表
                  </h3>
                </div>
                <div className="card-body">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">加载中...</span>
                      </div>
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="alert" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd', borderColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      暂无博客内容，请使用表单创建您的第一篇博客
                    </div>
                  ) : (
                    <table className="blog-list-table">
                      <tbody>
                        {blogs.map(blog => (
                          <tr key={blog.id}>
                            <td style={{ width: '50%' }}>
                              <div className="fw-bold">{blog.title}</div>
                              <div className="small text-muted mt-1">
                                {new Date(blog.createdAt).toLocaleDateString('zh-CN')} · {blog.comments?.length || 0} 条评论
                              </div>
                            </td>
                            <td className="text-end">
                              <div className="btn-group-sm">
                                <button
                                  className="btn btn-edit"
                                  onClick={() => handleEdit(blog)}
                                  disabled={submitting}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                  编辑
                                </button>
                                <button
                                  className="btn btn-delete"
                                  onClick={() => handleDelete(blog)}
                                  disabled={submitting}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                                  删除
                                </button>
                                <Link 
                                  href={`/blogs/${blog.id}`}
                                  className="btn btn-view"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                  </svg>
                                  查看
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminPage;

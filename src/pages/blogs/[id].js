import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useWeb3 } from '../../utils/Web3Provider';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { mockBlogs } from '../../utils/mockData';

const BlogDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const { isConnected, address, signMessage, isAdmin } = useWeb3();
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // 获取博客详情
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // 判断是否在本地开发环境
        const isLocalDev = process.env.NODE_ENV === 'development';
        
        if (isLocalDev) {
          // 在本地开发环境中使用模拟数据
          console.log('使用模拟数据获取博客详情');
          // 模拟加载时间
          setTimeout(() => {
            const foundBlog = mockBlogs.find(b => b.id === id);
            
            if (foundBlog) {
              setBlog(foundBlog);
            } else {
              router.push('/blogs');
            }
            setLoading(false);
          }, 500);
        } else {
          // 在生产环境中使用Netlify Functions
          const response = await fetch('/.netlify/functions/blogs');
          if (!response.ok) {
            throw new Error('获取博客列表失败');
          }
          const data = await response.json();
          const foundBlog = data.find(b => b.id === id);
          
          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            router.push('/blogs');
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('获取博客详情出错:', error);
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id, router]);
  
  // 添加评论
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!isConnected || !comment.trim()) {
      return;
    }
    
    try {
      setCommentLoading(true);
      
      // 生成要签名的消息
      const messageToSign = `我正在评论博客 ${id}：${comment}`;
      const { signature, message } = await signMessage(messageToSign);
      
      // 判断是否在本地开发环境
      const isLocalDev = process.env.NODE_ENV === 'development';
      
      if (isLocalDev) {
        // 在本地开发环境中模拟添加评论
        console.log('本地模式：添加评论');
        
        // 模拟加载时间
        setTimeout(() => {
          // 创建新评论
          const newComment = {
            id: Date.now().toString(),
            content: comment,
            author: address,
            createdAt: new Date().toISOString()
          };
          
          // 更新博客对象
          const updatedBlog = {
            ...blog,
            comments: [...(blog.comments || []), newComment]
          };
          
          setBlog(updatedBlog);
          setComment('');
          setCommentLoading(false);
        }, 1000);
      } else {
        // 在生产环境中使用Netlify Functions
        const response = await fetch('/.netlify/functions/updateComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'add',
            blogId: id,
            comment: { content: comment },
            address,
            signature,
            message: messageToSign,
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '添加评论失败');
        }
        
        const data = await response.json();
        setBlog(data.blogs);
        setComment('');
        setCommentLoading(false);
      }
    } catch (error) {
      console.error('添加评论出错:', error);
      alert(`添加评论失败: ${error.message}`);
      setCommentLoading(false);
    }
  };
  
  // 删除评论
  const handleDeleteComment = async (commentId) => {
    if (!isConnected) return;
    
    try {
      setCommentLoading(true);
      
      // 生成要签名的消息
      const messageToSign = `我要删除博客 ${id} 的评论 ${commentId}`;
      const { signature, message } = await signMessage(messageToSign);
      
      // 获取管理员地址列表
      const adminList = window.localStorage.getItem('adminAddresses');
      const parsedAdminList = adminList ? JSON.parse(adminList) : [];
      
      // 判断是否在本地开发环境
      const isLocalDev = process.env.NODE_ENV === 'development';
      
      if (isLocalDev) {
        // 在本地开发环境中模拟删除评论
        console.log('本地模式：删除评论');
        
        // 模拟加载时间
        setTimeout(() => {
          // 检查用户是否为评论作者或管理员
          const comment = blog.comments.find(c => c.id === commentId);
          const isCommentAuthor = comment && comment.author && comment.author.toLowerCase() === address.toLowerCase();
          const userIsAdmin = isAdmin || (parsedAdminList && parsedAdminList.some(
            admin => admin.toLowerCase() === address.toLowerCase()
          ));
          
          if (isCommentAuthor || userIsAdmin) {
            // 更新博客对象
            const updatedBlog = {
              ...blog,
              comments: blog.comments.filter(c => c.id !== commentId)
            };
            
            setBlog(updatedBlog);
          } else {
            alert('没有权限删除此评论');
          }
          
          setCommentLoading(false);
        }, 500);
      } else {
        // 在生产环境中使用Netlify Functions
        const response = await fetch('/.netlify/functions/updateComment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation: 'delete',
            blogId: id,
            comment: { id: commentId },
            address,
            signature,
            message: messageToSign,
            adminList: parsedAdminList,
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '删除评论失败');
        }
        
        const data = await response.json();
        setBlog(data.blogs);
        setCommentLoading(false);
      }
    } catch (error) {
      console.error('删除评论出错:', error);
      alert(`删除评论失败: ${error.message}`);
      setCommentLoading(false);
    }
  };
  
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // 格式化钱包地址
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <p className="text-white fs-5">博客不存在</p>
          <Link href="/blogs" className="btn btn-primary-custom mt-3">
            返回博客列表
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <section className="section-padding blog-detail-section">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="py-5"
          >
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <Link href="/blogs" className="btn btn-outline-primary mb-4">
                ← 返回博客列表
              </Link>
              <ConnectButton />
            </div>
            
            <div className="card blog-detail-card mb-5">
              <div className="card-body p-4 p-md-5">
                <h1 className="fs-2 fw-bold mb-3 text-primary">{blog.title}</h1>
                <p className="text-light mb-4">
                  发布于 {formatDate(blog.createdAt)}
                  {blog.updatedAt !== blog.createdAt && 
                    ` · 更新于 ${formatDate(blog.updatedAt)}`}
                </p>
                
                <div className="blog-content text-white-custom mb-5">
                  {blog.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card comments-card">
              <div className="card-body p-4">
                <h3 className="fs-4 fw-semibold mb-4 text-primary">评论</h3>
                
                {isConnected ? (
                  <form onSubmit={handleAddComment} className="mb-4">
                    <div className="mb-3">
                      <label htmlFor="comment" className="form-label text-white">发表评论</label>
                      <textarea
                        id="comment"
                        className="form-control bg-dark text-white border-secondary"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="写下你的想法..."
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary-custom"
                      disabled={commentLoading}
                    >
                      {commentLoading ? '提交中...' : '提交评论'}
                    </button>
                  </form>
                ) : (
                  <div className="alert alert-info mb-4">
                    <p className="mb-0">请连接钱包以参与评论</p>
                  </div>
                )}
                
                {blog.comments && blog.comments.length > 0 ? (
                  <div className="comments-list">
                    {blog.comments.map((item) => (
                      <div key={item.id} className="comment-item card bg-dark mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <p className="text-primary mb-1 fw-semibold">
                                {formatAddress(item.author)}
                              </p>
                              <p className="text-light small mb-0">
                                {formatDate(item.createdAt)}
                              </p>
                            </div>
                            {(isAdmin || address?.toLowerCase() === item.author?.toLowerCase()) && (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteComment(item.id)}
                                disabled={commentLoading}
                              >
                                删除
                              </button>
                            )}
                          </div>
                          <p className="text-white-custom">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-light text-center py-3">暂无评论</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetailPage;

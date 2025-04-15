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
            
            <div className="card blog-detail-card mb-5 bg-darker shadow-lg border-0">
              <div className="card-body p-4 p-md-5">
                <h1 className="display-5 fw-bold mb-4 text-primary">{blog.title}</h1>
                <p className="text-light fs-6 mb-4 d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check me-2" viewBox="0 0 16 16">
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                  发布于 {formatDate(blog.createdAt)}
                  {blog.updatedAt !== blog.createdAt && (
                    <span className="ms-3 d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square me-2" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                      更新于 {formatDate(blog.updatedAt)}
                    </span>
                  )}
                </p>
                
                <div className="blog-content fs-5 text-white mb-5 line-height-lg">
                  {blog.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="my-3">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card comments-card bg-darker shadow-lg border-0">
              <div className="card-body p-4">
                <h3 className="fs-4 fw-semibold mb-4 text-primary d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-dots me-2" viewBox="0 0 16 16">
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                  </svg>
                  评论</h3>
                
                {isConnected ? (
                  <form onSubmit={handleAddComment} className="mb-4">
                    <div className="mb-3">
                      <label htmlFor="comment" className="form-label text-white">发表评论</label>
                      <textarea
                        id="comment"
                        className="form-control bg-darker text-white border-secondary rounded-3"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="写下你的想法..."
                        required
                        style={{resize: 'none', fontSize: '1rem'}}
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary-custom d-flex align-items-center"
                      disabled={commentLoading}
                    >
                      {commentLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          提交中...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send me-2" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                          </svg>
                          提交评论
                        </>
                      )}
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
                      <div key={item.id} className="comment-item card bg-dark bg-opacity-50 mb-3 border-0 shadow-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="d-flex align-items-center">
                              <div className="avatar-circle bg-primary text-white d-flex align-items-center justify-content-center me-2">
                                {item.author && item.author.substring(2, 4).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-primary mb-1 fw-semibold">
                                  {formatAddress(item.author)}
                                </p>
                                <p className="text-light small mb-0 d-flex align-items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-clock me-1" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                  </svg>
                                  {formatDate(item.createdAt)}
                                </p>
                              </div>
                            </div>
                            {(isAdmin || address?.toLowerCase() === item.author?.toLowerCase()) && (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteComment(item.id)}
                                disabled={commentLoading}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash me-1" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                                删除
                              </button>
                            )}
                          </div>
                          <p className="text-white fs-6 mb-0">{item.content}</p>
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

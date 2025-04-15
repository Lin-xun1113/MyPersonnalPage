import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useWeb3 } from '../../utils/Web3Provider';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { mockBlogs } from '../../utils/mockData';
import '../../styles/modern-blog.css';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isConnected, isAdmin } = useWeb3();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // 获取博客列表
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        
        // 判断是否在本地开发环境
        const isLocalDev = process.env.NODE_ENV === 'development';
        
        if (isLocalDev) {
          // 在本地开发环境中使用模拟数据
          console.log('使用模拟数据');
          // 模拟1秒加载时间
          setTimeout(() => {
            const sortedBlogs = [...mockBlogs].sort((a, b) => 
              new Date(b.createdAt) - new Date(a.createdAt)
            );
            setBlogs(sortedBlogs);
            setLoading(false);
          }, 1000);
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
  
  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 截取博客摘要
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  return (
    <>
      <Navbar />
      <section className="section-padding blogs-section">
        <div className="container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className="py-5"
          >
            <motion.div variants={itemVariants} className="d-flex justify-content-between align-items-center mb-5">
              <h1 className="text-white fw-bold" style={{ fontSize: '2.5rem', background: 'linear-gradient(90deg, #f1f5f9, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>我的日志</h1>
              <div className="d-flex align-items-center">
                {isAdmin && (
                  <Link href="/blogs/admin" className="btn btn-primary-custom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    管理日志
                  </Link>
                )}
              </div>
            </motion.div>
            
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">加载中...</span>
                </div>
              </div>
            ) : blogs.length === 0 ? (
              <motion.div variants={itemVariants} className="text-center py-5">
                <p className="text-white fs-5">暂无日志内容</p>
                {isAdmin && (
                  <Link href="/blogs/admin" className="btn btn-primary-custom mt-3">
                    创建第一篇日志
                  </Link>
                )}
              </motion.div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {blogs.map((blog) => (
                  <motion.div key={blog.id} variants={itemVariants} className="col">
                    <div className="card blog-card h-100">
                      <div className="card-body">
                        <h3>{blog.title}</h3>
                        <div className="blog-meta mb-3">
                          <div className="blog-meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>发布于 {formatDate(blog.createdAt)}</span>
                          </div>
                          {blog.updatedAt !== blog.createdAt && (
                            <div className="blog-meta-item">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <span>更新于 {formatDate(blog.updatedAt)}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-white-custom mb-4">
                          {truncateContent(blog.content)}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <div className="blog-meta-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>{blog.comments?.length || 0} 条评论</span>
                          </div>
                          <Link href={`/blogs/${blog.id}`} className="read-more-btn">
                            阅读全文
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogsPage;

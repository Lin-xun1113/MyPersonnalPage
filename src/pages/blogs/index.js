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
              <h1 className="text-white fw-bold">我的日志</h1>
              <div className="d-flex align-items-center">
                <ConnectButton />
                {isAdmin && (
                  <Link href="/blogs/admin" className="btn btn-primary-custom ms-3">
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
                        <h3 className="fs-4 fw-semibold mb-3 text-primary">{blog.title}</h3>
                        <p className="small text-light mb-3">
                          发布于 {formatDate(blog.createdAt)}
                          {blog.updatedAt !== blog.createdAt && 
                            ` · 更新于 ${formatDate(blog.updatedAt)}`}
                        </p>
                        <p className="text-white-custom mb-4">
                          {truncateContent(blog.content)}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <span className="text-light small">
                            {blog.comments?.length || 0} 条评论
                          </span>
                          <Link href={`/blogs/${blog.id}`} className="btn btn-outline-primary btn-sm">
                            阅读全文
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

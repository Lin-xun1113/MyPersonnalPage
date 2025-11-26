import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { useWeb3 } from '../../utils/Web3Provider';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { mockBlogs } from '../../utils/mockData';
import { FiCalendar, FiClock, FiMessageCircle, FiEdit, FiArrowRight } from 'react-icons/fi';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useWeb3();
  
  // 获取博客列表
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const isLocalDev = process.env.NODE_ENV === 'development';
        
        if (isLocalDev) {
          setTimeout(() => {
            const sortedBlogs = [...mockBlogs].sort((a, b) => 
              new Date(b.createdAt) - new Date(a.createdAt)
            );
            setBlogs(sortedBlogs);
            setLoading(false);
          }, 800);
        } else {
          const response = await fetch('/.netlify/functions/blogs');
          if (!response.ok) throw new Error('获取博客列表失败');
          const data = await response.json();
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
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '.');
  };
  
  const truncateContent = (content, maxLength = 100) => {
    // 移除换行符并截断
    const cleaned = content.replace(/\n+/g, ' ').trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength) + '...';
  };
  
  return (
    <>
      <Head>
        <title>BLOG | LINXUN</title>
        <meta name="description" content="Linxun的技术日志与思考" />
      </Head>
      
      <Navbar />
      
      <div className="blogs-page">
        <main className="blogs-main">
          {/* 页面标题区域 */}
          <motion.header 
            className="page-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="header-content">
              <div className="header-left">
                <span className="header-code">[04]</span>
                <h1 className="header-title">BLOG</h1>
                <p className="header-subtitle">技术日志 / TECH JOURNAL</p>
              </div>
              
              <div className="header-right">
                <div className="header-stats">
                  <div className="stat-item">
                    <span className="stat-value">{blogs.length}</span>
                    <span className="stat-label">ENTRIES</span>
                  </div>
                </div>
                
                {isAdmin && (
                  <Link href="/blogs/admin" className="admin-btn">
                    <FiEdit size={16} />
                    <span>MANAGE</span>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="header-decoration">
              <div className="deco-line" />
              <span className="deco-text">TRANSMISSION LOG</span>
              <div className="deco-line" />
            </div>
          </motion.header>
          
          {/* 博客列表 */}
          <section className="blogs-content">
            {loading ? (
              <div className="loading-state">
                <div className="loader">
                  <span></span><span></span><span></span>
                </div>
                <p>LOADING ENTRIES...</p>
              </div>
            ) : blogs.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="empty-icon">📡</span>
                <p>NO TRANSMISSIONS FOUND</p>
                {isAdmin && (
                  <Link href="/blogs/admin" className="create-btn">
                    CREATE FIRST ENTRY
                  </Link>
                )}
              </motion.div>
            ) : (
              <div className="blogs-grid">
                {blogs.map((blog, i) => (
                  <motion.article 
                    key={blog.id}
                    className="blog-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="card-index">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="meta-item">
                          <FiCalendar size={12} />
                          {formatDate(blog.createdAt)}
                        </span>
                        {blog.updatedAt !== blog.createdAt && (
                          <span className="meta-item updated">
                            <FiClock size={12} />
                            UPDATED
                          </span>
                        )}
                      </div>
                      
                      <h2 className="card-title">{blog.title}</h2>
                      <p className="card-excerpt">{truncateContent(blog.content)}</p>
                      
                      <div className="card-footer">
                        <span className="comments-count">
                          <FiMessageCircle size={14} />
                          {blog.comments?.length || 0}
                        </span>
                        
                        <Link href={`/blogs/${blog.id}`} className="read-link">
                          READ MORE
                          <FiArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>
          
          {/* 返回导航 */}
          <motion.div 
            className="back-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/" className="back-link">
              <span>←</span> BACK TO HOME
            </Link>
          </motion.div>
        </main>
      </div>
      
      <Footer />
      
      <style jsx>{`
        .blogs-page {
          min-height: 100vh;
          padding-top: 100px;
        }
        
        .blogs-main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 5vw 80px;
        }
        
        /* 页面标题 */
        .page-header {
          margin-bottom: 50px;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          margin-bottom: 30px;
        }
        
        .header-code {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-primary);
          display: block;
          margin-bottom: 8px;
        }
        
        .header-title {
          font-family: var(--font-impact);
          font-size: clamp(3rem, 10vw, 5rem);
          color: var(--warm-text);
          margin: 0;
          line-height: 1;
        }
        
        .header-subtitle {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-muted);
          margin-top: 12px;
        }
        
        .header-right {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }
        
        .header-stats {
          text-align: right;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .stat-value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--warm-primary);
        }
        
        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-muted);
          letter-spacing: 0.1em;
        }
        
        .admin-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--warm-primary);
          color: #000;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .admin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 126, 51, 0.3);
        }
        
        .header-decoration {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .deco-line {
          flex: 1;
          height: 1px;
          background: var(--warm-border);
        }
        
        .deco-text {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--warm-muted);
          letter-spacing: 0.2em;
        }
        
        /* 加载状态 */
        .loading-state {
          text-align: center;
          padding: 80px 0;
        }
        
        .loader {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .loader span {
          width: 8px;
          height: 8px;
          background: var(--warm-primary);
          animation: bounce 1.4s infinite ease-in-out;
        }
        
        .loader span:nth-child(1) { animation-delay: -0.32s; }
        .loader span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        .loading-state p {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-muted);
        }
        
        /* 空状态 */
        .empty-state {
          text-align: center;
          padding: 80px 0;
        }
        
        .empty-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 20px;
        }
        
        .empty-state p {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--warm-muted);
          margin-bottom: 20px;
        }
        
        .create-btn {
          display: inline-block;
          padding: 12px 24px;
          background: var(--warm-primary);
          color: #000;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
        }
        
        /* 博客网格 */
        .blogs-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .blog-card {
          display: flex;
          gap: 24px;
          padding: 24px;
          background: var(--warm-surface) !important;
          border: 1px solid var(--warm-border) !important;
          border-radius: 0 !important;
          transition: all 0.3s;
        }
        
        .blog-card:hover {
          border-color: var(--warm-primary);
          transform: translateX(8px);
        }
        
        .card-index {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--warm-border);
          min-width: 40px;
        }
        
        .blog-card:hover .card-index {
          color: var(--warm-primary);
        }
        
        .card-content {
          flex: 1;
          min-width: 0;
        }
        
        .card-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--warm-muted);
        }
        
        .meta-item.updated {
          color: var(--warm-secondary);
        }
        
        .card-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--warm-text);
          margin: 0 0 10px;
        }
        
        .card-excerpt {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-muted);
          line-height: 1.5;
          margin: 0 0 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .comments-count {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-muted);
        }
        
        .read-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-primary);
          text-decoration: none;
          transition: gap 0.2s;
        }
        
        .read-link:hover {
          gap: 12px;
        }
        
        /* 返回导航 */
        .back-nav {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid var(--warm-border);
        }
        
        .back-link {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-muted);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        
        .back-link:hover {
          color: var(--warm-primary);
        }
        
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 24px;
          }
          
          .header-right {
            width: 100%;
            justify-content: space-between;
          }
          
          .blog-card {
            flex-direction: column;
            gap: 16px;
          }
          
          .card-index {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default BlogsPage;

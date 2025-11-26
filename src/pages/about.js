import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const timeline = [
    {
      year: '2004',
      title: '出生',
      desc: '11月13日出生于中国'
    },
    {
      year: '2023',
      title: '进入兰州大学',
      desc: '计算机科学与技术（数据科学方向）/ 兰大×德雷塞尔国际合作项目'
    },
    {
      year: '2025.01',
      title: '开始学习区块链',
      desc: '正式开启Web3学习之旅，深入Solidity和智能合约开发'
    },
    {
      year: '2025.02',
      title: 'Solidity项目实践',
      desc: '完成多个DeFi、DAO、NFT等智能合约项目'
    },
    {
      year: 'NOW',
      title: '智能合约审计',
      desc: '专注于合约安全审计学习，目标参加竞争性审计'
    }
  ];

  return (
    <>
      <Head>
        <title>ABOUT | LINXUN</title>
        <meta name="description" content="关于Linxun - 区块链开发者的个人档案" />
      </Head>
      
      <Navbar />
      
      <div className="about-page">
        {/* 背景装饰 */}
        <div className="bg-pattern" />
        
        <main className="about-main">
          {/* 页面标题 */}
          <motion.header 
            className="page-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="header-code">[01]</span>
            <h1 className="header-title">ABOUT</h1>
            <p className="header-subtitle">身份档案 / IDENTITY DOSSIER</p>
          </motion.header>
          
          <div className="about-grid">
            {/* 左侧 - 个人信息卡 */}
            <motion.section 
              className="profile-card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card-header">
                <span className="badge">CLASSIFIED</span>
                <span className="doc-id">DOC#LX-2004-1113</span>
              </div>
              
              <div className="profile-photo">
                <img src="/avatar.jpg" alt="Linxun" />
                <div className="photo-overlay" />
              </div>
              
              <div className="profile-info">
                <h2 className="profile-name">LINXUN</h2>
                <span className="profile-role">BLOCKCHAIN DEVELOPER</span>
                
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">LOCATION</span>
                    <span className="info-value">LANZHOU, CHINA</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">BORN</span>
                    <span className="info-value">2004.11.13</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">STATUS</span>
                    <span className="info-value status-active">ACTIVE</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">FOCUS</span>
                    <span className="info-value">SMART CONTRACT AUDIT</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <span>CLEARANCE LEVEL: PUBLIC</span>
              </div>
            </motion.section>
            
            {/* 右侧 - 详细内容 */}
            <div className="about-content">
              {/* 简介 */}
              <motion.section 
                className="content-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="section-title">
                  <span className="title-marker" />
                  BIOGRAPHY
                </h3>
                <div className="text-block">
                  <p>
                    我是一名就读于<span className="highlight">兰州大学</span>的计算机科学学生，
                    专业方向为数据科学，属于兰大与美国德雷塞尔大学的国际合作办学项目。
                  </p>
                  <p>
                    从 2025 年初开始，我深入学习<span className="highlight">区块链技术</span>，
                    掌握了 Solidity、Foundry、Web3.js 等技术栈，并完成了多个智能合约项目的开发。
                  </p>
                  <p>
                    目前我正专注于<span className="highlight">智能合约审计</span>的学习，
                    希望未来能够为去中心化世界的安全贡献力量。
                  </p>
                </div>
              </motion.section>
              
              {/* 时间线 */}
              <motion.section 
                className="content-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="section-title">
                  <span className="title-marker" />
                  TIMELINE
                </h3>
                <div className="timeline">
                  {timeline.map((item, i) => (
                    <motion.div 
                      key={i}
                      className="timeline-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <span className="timeline-year">{item.year}</span>
                      <div className="timeline-content">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
          
          {/* 返回按钮 */}
          <motion.div 
            className="back-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/" className="back-link">
              <span>←</span> BACK TO HOME
            </Link>
          </motion.div>
        </main>
      </div>
      
      <Footer />
      
      <style jsx>{`
        .about-page {
          min-height: 100vh;
          padding-top: 100px;
          position: relative;
        }
        
        .bg-pattern {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255,126,51,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,177,66,0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .about-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5vw 80px;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 60px;
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
          font-size: clamp(3rem, 8vw, 6rem);
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
        
        .about-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 40px;
        }
        
        /* 个人信息卡 */
        .profile-card {
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          position: sticky;
          top: 100px;
          height: fit-content;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: var(--warm-card);
          border-bottom: 1px solid var(--warm-border);
        }
        
        .badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          padding: 4px 8px;
          background: var(--warm-accent);
          color: #fff;
        }
        
        .doc-id {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--warm-muted);
        }
        
        .profile-photo {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
        }
        
        .profile-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(30%) contrast(1.1);
        }
        
        .photo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.1) 2px,
              rgba(0,0,0,0.1) 4px
            );
          mix-blend-mode: multiply;
        }
        
        .profile-info {
          padding: 20px;
        }
        
        .profile-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin: 0;
          color: var(--warm-text);
        }
        
        .profile-role {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-primary);
          display: block;
          margin-top: 4px;
        }
        
        .info-grid {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .info-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-muted);
          letter-spacing: 0.05em;
        }
        
        .info-value {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-text);
        }
        
        .status-active {
          color: var(--warm-success);
        }
        
        .card-footer {
          padding: 12px 16px;
          background: var(--warm-card);
          border-top: 1px solid var(--warm-border);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-muted);
          text-align: center;
        }
        
        /* 右侧内容 */
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        
        .content-section {
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          padding: 30px;
        }
        
        .section-title {
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--warm-text);
          margin: 0 0 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .title-marker {
          width: 12px;
          height: 12px;
          background: var(--warm-primary);
        }
        
        .text-block p {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--warm-muted);
          line-height: 1.8;
          margin: 0 0 16px;
        }
        
        .text-block p:last-child {
          margin-bottom: 0;
        }
        
        .highlight {
          color: var(--warm-primary);
        }
        
        /* 时间线 */
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        
        .timeline-item {
          display: flex;
          gap: 20px;
          padding: 16px 0;
          border-bottom: 1px solid var(--warm-border);
        }
        
        .timeline-item:last-child {
          border-bottom: none;
        }
        
        .timeline-year {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-primary);
          min-width: 80px;
        }
        
        .timeline-content h4 {
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--warm-text);
          margin: 0 0 4px;
        }
        
        .timeline-content p {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-muted);
          margin: 0;
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
        
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          
          .profile-card {
            position: static;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
}

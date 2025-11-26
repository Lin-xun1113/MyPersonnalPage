import Head from 'next/head';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navCards = [
    { 
      code: '01', 
      title: 'ABOUT', 
      subtitle: '关于我', 
      desc: '身份档案 / 教育背景',
      href: '/about' 
    },
    { 
      code: '02', 
      title: 'PROJECTS', 
      subtitle: '项目', 
      desc: '区块链作品集',
      href: '/projects' 
    },
    { 
      code: '03', 
      title: 'SKILLS', 
      subtitle: '技能', 
      desc: '技术仪表盘',
      href: '/skills' 
    },
    { 
      code: '04', 
      title: 'BLOG', 
      subtitle: '日志', 
      desc: '思考与记录',
      href: '/blogs' 
    },
    { 
      code: '05', 
      title: 'CONTACT', 
      subtitle: '联系', 
      desc: '通讯终端',
      href: '/contact' 
    },
  ];

  return (
    <>
      <Head>
        <title>LINXUN | Blockchain Developer</title>
        <meta name="description" content="Linxun - 区块链开发者、智能合约审计学习者" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="home-container">
        {/* 动态背景 */}
        <div className="bg-grid" />
        <div 
          className="bg-glow"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />
        
        {/* 主内容 */}
        <main className="hero-main">
          {/* 左侧 - 大标题 */}
          <div className="hero-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero-label">BLOCKCHAIN DEVELOPER</span>
              
              <h1 
                className="hero-title"
                style={{
                  transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                }}
              >
                <span className="title-line">LIN</span>
                <span className="title-line accent">XUN</span>
              </h1>
              
              <p className="hero-tagline">
                构建去中心化的未来
                <span className="tagline-cursor">_</span>
              </p>
              
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-value">2025</span>
                  <span className="stat-label">ACTIVE SINCE</span>
                </div>
                <div className="stat">
                  <span className="stat-value">10+</span>
                  <span className="stat-label">PROJECTS</span>
                </div>
                <div className="stat">
                  <span className="stat-value">LZU</span>
                  <span className="stat-label">UNIVERSITY</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* 右侧 - 导航卡片 */}
          <div className="hero-right">
            <motion.div 
              className="nav-grid"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {navCards.map((card, i) => (
                <motion.div
                  key={card.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <Link href={card.href} className="nav-card">
                    <span className="card-code">{card.code}</span>
                    <div className="card-content">
                      <h3 className="card-title">{card.title}</h3>
                      <span className="card-subtitle">{card.subtitle}</span>
                      <p className="card-desc">{card.desc}</p>
                    </div>
                    <span className="card-arrow">→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
        
        {/* 底部信息 */}
        <footer className="hero-footer">
          <div className="footer-left">
            <span>SELECT A MODULE TO BEGIN</span>
            <motion.span 
              className="blink-arrow"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
          <div className="footer-right">
            <span>LANZHOU, CHINA</span>
            <span className="separator">|</span>
            <span>EST. 2004</span>
          </div>
        </footer>
      </div>
      
      <style jsx>{`
        .home-container {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .bg-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(255,126,51,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,126,51,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        
        .bg-glow {
          position: fixed;
          top: 20%;
          right: 10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,126,51,0.15) 0%, transparent 60%);
          pointer-events: none;
          transition: transform 0.3s ease-out;
        }
        
        .hero-main {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          padding: 140px 5vw 60px;
          align-items: center;
        }
        
        .hero-left {
          max-width: 600px;
        }
        
        .hero-label {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-primary);
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 20px;
        }
        
        .hero-title {
          font-family: var(--font-impact);
          font-size: clamp(4rem, 12vw, 10rem);
          line-height: 0.9;
          margin: 0;
          transition: transform 0.1s ease-out;
        }
        
        .title-line {
          display: block;
          color: var(--warm-text);
        }
        
        .title-line.accent {
          color: var(--warm-primary);
          -webkit-text-stroke: 2px var(--warm-primary);
          -webkit-text-fill-color: transparent;
        }
        
        .hero-tagline {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--warm-muted);
          margin-top: 30px;
        }
        
        .tagline-cursor {
          animation: blink 1s infinite;
          color: var(--warm-primary);
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid var(--warm-border);
        }
        
        .stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .stat-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--warm-text);
        }
        
        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--warm-muted);
          letter-spacing: 0.1em;
        }
        
        .hero-right {
          display: flex;
          justify-content: flex-end;
        }
        
        .nav-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          width: 100%;
        }
        
        .nav-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          text-decoration: none;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .nav-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--warm-primary);
          transform: scaleY(0);
          transition: transform 0.3s;
        }
        
        .nav-card:hover {
          border-color: var(--warm-primary);
          transform: translateX(10px);
        }
        
        .nav-card:hover::before {
          transform: scaleY(1);
        }
        
        .card-code {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-muted);
          min-width: 24px;
        }
        
        .card-content {
          flex: 1;
        }
        
        .card-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--warm-text);
          margin: 0;
        }
        
        .card-subtitle {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--warm-primary);
          margin-left: 8px;
        }
        
        .card-desc {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-muted);
          margin: 4px 0 0;
        }
        
        .card-arrow {
          font-size: 1.2rem;
          color: var(--warm-muted);
          transition: all 0.3s;
        }
        
        .nav-card:hover .card-arrow {
          color: var(--warm-primary);
          transform: translateX(5px);
        }
        
        .hero-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 5vw;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--warm-muted);
          border-top: 1px solid var(--warm-border);
        }
        
        .footer-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .blink-arrow {
          color: var(--warm-primary);
          font-size: 1rem;
        }
        
        .footer-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .separator {
          opacity: 0.3;
        }
        
        @media (max-width: 1024px) {
          .hero-main {
            grid-template-columns: 1fr;
            gap: 40px;
            padding-top: 120px;
          }
          
          .hero-right {
            justify-content: flex-start;
          }
          
          .nav-grid {
            max-width: 100%;
          }
        }
        
        @media (max-width: 640px) {
          .hero-title {
            font-size: 3.5rem;
          }
          
          .hero-stats {
            gap: 20px;
            flex-wrap: wrap;
          }
          
          .hero-footer {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

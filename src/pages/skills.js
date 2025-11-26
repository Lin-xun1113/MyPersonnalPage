import Head from 'next/head';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const skillCategories = [
    {
      title: 'BLOCKCHAIN',
      icon: '⛓️',
      skills: [
        { name: 'Solidity', level: 75 },
        { name: 'Smart Contract Audit', level: 35 },
        { name: 'Web3.js / Ethers.js', level: 60 },
        { name: 'Foundry', level: 70 },
      ]
    },
    {
      title: 'LANGUAGES',
      icon: '💻',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'JavaScript', level: 50 },
        { name: 'SQL', level: 60 },
        { name: 'Bash', level: 45 },
      ]
    },
    {
      title: 'DATA SCIENCE',
      icon: '📊',
      skills: [
        { name: 'Pandas / NumPy', level: 75 },
        { name: 'Data Visualization', level: 70 },
        { name: 'Machine Learning', level: 55 },
        { name: 'Deep Learning', level: 45 },
      ]
    },
    {
      title: 'TOOLS',
      icon: '🔧',
      skills: [
        { name: 'Git / GitHub', level: 70 },
        { name: 'Linux', level: 55 },
        { name: 'Docker', level: 40 },
        { name: 'VS Code', level: 85 },
      ]
    }
  ];

  const GaugeBar = ({ level, delay }) => (
    <div className="gauge-bar">
      <motion.div 
        className="gauge-fill"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="gauge-segments">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="segment" />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>SKILLS | LINXUN</title>
        <meta name="description" content="Linxun的技术技能仪表盘" />
      </Head>
      
      <Navbar />
      
      <div className="skills-page" ref={ref}>
        <main className="skills-main">
          {/* 页面标题 */}
          <motion.header 
            className="page-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="header-code">[03]</span>
            <h1 className="header-title">SKILLS</h1>
            <p className="header-subtitle">技术仪表盘 / TECH DASHBOARD</p>
          </motion.header>
          
          {/* 系统状态栏 */}
          <motion.div 
            className="system-status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="status-item">
              <span className="status-dot active" />
              <span>SYSTEMS ONLINE</span>
            </div>
            <div className="status-item">
              <span className="status-label">LAST CALIBRATION:</span>
              <span>2025.05</span>
            </div>
            <div className="status-item">
              <span className="status-label">MODULES:</span>
              <span>{skillCategories.length} ACTIVE</span>
            </div>
          </motion.div>
          
          {/* 技能仪表盘网格 */}
          <div className="dashboard-grid">
            {skillCategories.map((category, catIndex) => (
              <motion.section 
                key={category.title}
                className="skill-panel"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + catIndex * 0.15 }}
              >
                <div className="panel-header">
                  <span className="panel-icon">{category.icon}</span>
                  <h3 className="panel-title">{category.title}</h3>
                  <span className="panel-status">ACTIVE</span>
                </div>
                
                <div className="panel-body">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="skill-row">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <GaugeBar 
                        level={skill.level} 
                        delay={0.4 + catIndex * 0.1 + skillIndex * 0.05}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="panel-footer">
                  <span className="module-id">MODULE_{String(catIndex + 1).padStart(2, '0')}</span>
                </div>
              </motion.section>
            ))}
          </div>
          
          {/* 技术栈总览 */}
          <motion.section 
            className="overview-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <div className="overview-header">
              <h3>SYSTEM OVERVIEW</h3>
              <span className="overview-badge">REPORT</span>
            </div>
            <div className="overview-content">
              <div className="overview-text">
                <p>
                  <span className="highlight">核心专长：</span>Python 数据处理与分析，Solidity 智能合约开发
                </p>
                <p>
                  <span className="highlight">当前重点：</span>智能合约安全审计，目标参加 Code4rena / Sherlock 竞争性审计
                </p>
                <p>
                  <span className="highlight">发展方向：</span>成为专业的区块链安全研究员
                </p>
              </div>
              <div className="overview-stats">
                <div className="stat-circle">
                  <svg viewBox="0 0 100 100">
                    <circle className="bg" cx="50" cy="50" r="45" />
                    <motion.circle 
                      className="progress"
                      cx="50" cy="50" r="45"
                      initial={{ strokeDashoffset: 283 }}
                      animate={isInView ? { strokeDashoffset: 283 * (1 - 0.65) } : {}}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </svg>
                  <div className="stat-value">65%</div>
                  <div className="stat-label">OVERALL</div>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* 返回导航 */}
          <motion.div 
            className="back-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link href="/" className="back-link">
              <span>←</span> BACK TO HOME
            </Link>
          </motion.div>
        </main>
      </div>
      
      <Footer />
      
      <style jsx>{`
        .skills-page {
          min-height: 100vh;
          padding-top: 100px;
        }
        
        .skills-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5vw 80px;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 40px;
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
        
        /* 系统状态栏 */
        .system-status {
          display: flex;
          justify-content: center;
          gap: 40px;
          padding: 16px 0;
          border-top: 1px solid var(--warm-border);
          border-bottom: 1px solid var(--warm-border);
          margin-bottom: 40px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }
        
        .status-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--warm-muted);
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--warm-muted);
          border-radius: 50%;
        }
        
        .status-dot.active {
          background: var(--warm-success);
          box-shadow: 0 0 8px var(--warm-success);
        }
        
        .status-label {
          color: var(--warm-muted);
        }
        
        /* 仪表盘网格 */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        
        .skill-panel {
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          overflow: hidden;
        }
        
        .panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: var(--warm-card);
          border-bottom: 1px solid var(--warm-border);
        }
        
        .panel-icon {
          font-size: 1.2rem;
        }
        
        .panel-title {
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--warm-text);
          margin: 0;
          flex: 1;
        }
        
        .panel-status {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-success);
          padding: 2px 8px;
          border: 1px solid var(--warm-success);
        }
        
        .panel-body {
          padding: 20px;
        }
        
        .skill-row {
          margin-bottom: 16px;
        }
        
        .skill-row:last-child {
          margin-bottom: 0;
        }
        
        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        
        .skill-name {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-text);
        }
        
        .skill-level {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-primary);
        }
        
        .gauge-bar {
          height: 8px;
          background: var(--warm-card);
          position: relative;
          overflow: hidden;
        }
        
        .gauge-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, var(--warm-primary), var(--warm-secondary));
        }
        
        .gauge-segments {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
        }
        
        .segment {
          flex: 1;
          border-right: 2px solid var(--warm-bg);
        }
        
        .segment:last-child {
          border-right: none;
        }
        
        .panel-footer {
          padding: 10px 20px;
          background: var(--warm-card);
          border-top: 1px solid var(--warm-border);
        }
        
        .module-id {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-muted);
        }
        
        /* 总览面板 */
        .overview-panel {
          background: var(--warm-surface);
          border: 1px solid var(--warm-primary);
        }
        
        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: rgba(255, 126, 51, 0.1);
          border-bottom: 1px solid var(--warm-primary);
        }
        
        .overview-header h3 {
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--warm-primary);
          margin: 0;
        }
        
        .overview-badge {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          padding: 4px 10px;
          background: var(--warm-primary);
          color: #000;
        }
        
        .overview-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          padding: 24px;
        }
        
        .overview-text p {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-muted);
          line-height: 1.8;
          margin: 0 0 12px;
        }
        
        .overview-text p:last-child {
          margin-bottom: 0;
        }
        
        .highlight {
          color: var(--warm-primary);
        }
        
        .overview-stats {
          display: flex;
          align-items: center;
        }
        
        .stat-circle {
          width: 120px;
          height: 120px;
          position: relative;
        }
        
        .stat-circle svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        
        .stat-circle .bg {
          fill: none;
          stroke: var(--warm-border);
          stroke-width: 8;
        }
        
        .stat-circle .progress {
          fill: none;
          stroke: var(--warm-primary);
          stroke-width: 8;
          stroke-dasharray: 283;
          stroke-linecap: round;
        }
        
        .stat-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--warm-text);
        }
        
        .stat-label {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-muted);
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
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .system-status {
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 16px;
          }
          
          .overview-content {
            grid-template-columns: 1fr;
          }
          
          .overview-stats {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

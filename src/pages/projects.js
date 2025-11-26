import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  const scrollRef = useRef(null);
  
  const projects = [
    {
      id: '01',
      title: 'BEEF DEX',
      category: 'DEFI',
      desc: '功能完整的去中心化交易所，支持代币交换、流动性提供等核心功能。',
      tech: ['Solidity', 'React', 'Web3.js', 'Foundry'],
      github: 'https://github.com/Lin-xun1113/BeefDex',
      color: '#ff7e33'
    },
    {
      id: '02',
      title: 'CARBON EXCHANGE',
      category: 'GREEN TECH',
      desc: '基于区块链的碳排放交易平台，实现碳积分代币化与交易。',
      tech: ['Solidity', 'Foundry', 'React', 'Chainlink'],
      github: 'https://github.com/Lin-xun1113/CarbonExchange',
      color: '#2ed573'
    },
    {
      id: '03',
      title: 'CROSS BRIDGE',
      category: 'INFRASTRUCTURE',
      desc: '支持多链资产转移的跨链桥项目，包含智能合约和前端界面。',
      tech: ['Solidity', 'Ethers.js', 'Next.js'],
      github: 'https://github.com/Lin-xun1113/CrossBridge-Contract',
      color: '#a855f7'
    },
    {
      id: '04',
      title: 'RPS GAME',
      category: 'GAMING',
      desc: '链上石头剪刀布游戏，使用commit-reveal机制确保公平性。',
      tech: ['Solidity', 'React', 'Foundry'],
      github: 'https://github.com/Lin-xun1113/RPC-Game-Contract',
      color: '#ff4757'
    },
    {
      id: '05',
      title: 'STABLECOIN',
      category: 'DEFI',
      desc: '算法稳定币系统，实现价格稳定机制和自动供应量调节。',
      tech: ['Solidity', 'Chainlink', 'Foundry'],
      github: 'https://github.com/Lin-xun1113/ClassWork-foundry-defi-stablecoin',
      color: '#ffb142'
    },
    {
      id: '06',
      title: 'DAO GOVERNANCE',
      category: 'GOVERNANCE',
      desc: '去中心化自治组织系统，支持提案创建、投票和执行。',
      tech: ['Solidity', 'OpenZeppelin', 'Foundry'],
      github: 'https://github.com/Lin-xun1113/ClassWork-foundry-dao',
      color: '#00d2d3'
    }
  ];

  return (
    <>
      <Head>
        <title>PROJECTS | LINXUN</title>
        <meta name="description" content="Linxun的区块链项目作品集" />
      </Head>
      
      <Navbar />
      
      <div className="projects-page">
        {/* 页面标题 */}
        <header className="page-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="header-code">[02]</span>
            <h1 className="header-title">PROJECTS</h1>
            <p className="header-subtitle">区块链作品集 / BLOCKCHAIN PORTFOLIO</p>
          </motion.div>
        </header>
        
        {/* 横向滚动区域 */}
        <div className="scroll-container" ref={scrollRef}>
          <div className="projects-track">
            {projects.map((project, i) => (
              <motion.article 
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-header" style={{ borderColor: project.color }}>
                  <span className="project-id" style={{ color: project.color }}>{project.id}</span>
                  <span className="project-category">{project.category}</span>
                </div>
                
                <div className="card-body">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-desc">{project.desc}</p>
                  
                  <div className="tech-stack">
                    {project.tech.map((t, j) => (
                      <span key={j} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
                
                <div className="card-footer">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FiGithub size={18} />
                    <span>VIEW SOURCE</span>
                  </a>
                </div>
                
                {/* 装饰性背景 */}
                <div 
                  className="card-glow"
                  style={{ background: `radial-gradient(circle at center, ${project.color}15 0%, transparent 70%)` }}
                />
              </motion.article>
            ))}
          </div>
        </div>
        
        {/* 底部导航 */}
        <footer className="page-footer">
          <Link href="/" className="back-link">
            <span>←</span> BACK TO HOME
          </Link>
          <a 
            href="https://github.com/Lin-xun1113?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="more-link"
          >
            VIEW ALL ON GITHUB <FiExternalLink size={14} />
          </a>
        </footer>
      </div>
      
      <style jsx>{`
        .projects-page {
          min-height: 100vh;
          padding-top: 100px;
        }
        
        .page-header {
          padding: 40px 5vw 30px;
          text-align: center;
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
        
        .scroll-container {
          padding: 40px 5vw;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          scrollbar-color: var(--warm-primary) var(--warm-surface);
        }
        
        .scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        
        .scroll-container::-webkit-scrollbar-track {
          background: var(--warm-surface);
        }
        
        .scroll-container::-webkit-scrollbar-thumb {
          background: var(--warm-primary);
          border-radius: 4px;
        }
        
        .projects-track {
          display: flex;
          gap: 30px;
          padding-bottom: 20px;
          width: max-content;
        }
        
        .project-card {
          flex-shrink: 0;
          width: 400px;
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 2px solid;
        }
        
        .project-id {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
        }
        
        .project-category {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--warm-muted);
          letter-spacing: 0.1em;
        }
        
        .card-body {
          flex: 1;
          padding: 24px 20px;
        }
        
        .project-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--warm-text);
          margin: 0 0 12px;
        }
        
        .project-desc {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-muted);
          line-height: 1.6;
          margin: 0 0 20px;
        }
        
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tech-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          padding: 4px 10px;
          background: var(--warm-card);
          border: 1px solid var(--warm-border);
          color: var(--warm-text);
        }
        
        .card-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--warm-border);
        }
        
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .project-link:hover {
          color: var(--warm-primary);
        }
        
        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .project-card:hover .card-glow {
          opacity: 1;
        }
        
        .page-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 5vw;
          border-top: 1px solid var(--warm-border);
          margin-top: 40px;
        }
        
        .back-link, .more-link {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-muted);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        
        .back-link:hover, .more-link:hover {
          color: var(--warm-primary);
        }
        
        @media (max-width: 900px) {
          .project-card {
            width: 320px;
          }
          
          .page-footer {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { SiSolidity, SiPython, SiEthereum, SiReact } from 'react-icons/si';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  const projects = [
    {
      title: 'BeefDex',
      subtitle: '去中心化交易所',
      description: '一个功能完整的去中心化交易所项目，支持代币交换、流动性提供等功能。',
      techStack: ['Solidity', 'React', 'Web3.js'],
      icon: <SiEthereum size={30} />,
      color: 'var(--neon-cyan)',
      github: 'https://github.com/Lin-xun1113/BeefDex',
      featured: true
    },
    {
      title: 'CarbonExchange',
      subtitle: '碳交易平台',
      description: '基于区块链的碳排放交易平台，实现碳积分的代币化和交易功能。',
      techStack: ['Solidity', 'Foundry', 'React'],
      icon: <SiSolidity size={30} />,
      color: 'var(--neon-green)',
      github: 'https://github.com/Lin-xun1113/CarbonExchange',
      featured: true
    },
    {
      title: 'CrossBridge',
      subtitle: '跨链桥',
      description: '支持多链资产转移的跨链桥项目，包含智能合约和前端界面。',
      techStack: ['Solidity', 'Ethers.js', 'Next.js'],
      icon: <SiEthereum size={30} />,
      color: 'var(--neon-purple)',
      github: 'https://github.com/Lin-xun1113/CrossBridge-Contract'
    },
    {
      title: 'RPS Game',
      subtitle: '链上石头剪刀布',
      description: '基于智能合约的石头剪刀布游戏，使用commit-reveal机制确保公平。',
      techStack: ['Solidity', 'React', 'Foundry'],
      icon: <SiSolidity size={30} />,
      color: 'var(--neon-pink)',
      github: 'https://github.com/Lin-xun1113/RPC-Game-Contract'
    },
    {
      title: '算法稳定币',
      subtitle: 'DeFi Stablecoin',
      description: '基于算法的稳定币智能合约，实现价格稳定机制和自动调节供应量的功能。',
      techStack: ['Solidity', 'Chainlink', 'Foundry'],
      icon: <SiEthereum size={30} />,
      color: 'var(--neon-orange)',
      github: 'https://github.com/Lin-xun1113/ClassWork-foundry-defi-stablecoin'
    },
    {
      title: 'DAO 治理系统',
      subtitle: '去中心化自治组织',
      description: '包含提案创建、投票和执行功能的DAO系统，支持代币持有者参与治理决策。',
      techStack: ['Solidity', 'OpenZeppelin', 'Foundry'],
      icon: <SiSolidity size={30} />,
      color: 'var(--neon-cyan)',
      github: 'https://github.com/Lin-xun1113/ClassWork-foundry-dao'
    },
  ];
  
  return (
    <section id="projects" className="retro-section" ref={ref}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, var(--neon-pink) 0%, transparent 70%)',
        opacity: 0.1,
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>
      
      <div className="container position-relative">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title text-gradient mb-5"
            variants={itemVariants}
          >
            项目展示
          </motion.h2>
          
          {/* 项目网格 */}
          <div className="row g-4">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className={project.featured ? 'col-lg-6' : 'col-lg-4'}
                variants={itemVariants}
              >
                <div 
                  className="h-100"
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${project.color}33`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = project.color;
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${project.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${project.color}33`;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* 顶部光条 */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`
                  }}></div>
                  
                  {/* 头部 */}
                  <div style={{
                    padding: '1.5rem',
                    borderBottom: `1px solid ${project.color}22`,
                    background: `linear-gradient(135deg, ${project.color}11 0%, transparent 100%)`
                  }}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div style={{
                          width: '50px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${project.color}`,
                          color: project.color,
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}>
                          {project.icon}
                        </div>
                        <div>
                          <h3 style={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: '1.1rem',
                            color: 'var(--text-primary)',
                            margin: 0
                          }}>
                            {project.title}
                          </h3>
                          <p style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: project.color,
                            margin: 0
                          }}>
                            {project.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {project.featured && (
                        <span style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '0.7rem',
                          padding: '4px 10px',
                          background: `${project.color}22`,
                          border: `1px solid ${project.color}`,
                          color: project.color
                        }}>
                          FEATURED
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* 内容 */}
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '1rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7',
                      marginBottom: '1.5rem'
                    }}>
                      {project.description}
                    </p>
                    
                    {/* 技术标签 */}
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span 
                          key={i}
                          style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            background: 'rgba(0, 255, 255, 0.1)',
                            border: '1px solid var(--neon-cyan)',
                            color: 'var(--neon-cyan)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* 链接 */}
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-inline-flex align-items-center gap-2"
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.9rem',
                        color: project.color,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textShadow = `0 0 10px ${project.color}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textShadow = 'none';
                      }}
                    >
                      <FiGithub size={18} />
                      查看源码
                      <FiArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 查看更多 */}
          <motion.div 
            className="text-center mt-5 pt-4"
            variants={itemVariants}
          >
            <a 
              href="https://github.com/Lin-xun1113?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn"
            >
              <span className="d-flex align-items-center gap-2">
                <FiGithub size={18} />
                查看全部项目
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

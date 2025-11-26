import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiChevronDown } from 'react-icons/fi';
import { SiSolidity, SiEthereum } from 'react-icons/si';

const Hero = () => {
  const glitchText = (text) => {
    return (
      <span className="glitch-wrapper">
        <span className="glitch-text" data-text={text}>{text}</span>
      </span>
    );
  };

  return (
    <section className="retro-hero" id="hero">
      {/* 动态背景粒子 */}
      <div className="cyber-grid"></div>
      
      {/* 霓虹日落 */}
      <div className="retro-sun"></div>
      
      {/* 透视网格地面 */}
      <div className="perspective-grid"></div>
      
      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row align-items-center min-vh-100 py-5">
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* 终端风格状态栏 */}
              <motion.div 
                className="terminal-status mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="status-dot"></span>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85rem' }}>
                  SYSTEM_STATUS: <span style={{ color: 'var(--neon-green)' }}>ONLINE</span>
                </span>
              </motion.div>
              
              {/* 主标题 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p style={{ 
                  fontFamily: "'Share Tech Mono', monospace",
                  color: 'var(--neon-cyan)',
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem'
                }}>
                  {'>'} INITIALIZING USER_PROFILE...
                </p>
                
                <h1 className="hero-title text-gradient mb-2">
                  LINXUN
                </h1>
                
                <h2 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1.5rem',
                  color: 'var(--neon-pink)',
                  textShadow: '0 0 20px var(--neon-pink)',
                  marginBottom: '2rem'
                }}>
                  智能合约开发者 / BLOCKCHAIN DEVELOPER
                </h2>
              </motion.div>
              
              {/* 终端风格描述 */}
              <motion.div 
                className="terminal-box mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid var(--neon-cyan)',
                  padding: '1.5rem',
                  maxWidth: '550px'
                }}
              >
                <p style={{ 
                  fontFamily: "'Share Tech Mono', monospace",
                  color: 'var(--neon-green)',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: 'var(--neon-cyan)' }}>$</span> cat about.txt
                </p>
                <p style={{ 
                  fontFamily: "'Rajdhani', sans-serif",
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '1.05rem'
                }}>
                  热爱探索区块链技术和智能合约开发，致力于创造安全、高效的去中心化应用。
                  精通 Solidity 和 Web3 开发，拥有深厚的计算机科学背景。
                </p>
              </motion.div>
              
              {/* 技术标签 */}
              <motion.div 
                className="d-flex flex-wrap gap-3 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {['Solidity', 'Python', 'Web3.js', 'DeFi', 'Smart Contract Audit'].map((tech, i) => (
                  <span 
                    key={i}
                    className="project-tag"
                    style={{ 
                      animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
              
              {/* 按钮组 */}
              <motion.div 
                className="d-flex flex-wrap gap-3 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <a href="#projects" className="cyber-btn">
                  浏览项目
                </a>
                <a href="#contact" className="cyber-btn cyber-btn-pink">
                  联系我
                </a>
              </motion.div>
              
              {/* 社交链接 */}
              <motion.div 
                className="d-flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <a href="https://github.com/Lin-xun1113" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FiGithub size={20} />
                </a>
                <a href="mailto:linxun1113@gmail.com" className="social-icon">
                  <FiMail size={20} />
                </a>
                <a href="https://linkedin.com/in/linxun1113" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FiLinkedin size={20} />
                </a>
              </motion.div>
            </motion.div>
          </div>
          
          {/* 右侧装饰 */}
          <div className="col-lg-5 d-none d-lg-block">
            <motion.div
              className="position-relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* 头像容器 */}
              <div className="avatar-container mx-auto" style={{ width: '300px', height: '300px' }}>
                <img 
                  src="/avatar.jpg" 
                  alt="Linxun"
                  className="avatar-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                />
              </div>
              
              {/* 装饰性图标 */}
              <motion.div
                className="position-absolute"
                style={{ top: '10%', right: '10%' }}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <SiEthereum size={40} style={{ color: 'var(--neon-purple)', filter: 'drop-shadow(0 0 10px var(--neon-purple))' }} />
              </motion.div>
              
              <motion.div
                className="position-absolute"
                style={{ bottom: '20%', left: '5%' }}
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <SiSolidity size={35} style={{ color: 'var(--neon-cyan)', filter: 'drop-shadow(0 0 10px var(--neon-cyan))' }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* 向下滚动提示 */}
        <motion.div 
          className="position-absolute bottom-0 start-50 translate-middle-x pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <a href="#about" className="d-flex flex-column align-items-center text-decoration-none">
            <span style={{ 
              fontFamily: "'Share Tech Mono', monospace",
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              marginBottom: '0.5rem'
            }}>
              SCROLL_DOWN
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiChevronDown size={24} style={{ color: 'var(--neon-cyan)' }} />
            </motion.div>
          </a>
        </motion.div>
      </div>
      
      <style jsx>{`
        .retro-hero {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%);
        }
        
        .retro-sun {
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
          width: 350px;
          height: 350px;
          background: linear-gradient(180deg, #ff6b35 0%, #ff2d95 50%, #b829dd 100%);
          border-radius: 50%;
          filter: blur(2px);
          opacity: 0.7;
          animation: sunPulse 4s ease-in-out infinite;
        }
        
        .perspective-grid {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 45%;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 49px,
              rgba(0, 255, 255, 0.15) 49px,
              rgba(0, 255, 255, 0.15) 50px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 49px,
              rgba(255, 45, 149, 0.1) 49px,
              rgba(255, 45, 149, 0.1) 50px
            );
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center top;
        }
        
        .terminal-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--neon-green);
          color: var(--neon-green);
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--neon-green);
          border-radius: 50%;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        
        @keyframes sunPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
};

export default Hero;

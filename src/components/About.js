import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const stats = [
    { number: '2+', label: '年开发经验', color: 'var(--neon-cyan)' },
    { number: '10+', label: '完成项目', color: 'var(--neon-pink)' },
    { number: '5+', label: '技术栈', color: 'var(--neon-purple)' },
  ];
  
  return (
    <section id="about" className="retro-section" ref={ref}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* 标题 */}
          <motion.h2 
            className="section-title text-gradient mb-5"
            variants={itemVariants}
          >
            关于我
          </motion.h2>
          
          <div className="row g-5">
            {/* 左侧 - 头像和统计 */}
            <div className="col-lg-4">
              <motion.div variants={itemVariants}>
                {/* 头像 */}
                <div className="text-center mb-4">
                  <div 
                    className="avatar-container mx-auto mb-4"
                    style={{ 
                      width: '200px', 
                      height: '200px',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: '-3px',
                      background: 'linear-gradient(45deg, var(--neon-cyan), var(--neon-pink), var(--neon-purple))',
                      borderRadius: '50%',
                      animation: 'rotate 3s linear infinite',
                      filter: 'blur(3px)'
                    }}></div>
                    <img 
                      src="/avatar.jpg" 
                      alt="Linxun"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '3px solid var(--bg-dark)',
                        position: 'relative',
                        zIndex: 1
                      }}
                    />
                  </div>
                  
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '1.5rem',
                    color: 'var(--neon-cyan)',
                    marginBottom: '0.5rem'
                  }}>
                    LINXUN
                  </h3>
                  <p style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                  }}>
                    区块链开发者 / 计算机科学学生
                  </p>
                </div>
                
                {/* 统计数据 */}
                <div className="row g-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-4">
                      <div 
                        className="text-center p-3"
                        style={{
                          background: 'var(--bg-card)',
                          border: `1px solid ${stat.color}`,
                          boxShadow: `0 0 15px ${stat.color}33`
                        }}
                      >
                        <div style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: '1.8rem',
                          fontWeight: '700',
                          color: stat.color,
                          textShadow: `0 0 10px ${stat.color}`
                        }}>
                          {stat.number}
                        </div>
                        <div style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)'
                        }}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* 右侧 - 个人介绍 */}
            <div className="col-lg-8">
              <motion.div variants={itemVariants}>
                {/* 终端风格介绍 */}
                <div 
                  className="terminal-box mb-4"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid var(--neon-cyan)',
                    padding: '2rem'
                  }}
                >
                  <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    marginBottom: '1rem'
                  }}>
                    <span style={{ color: 'var(--neon-green)' }}>linxun@blockchain</span>
                    <span style={{ color: 'var(--text-muted)' }}>:</span>
                    <span style={{ color: 'var(--neon-cyan)' }}>~</span>
                    <span style={{ color: 'var(--text-muted)' }}>$ </span>
                    <span style={{ color: 'var(--neon-pink)' }}>whoami</span>
                  </div>
                  
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: 'var(--text-secondary)',
                    lineHeight: '1.9',
                    fontSize: '1.05rem'
                  }}>
                    <p className="mb-3">
                      👋 我是 <span style={{ color: 'var(--neon-cyan)' }}>Linxun</span>，出生于2004年11月13日。
                      2023年9月开始就读于<span style={{ color: 'var(--neon-pink)' }}>兰州大学</span>，
                      专业是计算机科学与技术（数据科学方向）。
                    </p>
                    <p className="mb-3">
                      🎓 我的专业是兰州大学与美国德雷塞尔大学的国际合作办学项目，目前正在大二阶段学习。
                    </p>
                    <p className="mb-3">
                      ⛓️ 从2025年1月开始，我正式深入学习<span style={{ color: 'var(--neon-purple)' }}>区块链技术</span>，
                      现在已经掌握了 Solidity、Python 等技术栈，并且完成了数个 Solidity 简单项目的开发。
                    </p>
                    <p className="mb-0">
                      🔒 目前我正在专注于<span style={{ color: 'var(--neon-green)' }}>智能合约审计</span>的学习，
                      希望未来能够为去中心化的世界贡献一份来自中国的力量。
                    </p>
                  </div>
                </div>
                
                {/* 教育经历时间线 */}
                <motion.div variants={itemVariants}>
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '1.2rem',
                    color: 'var(--neon-pink)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <FiAward /> 教育经历
                  </h3>
                  
                  <div className="retro-timeline">
                    <div className="timeline-item">
                      <div style={{
                        background: 'var(--bg-card)',
                        border: '1px solid rgba(255, 45, 149, 0.3)',
                        padding: '1.5rem'
                      }}>
                        <h4 style={{
                          fontFamily: "'Orbitron', sans-serif",
                          fontSize: '1rem',
                          color: 'var(--text-primary)',
                          marginBottom: '0.5rem'
                        }}>
                          兰州大学 × 德雷塞尔大学
                        </h4>
                        <p style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          color: 'var(--neon-cyan)',
                          marginBottom: '0.5rem'
                        }}>
                          计算机科学与技术（数据科学方向）
                        </p>
                        <div className="d-flex align-items-center gap-3" style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)'
                        }}>
                          <span className="d-flex align-items-center gap-1">
                            <FiCalendar size={14} /> 2023.09 - 至今
                          </span>
                          <span className="d-flex align-items-center gap-1">
                            <FiMapPin size={14} /> 中国甘肃
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default About;

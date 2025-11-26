import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode, FiDatabase, FiServer, FiShield } from 'react-icons/fi';
import { SiSolidity, SiPython, SiReact, SiEthereum } from 'react-icons/si';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  const skillCategories = [
    {
      title: '区块链技术',
      icon: <SiEthereum size={24} />,
      color: 'var(--neon-purple)',
      skills: [
        { name: 'Solidity', level: 75 },
        { name: '智能合约开发', level: 65 },
        { name: '智能合约审计', level: 30 },
        { name: 'Web3.js / Ethers.js', level: 60 },
      ]
    },
    {
      title: '编程语言',
      icon: <FiCode size={24} />,
      color: 'var(--neon-cyan)',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'Solidity', level: 75 },
        { name: 'JavaScript', level: 45 },
        { name: 'SQL', level: 60 },
      ]
    },
    {
      title: '数据科学',
      icon: <FiDatabase size={24} />,
      color: 'var(--neon-pink)',
      skills: [
        { name: '数据处理 (Pandas)', level: 75 },
        { name: '数据可视化', level: 75 },
        { name: '机器学习', level: 60 },
        { name: '深度学习', level: 50 },
      ]
    },
    {
      title: '开发工具',
      icon: <FiServer size={24} />,
      color: 'var(--neon-orange)',
      skills: [
        { name: 'Foundry', level: 70 },
        { name: 'Git', level: 65 },
        { name: 'Linux', level: 55 },
        { name: 'Docker', level: 40 },
      ]
    },
  ];
  
  return (
    <section id="skills" className="retro-section" ref={ref}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title text-gradient mb-5"
            variants={itemVariants}
          >
            技能矩阵
          </motion.h2>
          
          {/* 技能卡片网格 */}
          <div className="row g-4 mb-5">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="col-lg-6"
                variants={itemVariants}
              >
                <div 
                  className="retro-card h-100"
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${category.color}33`,
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* 顶部光条 */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: category.color
                  }}></div>
                  
                  {/* 标题 */}
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${category.color}`,
                      color: category.color,
                      boxShadow: `0 0 15px ${category.color}33`
                    }}>
                      {category.icon}
                    </div>
                    <h3 style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '1.1rem',
                      color: category.color,
                      margin: 0
                    }}>
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* 技能条 */}
                  <div className="d-flex flex-column gap-3">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="skill-bar-container">
                        <div className="d-flex justify-content-between mb-2">
                          <span style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)'
                          }}>
                            {skill.name}
                          </span>
                          <span style={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: '0.8rem',
                            color: category.color
                          }}>
                            {skill.level}%
                          </span>
                        </div>
                        <div style={{
                          height: '6px',
                          background: 'rgba(255,255,255,0.1)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                            style={{
                              height: '100%',
                              background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                              boxShadow: `0 0 10px ${category.color}`
                            }}
                          />
                          {/* 扫描线效果 */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)',
                            pointerEvents: 'none'
                          }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 技术栈总览 */}
          <motion.div 
            variants={itemVariants}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 45, 149, 0.1) 100%)',
              border: '1px solid var(--neon-cyan)',
              padding: '2rem',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '20px',
              background: 'var(--bg-dark)',
              padding: '0 15px',
              fontFamily: "'Share Tech Mono', monospace",
              color: 'var(--neon-cyan)',
              fontSize: '0.85rem'
            }}>
              {'>'} TECH_STACK_OVERVIEW
            </div>
            
            <div className="row g-4">
              <div className="col-md-6">
                <h4 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--neon-pink)',
                  marginBottom: '1rem'
                }}>
                  主要技术方向
                </h4>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  深入掌握 Python，将其应用于数据结构、数据处理、数据可视化、机器学习和深度学习等领域。
                  曾使用 Flask 框架和 Django 框架结合大语言模型开发智能文旅项目后端。
                </p>
              </div>
              <div className="col-md-6">
                <h4 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1rem',
                  color: 'var(--neon-purple)',
                  marginBottom: '1rem'
                }}>
                  区块链开发
                </h4>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8'
                }}>
                  从2025年2月开始学习 Solidity 合约开发，已经完成算法稳定币、DAO、NFT、ERC20代币等项目。
                  目前正在深入学习智能合约审计，期待早日参加竞争性审计比赛。
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

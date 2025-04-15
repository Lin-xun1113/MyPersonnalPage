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
  
  const skillCategories = [
    {
      title: '区块链技术',
      icon: <FiServer className="text-primary-custom fs-3" />,
      skills: [
        { name: 'Solidity', level: 75, icon: <SiSolidity /> },
        { name: '智能合约开发', level: 65, icon: <SiEthereum /> },
        { name: '智能合约审计', level: 30, icon: <FiShield /> },
      ]
    },
    {
      title: '编程语言',
      icon: <FiCode className="text-primary-custom fs-3" />,
      skills: [
        { name: 'Python', level: 80, icon: <SiPython /> },
        { name: 'Solidity', level: 75, icon: <SiSolidity /> },
        { name: 'JavaScript/React', level: 35, icon: <SiReact /> },
      ]
    },
    {
      title: '数据科学',
      icon: <FiDatabase className="text-primary-custom fs-3" />,
      skills: [
        { name: '数据处理', level: 75, icon: null },
        { name: '数据可视化', level: 75, icon: null },
        { name: '机器学习', level: 60, icon: null },
        { name: '深度学习', level: 50, icon: null },
      ]
    },
  ];
  
  return (
    <section id="skills" className="section-padding skills-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-center mb-5 text-white fw-bold"
            variants={itemVariants}
          >
            技能与经验
          </motion.h2>
          
          <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="col"
                variants={itemVariants}
              >
                <div className="card skill-card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-4">
                      <div className="icon-circle me-3">
                        {category.icon}
                      </div>
                      <h3 className="fs-5 fw-semibold text-primary mb-0">{category.title}</h3>
                    </div>
                    
                    <div className="d-flex flex-column gap-3">
                      {category.skills.map((skill, idx) => (
                        <div key={idx}>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex align-items-center text-white">
                              {skill.icon && <span className="me-2">{skill.icon}</span>}
                              <span>{skill.name}</span>
                            </div>
                            <span className="small text-light">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="p-4 rounded shadow text-white"
            style={{background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)'}}
            variants={itemVariants}
          >
            <h3 className="fs-4 fw-semibold mb-3">技术经验概述</h3>
            <p className="mb-3">
              我深入掌握Python，并将其应用于数据结构、数据处理、数据可视化、机器学习和深度学习等领域。
              曾使用Flask框架和Django框架结合大语言模型开发智能文旅项目后端。
            </p>
            <p className="mb-3">
              从2025年2月开始学习Solidity合约开发，已经完成自己的算法稳定币、DAO、NFT、ERC20代币等简单项目。
            </p>
            <p className="mb-0">
              目前正在深入学习智能合约审计，希望早日开始自己的竞争性审计比赛。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

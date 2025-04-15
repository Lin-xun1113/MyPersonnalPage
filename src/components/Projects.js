import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiSolidity, SiPython, SiEthereum } from 'react-icons/si';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const projects = [
    {
      title: '算法稳定币项目',
      description: '开发了一个基于算法的稳定币智能合约，实现了价格稳定机制和自动调节供应量的功能。',
      image: '/project-stablecoin.jpg',
      techStack: ['Solidity', 'Web3.js', 'React'],
      icons: [<SiSolidity key="sol" />, <SiEthereum key="eth" />],
      links: [
        { icon: <FiGithub />, url: 'https://github.com/Lin-xun1113/ClassWork-foundry-defi-stablecoin' },
        // { icon: <FiExternalLink />, url: 'https://stablecoin-demo.netlify.app' },
      ]
    },
    {
      title: 'DAO治理系统',
      description: '构建了一个去中心化自治组织系统，包含提案创建、投票和执行功能，支持代币持有者参与治理决策。',
      image: '/project-dao.jpg',
      techStack: ['Solidity', 'Ethers.js', 'Next.js'],
      icons: [<SiSolidity key="sol" />, <SiEthereum key="eth" />],
      links: [
        { icon: <FiGithub />, url: 'https://github.com/Lin-xun1113/https://github.com/Lin-xun1113/ClassWork-foundry-daodao-governanc' },
      ]
    },
    {
      title: 'NFT集合项目',
      description: '创建了一个NFT集合智能合约，实现了铸造、交易和简单的转换功能。',
      image: '/project-nft.jpg',
      techStack: ['Solidity', 'IPFS', 'React'],
      icons: [<SiSolidity key="sol" />, <SiEthereum key="eth" />],
      links: [
        { icon: <FiGithub />, url: 'https://github.com/Lin-xun1113/ClassWork-foundry-nft' },
        // { icon: <FiExternalLink />, url: 'https://nft-showcase.netlify.app' },
      ]
    },
    {
      title: '智能文旅项目',
      description: '使用Django框架结合大语言模型开发的智能文旅平台后端，实现了智能推荐和个性化旅游路线规划。',
      image: '/project-travel.jpg',
      techStack: ['Python', 'Django', '大语言模型', 'RESTful API'],
      icons: [<SiPython key="py" />],
      links: [
        { icon: <FiGithub />, url: 'https://github.com/Lin-xun1113/SRJC' },
      ]
    },
  ];
  
  return (
    <section id="projects" className="section-padding projects-section">
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
            项目展示
          </motion.h2>
          
          <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="col"
                variants={itemVariants}
              >
                <div className="card project-card h-100">
                  <div className="project-icon-area d-flex align-items-center justify-content-center py-4">
                    <div className="fs-1 text-primary">
                      {project.icons.map((icon, i) => (
                        <span key={i} className="mx-2">{icon}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="fs-5 fw-semibold mb-3 text-primary">{project.title}</h3>
                    
                    <div className="mb-3 d-flex flex-wrap">
                      {project.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="badge tech-badge me-2 mb-2"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-white-custom mb-4">{project.description}</p>
                    
                    <div className="d-flex gap-3 mt-auto">
                      {project.links.map((link, i) => (
                        <a 
                          key={i}
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <span className="fs-4">{link.icon}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-5"
            variants={itemVariants}
          >
            <a 
              href="https://github.com/Lin-xun1113?tab=repositories" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-custom"
            >
              查看更多项目
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

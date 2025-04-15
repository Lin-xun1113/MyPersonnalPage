import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="hero" className="hero-section position-relative overflow-hidden">
      {/* 背景动画元素 */}
      <div className="position-absolute top-0 end-0 d-none d-lg-block" style={{zIndex: 1}}>
        <div className="bg-shape-circle"></div>
      </div>
      
      <div className="container py-5" style={{zIndex: 2, position: 'relative'}}>
        <div className="row align-items-center" style={{minHeight: "calc(100vh - 76px)"}}>
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="badge bg-primary-custom bg-opacity-10 text-primary-custom px-3 py-2 mb-4">
                <span className="fw-semibold">Blockchain Developer</span>
              </div>
              
              <h4 className="text-white-50 mb-2 fs-5">你好，我是</h4>
              <h1 className="display-3 fw-bold text-white mb-0">Linxun</h1>
              <div className="my-4">
                <h2 className="h3 text-accent fw-semibold">
                  智能合约开发者
                </h2>
              </div>
              
              <p className="lead text-white-50 mb-5">
                热爱探索区块链技术和智能合约开发，致力于创造安全、高效的去中心化应用。
                精通Solidity和Web3开发，拥有深厚的计算机科学背景。
              </p>
              
              <div className="d-flex flex-wrap gap-3 hero-buttons">
                <a 
                  href="#projects" 
                  className="btn btn-primary-custom d-flex align-items-center gap-2"
                >
                  浏览项目 <FiArrowRight />
                </a>
                <a 
                  href="#contact" 
                  className="btn btn-outline-primary-custom"
                >
                  联系我
                </a>
              </div>
              
              <div className="mt-5 d-flex gap-4">
                <a href="https://github.com/Lin-xun1113" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FiGithub size={20} color="white" />
                </a>
                <a href="#" className="social-icon">
                  <FiLinkedin size={20} color="white" />
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="col-lg-5 d-none d-lg-block text-center position-relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="hero-image-container p-4">
              <div className="hero-backdrop"></div>
              {/* 使用真实头像图片 */}
              <img
                src="/avatar.jpg"
                alt="Linxun头像"
                className="hero-image-placeholder"
                style={{
                  width: "350px", 
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  margin: "0 auto",
                  border: "4px solid var(--accent)"
                }}
              />
            </div>
          </motion.div>
        </div>
        
        <div className="position-absolute bottom-0 start-50 translate-middle-x pb-5 d-none d-lg-block" style={{zIndex: 2}}>
          <motion.a 
            href="#about" 
            className="text-white text-decoration-none d-flex flex-column align-items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="mb-2 small">向下滚动</span>
            <FiArrowDown className="arrow-down" size={24} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

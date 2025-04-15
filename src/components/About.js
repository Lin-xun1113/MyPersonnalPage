import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <motion.h2 
                className="text-center mb-5 text-primary-custom fw-bold"
                variants={variants}
              >
                关于我
              </motion.h2>
              
              <div className="row align-items-center mb-5">
                <motion.div 
                  className="col-md-4 text-center mb-4 mb-md-0"
                  variants={variants}
                >
                  <img 
                    src="/avatar.jpg" 
                    alt="Linxun头像" 
                    className="rounded-circle mx-auto d-block" 
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                      border: '3px solid var(--primary)'
                    }}
                  />
                </motion.div>
                
                <motion.div 
                  className="col-md-8"
                  variants={variants}
                >
                  <p className="fs-5 mb-3 text-white">
                    我的昵称是Linxun，出生于2004年11月13日。2023年9月开始就读于兰州大学，专业是计算机科学与技术（数据科学方向）。
                    我的专业是兰州大学与美国德雷塞尔大学的国际合作办学项目，目前我正在大二阶段学习。
                  </p>
                  <p className="fs-5 mb-3 text-white">
                    从2025年1月开始，我正式深入学习区块链技术，现在已经掌握了Solidity、Python等技术栈，
                    并且完成了数个Solidity简单项目的开发。
                  </p>
                  <p className="fs-5 text-white">
                    目前我正在专注于智能合约审计的学习，希望未来能够为去中心化的世界贡献一份来自中国的力量。
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-5 p-5 bg-background-light rounded shadow"
                variants={variants}
              >
                <h3 className="fs-4 fw-semibold mb-5 text-primary">教育经历</h3>
                <div className="position-relative ps-5 border-start border-2 border-primary">
                  <div className="mb-5 position-relative">
                    <div className="position-absolute" style={{left: '-25px', top: '6px', width: '20px', height: '20px', backgroundColor: 'var(--primary)', borderRadius: '50%', border: '2px solid var(--background)'}}></div>
                    <h4 className="fw-medium fs-5 text-white mb-3">兰州大学 × 德雷塞尔大学</h4>
                    <p className="text-light mb-3">计算机科学与技术（数据科学方向）</p>
                    <p className="small text-primary-custom">2023年9月 - 至今</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

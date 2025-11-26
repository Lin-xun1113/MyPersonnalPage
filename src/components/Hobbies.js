import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBook, FiCamera, FiCoffee, FiGlobe, FiMusic, FiMonitor, FiActivity } from 'react-icons/fi';

const Hobbies = () => {
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const hobbies = [
    {
      title: '阅读',
      icon: <FiBook size={28} />,
      description: '喜欢阅读技术书籍和科幻小说，特别是区块链和密码学相关的内容。',
      color: 'var(--neon-cyan)'
    },
    {
      title: '旅行',
      icon: <FiGlobe size={28} />,
      description: '热爱探索新地方，体验不同的文化和美食，拓宽视野。',
      color: 'var(--neon-pink)'
    },
    {
      title: '摄影',
      icon: <FiCamera size={28} />,
      description: '用镜头记录生活中的美好瞬间，关注光影与构图的艺术。',
      color: 'var(--neon-purple)'
    },
    {
      title: '咖啡',
      icon: <FiCoffee size={28} />,
      description: '喜欢尝试不同产地的咖啡，在咖啡厅思考和编程。',
      color: 'var(--neon-orange)'
    },
    {
      title: '音乐',
      icon: <FiMusic size={28} />,
      description: '欣赏各类风格的音乐，编程时喜欢听电子和Lo-fi音乐。',
      color: 'var(--neon-green)'
    },
    {
      title: '数码',
      icon: <FiMonitor size={28} />,
      description: '关注最新的数码产品和技术趋势，热衷于折腾各种设备。',
      color: 'var(--neon-cyan)'
    },
  ];
  
  return (
    <section id="hobbies" className="retro-section" ref={ref}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-100px',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)',
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
            兴趣爱好
          </motion.h2>
          
          {/* 爱好卡片网格 */}
          <div className="row g-4 mb-5">
            {hobbies.map((hobby, index) => (
              <motion.div 
                key={index}
                className="col-md-6 col-lg-4"
                variants={itemVariants}
              >
                <div 
                  className="h-100 p-4"
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${hobby.color}33`,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = hobby.color;
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `0 15px 30px rgba(0,0,0,0.3), 0 0 20px ${hobby.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${hobby.color}33`;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* 角标装饰 */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '40px',
                    height: '40px',
                    background: `linear-gradient(135deg, transparent 50%, ${hobby.color}33 50%)`,
                  }}></div>
                  
                  {/* 图标 */}
                  <div 
                    className="mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${hobby.color}`,
                      color: hobby.color,
                      boxShadow: `0 0 15px ${hobby.color}33`,
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                    }}
                  >
                    {hobby.icon}
                  </div>
                  
                  {/* 标题 */}
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '1.1rem',
                    color: hobby.color,
                    marginBottom: '0.75rem'
                  }}>
                    {hobby.title}
                  </h3>
                  
                  {/* 描述 */}
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {hobby.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 底部总结 */}
          <motion.div 
            variants={itemVariants}
            style={{
              background: 'linear-gradient(135deg, rgba(184, 41, 221, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)',
              border: '1px solid var(--neon-purple)',
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
              color: 'var(--neon-purple)',
              fontSize: '0.85rem'
            }}>
              {'>'} LIFE_PHILOSOPHY
            </div>
            
            <div className="row align-items-center">
              <div className="col-md-8">
                <h4 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1.2rem',
                  color: 'var(--neon-pink)',
                  marginBottom: '1rem'
                }}>
                  业余爱好与专业成长
                </h4>
                <p style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  margin: 0
                }}>
                  我相信，丰富的业余爱好不仅能够丰富生活，还能为专业发展提供灵感和动力。
                  通过阅读拓宽视野，旅行体验不同文化，摄影培养审美能力，
                  这些爱好共同塑造了我全面发展的个性，也为我在区块链和计算机科学领域的学习和创新提供了独特视角。
                </p>
              </div>
              <div className="col-md-4 text-center d-none d-md-block">
                <FiActivity 
                  size={80} 
                  style={{ 
                    color: 'var(--neon-purple)',
                    opacity: 0.5,
                    filter: 'drop-shadow(0 0 20px var(--neon-purple))'
                  }} 
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hobbies;

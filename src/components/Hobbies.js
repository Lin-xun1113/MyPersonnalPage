import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBook, FiCamera, FiCoffee, FiGlobe, FiMusic } from 'react-icons/fi';

const Hobbies = () => {
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
  
  const hobbies = [
    {
      title: '读书',
      icon: <FiBook className="text-primary-custom fs-2" />,
      description: '喜欢读各类技术书籍和科幻论读物，特别是区块链相关的书。',
    },
    {
      title: '旅行',
      icon: <FiGlobe className="text-primary-custom fs-2" />,
      description: '热爱旅行和探索新地方，喜欢体验不同的文化和食物。',
    },
    {
      title: '摄影',
      icon: <FiCamera className="text-primary-custom fs-2" />,
      description: '业余时间用相机记录生活中的美好瞬间，关注光影创作。',
    },
    {
      title: '咖啡',
      icon: <FiCoffee className="text-primary-custom fs-2" />,
      description: '喜欢尝试不同的咖啡豪品，并在咖啡厅工作或讨论',
    },
    {
      title: '音乐',
      icon: <FiMusic className="text-primary-custom fs-2" />,
      description: '喜欢听各类风格的音乐，并收藏黄金时代的黄金歌',
    },
  ];
  
  return (
    <section id="hobbies" className="section-padding hobbies-section">
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
            兴趣爱好
          </motion.h2>
          
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {hobbies.map((hobby, index) => (
              <motion.div 
                key={index}
                className="col"
                variants={itemVariants}
              >
                <div className="card hobby-card h-100 text-center">
                  <div className="card-body">
                    <div className="d-flex justify-content-center mb-4">
                      <div className="hobby-icon-circle">
                        {hobby.icon}
                      </div>
                    </div>
                    <h3 className="fs-5 fw-semibold mb-3 text-primary">{hobby.title}</h3>
                    <p className="text-white-custom mb-0">{hobby.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-5 p-4 bg-background-light rounded shadow"
            variants={itemVariants}
          >
            <h3 className="fs-4 fw-semibold mb-3 text-primary">业余爱好与专业成长</h3>
            <p className="text-white-custom mb-0">
              我相信，丰富的业余爱好不仅能够丰富生活，还能为专业发展提供灾感和动力。
              通过体育锻炼培养毅力和团队协作能力，阅读经济学书籍拓宽视野，
              电子游戏提升反应速度和解决问题的能力，而对数码产品的关注则让我能够紧跟技术发展趋势。
              这些爱好共同塑造了我全面发展的个性，也为我在区块链和计算机科学领域的学习和创新提供了独特视角。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hobbies;

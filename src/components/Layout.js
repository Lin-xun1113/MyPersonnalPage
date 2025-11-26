import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  
  // 页面转场动画 - 模拟老电视开关机
  const pageVariants = {
    initial: {
      opacity: 0,
      scaleY: 0.005,
      scaleX: 1,
    },
    enter: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        scaleY: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3, delay: 0.2 }
      }
    },
    exit: {
      opacity: 0,
      scaleY: 0.005,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="app-wrapper">
      {/* 噪点纹理遮罩 */}
      <div className="noise-overlay" />
      
      {/* 扫描线效果 */}
      <div className="scanlines" />
      
      {/* 导航栏 */}
      <Navbar />
      
      {/* 页面内容 + 转场 */}
      <AnimatePresence mode="wait">
        <motion.main
          key={router.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="page-content"
          style={{ transformOrigin: 'center center' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      {/* 页脚 */}
      <Footer />
      
      <style jsx global>{`
        .app-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .page-content {
          flex: 1;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Layout;

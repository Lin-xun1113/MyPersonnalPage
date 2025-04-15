import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWeb3 } from '../utils/Web3Provider';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { isConnected, isAdmin } = useWeb3();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 检测是否为管理员并显示欢迎提示
  useEffect(() => {
    if (isConnected && isAdmin) {
      setShowWelcome(true);
      
      // 5秒后自动隐藏欢迎提示
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected, isAdmin]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navLinks = [
    { title: '首页', href: '/' },
    { title: '关于我', href: '/#about' },
    { title: '技能', href: '/#skills' },
    { title: '项目', href: '/#projects' },
    { title: '爱好', href: '/#hobbies' },
    { title: '日志', href: '/blogs' },
    { title: '联系', href: '/#contact' }
  ];
  
  return (
    <nav className={`navbar navbar-expand-lg fixed-top shadow-sm ${isScrolled ? 'bg-white navbar-light py-2' : 'bg-transparent navbar-dark py-3'}`}
         style={{transition: 'all 0.3s ease'}}>
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="#">
          <span className="text-primary-custom">L</span>inxun
        </a>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? 
            <FiX className="fs-4" /> : 
            <FiMenu className="fs-4" />
          }
        </button>
        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto text-center">
            {navLinks.map((link, index) => (
              <motion.li 
                key={index} 
                className="nav-item"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link 
                  className="nav-link px-3 fw-medium" 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </motion.li>
            ))}
            <motion.li 
              className="nav-item d-none d-lg-inline-block ms-lg-3 mt-lg-0 mt-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a 
                className="btn btn-sm btn-primary-custom rounded-pill px-4 py-2 shadow-sm" 
                href="#contact"
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                联系我
              </a>
            </motion.li>
            <motion.li 
              className="nav-item ms-lg-3 mt-lg-0 mt-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="d-flex flex-column align-items-center">
                <div className="connect-btn-wrapper">
                  <ConnectButton />
                </div>
                {showWelcome && isAdmin && (
                  <div className="welcome-tooltip mt-2 bg-primary-custom text-white px-3 py-1 rounded-pill shadow-sm text-center">
                    <small>欢迎回来，管理员！</small>
                  </div>
                )}
              </div>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

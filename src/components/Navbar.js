import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navLinks = [
    { title: '首页', href: '#' },
    { title: '关于我', href: '#about' },
    { title: '技能', href: '#skills' },
    { title: '项目', href: '#projects' },
    { title: '爱好', href: '#hobbies' },
    { title: '联系', href: '#contact' }
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
                <a 
                  className="nav-link px-3 fw-medium" 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </a>
              </motion.li>
            ))}
            <motion.li 
              className="nav-item d-none d-lg-inline-block ms-lg-3 mt-lg-0 mt-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a 
                className="btn btn-sm btn-primary-custom rounded-pill px-4 py-2" 
                href="#contact"
              >
                联系我
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

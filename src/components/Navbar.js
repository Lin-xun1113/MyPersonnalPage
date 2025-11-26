import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWeb3 } from '../utils/Web3Provider';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isConnected, isAdmin } = useWeb3();
  
  // 实时时钟
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // 滚动进度
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { title: 'HOME', href: '/', code: '00' },
    { title: 'ABOUT', href: '/about', code: '01' },
    { title: 'PROJECTS', href: '/projects', code: '02' },
    { title: 'SKILLS', href: '/skills', code: '03' },
    { title: 'BLOG', href: '/blogs', code: '04' },
    { title: 'CONTACT', href: '/contact', code: '05' },
  ];
  
  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav 
        className="control-deck"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 左侧 - 状态指示 */}
        <div className="deck-section deck-left">
          <div className="status-indicator">
            <span className="status-dot" />
            <span className="status-text">SYS.OK</span>
          </div>
          <Link href="/" className="logo-link">
            <span className="logo-text">LX</span>
            {/* <span className="logo-version">v2.0</span> */}
          </Link>
        </div>
        
        {/* 中间 - 导航 */}
        <div className="deck-section deck-center">
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`nav-item ${isActive(link.href) ? 'active' : ''}`}
              >
                <span className="nav-code">{link.code}</span>
                <span className="nav-title">{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* 右侧 - 时间和钱包 */}
        <div className="deck-section deck-right">
          <div className="time-display">
            <span className="time-label">LOCAL</span>
            <span className="time-value">{currentTime}</span>
          </div>
          <div className="wallet-wrapper">
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => {
                const connected = mounted && account && chain;
                return (
                  <button 
                    className="wallet-btn"
                    onClick={openConnectModal}
                  >
                    {connected ? (
                      <>
                        <span className="wallet-dot connected" />
                        <span>{account.displayName}</span>
                      </>
                    ) : (
                      <>
                        <span className="wallet-dot" />
                        <span>CONNECT</span>
                      </>
                    )}
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
        
        {/* 滚动进度条 */}
        <div className="scroll-progress">
          <motion.div 
            className="scroll-bar"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        {/* 移动端菜单按钮 */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span /><span /><span />
          </div>
        </button>
      </motion.nav>
      
      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className={`mobile-nav-item ${isActive(link.href) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-code">[{link.code}]</span>
                  <span className="nav-title">{link.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .control-deck {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 8px 16px;
          background: rgba(28, 27, 25, 0.95);
          border: 1px solid var(--warm-border);
          backdrop-filter: blur(10px);
          z-index: 1000;
          font-family: var(--font-mono);
        }
        
        .control-deck::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--warm-primary), var(--warm-secondary));
        }
        
        .deck-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .deck-left {
          padding-right: 16px;
          border-right: 1px solid var(--warm-border);
        }
        
        .deck-right {
          padding-left: 16px;
          border-left: 1px solid var(--warm-border);
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: var(--warm-success);
          border-radius: 50%;
          animation: pulse-glow 2s infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 4px var(--warm-success); }
          50% { box-shadow: 0 0 12px var(--warm-success); }
        }
        
        .status-text {
          font-size: 0.7rem;
          color: var(--warm-success);
          letter-spacing: 0.05em;
        }
        
        .logo-link {
          display: flex;
          align-items: baseline;
          gap: 4px;
          text-decoration: none;
        }
        
        .logo-text {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--warm-primary);
        }
        
        .logo-version {
          font-size: 0.6rem;
          color: var(--warm-muted);
        }
        
        .nav-links {
          display: flex;
          gap: 4px;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          text-decoration: none;
          color: var(--warm-muted);
          font-size: 0.75rem;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        
        .nav-item:hover {
          color: var(--warm-text);
          background: rgba(255, 126, 51, 0.1);
        }
        
        .nav-item.active {
          color: var(--warm-primary);
          border-color: var(--warm-primary);
          background: rgba(255, 126, 51, 0.1);
        }
        
        .nav-code {
          opacity: 0.5;
          font-size: 0.65rem;
        }
        
        .time-display {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .time-label {
          font-size: 0.55rem;
          color: var(--warm-muted);
          letter-spacing: 0.1em;
        }
        
        .time-value {
          font-size: 0.8rem;
          color: var(--warm-secondary);
          font-variant-numeric: tabular-nums;
        }
        
        .wallet-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: transparent;
          border: 1px solid var(--warm-border);
          color: var(--warm-text);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .wallet-btn:hover {
          border-color: var(--warm-primary);
          background: rgba(255, 126, 51, 0.1);
        }
        
        .wallet-dot {
          width: 6px;
          height: 6px;
          background: var(--warm-muted);
          border-radius: 50%;
        }
        
        .wallet-dot.connected {
          background: var(--warm-success);
        }
        
        .scroll-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255,255,255,0.05);
        }
        
        .scroll-bar {
          height: 100%;
          background: var(--warm-primary);
          transition: width 0.1s;
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--warm-primary);
          transition: all 0.3s;
        }
        
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }
        
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 20px;
          right: 20px;
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          padding: 20px;
          z-index: 999;
        }
        
        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid var(--warm-border);
          text-decoration: none;
          color: var(--warm-text);
          font-size: 1rem;
        }
        
        .mobile-nav-item.active {
          color: var(--warm-primary);
        }
        
        .mobile-nav-item .nav-code {
          color: var(--warm-muted);
        }
        
        @media (max-width: 1024px) {
          .control-deck {
            left: 20px;
            right: 20px;
            transform: none;
            justify-content: space-between;
          }
          
          .deck-center {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }
        
        @media (max-width: 640px) {
          .deck-left {
            border: none;
            padding-right: 0;
          }
          
          .deck-right {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

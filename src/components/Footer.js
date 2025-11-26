import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { title: 'HOME', href: '/' },
    { title: 'ABOUT', href: '/about' },
    { title: 'PROJECTS', href: '/projects' },
    { title: 'SKILLS', href: '/skills' },
    { title: 'BLOG', href: '/blogs' },
    { title: 'CONTACT', href: '/contact' },
  ];
  
  const socials = [
    { icon: <FiGithub size={16} />, href: 'https://github.com/Lin-xun1113' },
    { icon: <FiLinkedin size={16} />, href: 'https://linkedin.com/in/linxun1113' },
    { icon: <FiTwitter size={16} />, href: 'https://twitter.com/linxun1113' },
    { icon: <FiMail size={16} />, href: 'mailto:linxun1113@gmail.com' },
  ];
  
  return (
    <>
      <footer className="warm-footer">
        <div className="footer-top" />
        
        <div className="footer-content">
          <div className="footer-left">
            <Link href="/" className="footer-logo">
              <span className="logo-text">LX</span>
              <span className="logo-tag">BLOCKCHAIN DEV</span>
            </Link>
            <p className="footer-desc">
              区块链开发者 / 智能合约审计学习者
            </p>
          </div>
          
          <div className="footer-center">
            <div className="footer-links">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="footer-right">
            <div className="social-links">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <span>© {currentYear} LINXUN</span>
          <span className="separator">|</span>
          <span>BUILT WITH SOLIDITY & NEXT.JS</span>
        </div>
      </footer>
      
      <style jsx>{`
        .warm-footer {
          background: var(--warm-surface);
          border-top: 1px solid var(--warm-border);
          padding: 0;
          position: relative;
        }
        
        .footer-top {
          height: 2px;
          background: linear-gradient(90deg, var(--warm-primary), var(--warm-secondary), var(--warm-primary));
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 5vw;
          gap: 40px;
        }
        
        .footer-logo {
          display: flex;
          align-items: baseline;
          gap: 8px;
          text-decoration: none;
          margin-bottom: 8px;
        }
        
        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--warm-primary);
        }
        
        .logo-tag {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-muted);
        }
        
        .footer-desc {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-muted);
          margin: 0;
        }
        
        .footer-links {
          display: flex;
          gap: 24px;
        }
        
        .footer-link {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .footer-link:hover {
          color: var(--warm-primary);
        }
        
        .social-links {
          display: flex;
          gap: 12px;
        }
        
        .social-link {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--warm-border);
          color: var(--warm-muted);
          transition: all 0.2s;
        }
        
        .social-link:hover {
          border-color: var(--warm-primary);
          color: var(--warm-primary);
        }
        
        .footer-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 16px 5vw;
          border-top: 1px solid var(--warm-border);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--warm-muted);
        }
        
        .separator {
          opacity: 0.3;
        }
        
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: 24px;
          }
          
          .footer-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .footer-bottom {
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;

import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiGithub, FiMail, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [terminalLines, setTerminalLines] = useState([
    { type: 'system', text: 'TRANSMISSION TERMINAL v2.0' },
    { type: 'system', text: 'Establishing secure connection...' },
    { type: 'success', text: 'Connection established.' },
    { type: 'info', text: 'Ready to receive transmission.' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 添加终端输出
    setTerminalLines(prev => [
      ...prev,
      { type: 'command', text: `> SEND --to="linxun1113@gmail.com" --from="${formData.email}"` },
      { type: 'info', text: 'Encrypting message...' },
    ]);
    
    // 模拟发送
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTerminalLines(prev => [
      ...prev,
      { type: 'success', text: 'Message transmitted successfully.' },
      { type: 'info', text: `Sender: ${formData.name}` },
    ]);
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const contacts = [
    { 
      icon: <FiMail size={20} />, 
      label: 'EMAIL', 
      value: 'linxun1113@gmail.com',
      href: 'mailto:linxun1113@gmail.com'
    },
    { 
      icon: <FiGithub size={20} />, 
      label: 'GITHUB', 
      value: 'Lin-xun1113',
      href: 'https://github.com/Lin-xun1113'
    },
    { 
      icon: <FiLinkedin size={20} />, 
      label: 'LINKEDIN', 
      value: 'linxun1113',
      href: 'https://linkedin.com/in/linxun1113'
    },
    { 
      icon: <FiTwitter size={20} />, 
      label: 'TWITTER', 
      value: '@linxun1113',
      href: 'https://twitter.com/linxun1113'
    },
  ];

  return (
    <>
      <Head>
        <title>CONTACT | LINXUN</title>
        <meta name="description" content="联系Linxun - 区块链开发者" />
      </Head>
      
      <Navbar />
      
      <div className="contact-page">
        <main className="contact-main">
          {/* 页面标题 */}
          <motion.header 
            className="page-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="header-code">[05]</span>
            <h1 className="header-title">CONTACT</h1>
            <p className="header-subtitle">通讯终端 / TRANSMISSION TERMINAL</p>
          </motion.header>
          
          <div className="contact-grid">
            {/* 左侧 - 终端模拟器 */}
            <motion.section 
              className="terminal-section"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="terminal">
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="btn-close" />
                    <span className="btn-minimize" />
                    <span className="btn-maximize" />
                  </div>
                  <span className="terminal-title">transmission.exe</span>
                </div>
                
                <div className="terminal-body">
                  {terminalLines.map((line, i) => (
                    <div key={i} className={`terminal-line ${line.type}`}>
                      {line.type === 'command' ? line.text : `[${line.type.toUpperCase()}] ${line.text}`}
                    </div>
                  ))}
                  <div className="terminal-cursor">_</div>
                </div>
              </div>
              
              {/* 联系方式卡片 */}
              <div className="contact-cards">
                {contacts.map((contact, i) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <span className="card-icon">{contact.icon}</span>
                    <div className="card-info">
                      <span className="card-label">{contact.label}</span>
                      <span className="card-value">{contact.value}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
            
            {/* 右侧 - 消息表单 */}
            <motion.section 
              className="form-section"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="form-container">
                <div className="form-header">
                  <h3>COMPOSE MESSAGE</h3>
                  <span className="form-status">SECURE</span>
                </div>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label>SENDER_NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name..."
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>SENDER_EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email..."
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>MESSAGE_BODY</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>TRANSMITTING...</>
                    ) : (
                      <>
                        <FiSend size={16} />
                        TRANSMIT MESSAGE
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* 提示信息 */}
              <div className="form-note">
                <p>
                  💡 您也可以直接发送邮件至 <span className="highlight">linxun1113@gmail.com</span>
                </p>
                <p>
                  目前正在寻找区块链项目合作机会，特别是智能合约开发和审计领域。
                </p>
              </div>
            </motion.section>
          </div>
          
          {/* 返回导航 */}
          <motion.div 
            className="back-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/" className="back-link">
              <span>←</span> BACK TO HOME
            </Link>
          </motion.div>
        </main>
      </div>
      
      <Footer />
      
      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          padding-top: 100px;
        }
        
        .contact-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5vw 80px;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .header-code {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--warm-primary);
          display: block;
          margin-bottom: 8px;
        }
        
        .header-title {
          font-family: var(--font-impact);
          font-size: clamp(3rem, 8vw, 6rem);
          color: var(--warm-text);
          margin: 0;
          line-height: 1;
        }
        
        .header-subtitle {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-muted);
          margin-top: 12px;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          overflow: hidden;
        }
        
        .terminal-section,
        .form-section {
          min-width: 0;
          overflow: hidden;
        }
        
        /* 终端 */
        .terminal {
          background: #0a0a0a;
          border: 1px solid var(--warm-border);
          margin-bottom: 24px;
        }
        
        .terminal-header {
          display: flex;
          align-items: center;
          padding: 10px 16px;
          background: var(--warm-card);
          border-bottom: 1px solid var(--warm-border);
        }
        
        .terminal-buttons {
          display: flex;
          gap: 6px;
        }
        
        .terminal-buttons span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        
        .btn-close { background: #ff5f56; }
        .btn-minimize { background: #ffbd2e; }
        .btn-maximize { background: #27ca40; }
        
        .terminal-title {
          flex: 1;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-muted);
        }
        
        .terminal-body {
          padding: 16px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          min-height: 200px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .terminal-line {
          margin-bottom: 4px;
          word-break: break-all;
        }
        
        .terminal-line.system { color: var(--warm-muted); }
        .terminal-line.success { color: var(--warm-success); }
        .terminal-line.info { color: var(--warm-secondary); }
        .terminal-line.command { color: var(--warm-primary); }
        
        .terminal-cursor {
          color: var(--warm-primary);
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* 联系卡片 */
        .contact-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        .contact-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          text-decoration: none;
          transition: all 0.2s;
          min-width: 0;
          overflow: hidden;
        }
        
        .contact-card:hover {
          border-color: var(--warm-primary);
          transform: translateY(-2px);
        }
        
        .card-icon {
          color: var(--warm-primary);
          flex-shrink: 0;
        }
        
        .card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
          overflow: hidden;
        }
        
        .card-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-muted);
        }
        
        .card-value {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--warm-text);
          word-break: break-all;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* 表单 */
        .form-container {
          background: var(--warm-surface);
          border: 1px solid var(--warm-border);
          overflow: hidden;
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: var(--warm-card);
          border-bottom: 1px solid var(--warm-border);
        }
        
        .form-header h3 {
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--warm-text);
          margin: 0;
        }
        
        .form-status {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--warm-success);
          padding: 2px 8px;
          border: 1px solid var(--warm-success);
        }
        
        .contact-form {
          padding: 24px 20px;
          overflow: hidden;
        }
        
        .form-group {
          margin-bottom: 20px;
          overflow: hidden;
        }
        
        .form-group label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--warm-muted);
          margin-bottom: 8px;
          letter-spacing: 0.05em;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          max-width: 100%;
          padding: 12px 16px;
          background: var(--warm-card);
          border: 1px solid var(--warm-border);
          color: var(--warm-text);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--warm-primary);
        }
        
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--warm-muted);
        }
        
        .form-group textarea {
          resize: none;
        }
        
        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--warm-primary);
          border: none;
          color: #000;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 126, 51, 0.3);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .form-note {
          margin-top: 24px;
          padding: 20px;
          background: rgba(255, 126, 51, 0.05);
          border: 1px dashed var(--warm-border);
        }
        
        .form-note p {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-muted);
          margin: 0 0 8px;
          line-height: 1.6;
        }
        
        .form-note p:last-child {
          margin-bottom: 0;
        }
        
        .highlight {
          color: var(--warm-primary);
        }
        
        /* 返回导航 */
        .back-nav {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid var(--warm-border);
        }
        
        .back-link {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--warm-muted);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        
        .back-link:hover {
          color: var(--warm-primary);
        }
        
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          
          .contact-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

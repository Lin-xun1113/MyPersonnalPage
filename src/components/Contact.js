import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiSend, FiMessageSquare } from 'react-icons/fi';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('感谢您的留言，我们会尽快回复您！');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      method: 'Email',
      value: 'linxun1113@gmail.com',
      link: 'mailto:linxun1113@gmail.com',
      color: 'var(--neon-cyan)'
    },
    {
      icon: <FiGithub size={24} />,
      method: 'GitHub',
      value: 'github.com/Lin-xun1113',
      link: 'https://github.com/Lin-xun1113',
      color: 'var(--neon-purple)'
    },
    {
      icon: <FiLinkedin size={24} />,
      method: 'LinkedIn',
      value: 'linkedin.com/in/linxun1113',
      link: 'https://linkedin.com/in/linxun1113',
      color: 'var(--neon-blue)'
    },
    {
      icon: <FiTwitter size={24} />,
      method: 'Twitter',
      value: '@linxun1113',
      link: 'https://twitter.com/linxun1113',
      color: 'var(--neon-pink)'
    },
  ];
  
  return (
    <section id="contact" className="retro-section" ref={ref}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-150px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
        opacity: 0.08,
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
            联系方式
          </motion.h2>
          
          <div className="row g-5">
            {/* 左侧 - 联系信息 */}
            <div className="col-lg-5">
              <motion.div variants={itemVariants}>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--neon-cyan)',
                  padding: '2rem',
                  position: 'relative'
                }}>
                  {/* 标签 */}
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '20px',
                    background: 'var(--bg-dark)',
                    padding: '0 15px',
                    fontFamily: "'Share Tech Mono', monospace",
                    color: 'var(--neon-cyan)',
                    fontSize: '0.85rem'
                  }}>
                    {'>'} CONTACT_INFO
                  </div>
                  
                  <div className="mb-4">
                    <h3 style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '1.3rem',
                      color: 'var(--neon-pink)',
                      marginBottom: '1rem'
                    }}>
                      与我取得联系
                    </h3>
                    <p style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      color: 'var(--text-secondary)',
                      lineHeight: '1.8'
                    }}>
                      欢迎就区块链项目合作、技术交流或任何有趣的想法与我联系。
                      我期待与志同道合的开发者和创业者建立联系！
                    </p>
                  </div>
                  
                  {/* 联系方式列表 */}
                  <div className="d-flex flex-column gap-3">
                    {contactInfo.map((contact, index) => (
                      <a
                        key={index}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center gap-3 p-3"
                        style={{
                          background: 'rgba(0,0,0,0.3)',
                          border: `1px solid ${contact.color}33`,
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = contact.color;
                          e.currentTarget.style.boxShadow = `0 0 15px ${contact.color}33`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `${contact.color}33`;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ color: contact.color }}>
                          {contact.icon}
                        </div>
                        <div>
                          <div style={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: '0.9rem',
                            color: contact.color
                          }}>
                            {contact.method}
                          </div>
                          <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)'
                          }}>
                            {contact.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* 合作意向 */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-4 p-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 45, 149, 0.1) 0%, rgba(184, 41, 221, 0.1) 100%)',
                    border: '1px solid var(--neon-pink)'
                  }}
                >
                  <h4 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '1rem',
                    color: 'var(--neon-pink)',
                    marginBottom: '0.75rem'
                  }}>
                    🤝 合作机会
                  </h4>
                  <p style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    margin: 0,
                    lineHeight: '1.7'
                  }}>
                    目前正在寻找区块链项目实习机会与合作伙伴，特别是在智能合约开发和审计领域。
                    如果您有兴趣，欢迎与我联系！
                  </p>
                </motion.div>
              </motion.div>
            </div>
            
            {/* 右侧 - 联系表单 */}
            <div className="col-lg-7">
              <motion.div variants={itemVariants}>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--neon-purple)',
                  padding: '2rem',
                  position: 'relative'
                }}>
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
                    {'>'} SEND_MESSAGE
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '0.85rem',
                          color: 'var(--neon-cyan)',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          姓名
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="您的姓名"
                          className="retro-input w-100"
                        />
                      </div>
                      <div className="col-md-6">
                        <label style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '0.85rem',
                          color: 'var(--neon-cyan)',
                          marginBottom: '0.5rem',
                          display: 'block'
                        }}>
                          邮箱
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="您的邮箱地址"
                          className="retro-input w-100"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.85rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.5rem',
                        display: 'block'
                      }}>
                        主题
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="消息主题"
                        className="retro-input w-100"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '0.85rem',
                        color: 'var(--neon-cyan)',
                        marginBottom: '0.5rem',
                        display: 'block'
                      }}>
                        消息内容
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="请输入您的消息..."
                        className="retro-input w-100"
                        style={{ resize: 'none' }}
                      />
                    </div>
                    
                    <button type="submit" className="cyber-btn d-flex align-items-center gap-2">
                      <FiSend size={18} />
                      发送消息
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

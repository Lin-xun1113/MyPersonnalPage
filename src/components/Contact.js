import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // 这里通常会添加一个API调用来处理表单提交
    alert('感谢您的留言，我们会尽快回复您！');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  const contactInfo = [
    {
      icon: <FiMail className="text-white fs-3" />,
      method: 'Email',
      value: 'linxun1113@gmail.com',
      link: 'mailto:linxun1113@gmail.com',
    },
    {
      icon: <FiGithub className="text-white fs-3" />,
      method: 'GitHub',
      value: 'github.com/Lin-xun1113',
      link: 'https://github.com/Lin-xun1113',
    },
    {
      icon: <FiLinkedin className="text-white fs-3" />,
      method: 'LinkedIn',
      value: 'linkedin.com/in/linxun1113',
      link: 'https://linkedin.com/in/linxun1113',
    },
    {
      icon: <FiTwitter className="text-white fs-3" />,
      method: 'Twitter',
      value: 'twitter.com/example',
      link: 'https://twitter.com/example',
    },
  ];
  
  return (
    <section id="contact" className="section-padding bg-primary-custom text-white">
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
            联系方式
          </motion.h2>
          
          <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                className="col"
                variants={itemVariants}
              >
                <a 
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center p-4 rounded bg-dark text-decoration-none text-white h-100"
                >
                  <div className="contact-icon me-3">
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="fs-5 fw-semibold mb-1">{contact.method}</h3>
                    <p className="text-white-50 mb-0">{contact.value}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="bg-dark rounded shadow p-4 p-md-5"
            variants={itemVariants}
          >
            <h3 className="fs-4 fw-semibold mb-4 text-white">发送消息</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label text-white-50">姓名</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="您的姓名"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label text-white-50">邮箱</label>
                  <input 
                    type="email" 
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="您的邮箱地址"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="form-label text-white-50">主题</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="消息主题"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="form-label text-white-50">消息</label>
                <textarea 
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="请输入您的消息..."
                  rows="5"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="btn btn-accent-custom"
                >
                  发送消息
                </button>
              </div>
            </form>
          </motion.div>
          
          <motion.div 
            className="mt-5 p-4 rounded bg-light text-dark shadow"
            variants={itemVariants}
          >
            <h4 className="fs-5 fw-semibold mb-3 text-primary-custom">合作机会</h4>
            <p className="mb-0">
              我目前正在寻找区块链项目实习机会与合作伙伴，特别是在智能合约开发和审计领域。
              如果您有兴趣，欢迎与我联系！
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

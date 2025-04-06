import { FiHeart } from 'react-icons/fi';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-custom text-white py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6 mb-4 mb-md-0">
            <h3 className="fs-4 fw-bold mb-2">Linxun</h3>
            <p className="text-white-50">
              区块链技术爱好者 | 智能合约开发者 | 计算机科学学生
            </p>
          </div>
          
          <div className="col-md-6 d-flex justify-content-md-end align-items-center">
            <div className="d-flex gap-4">
              <a href="#" className="text-white-50 text-decoration-none" aria-label="GitHub">
                <FiGithub size={22} />
              </a>
              <a href="#" className="text-white-50 text-decoration-none" aria-label="LinkedIn">
                <FiLinkedin size={22} />
              </a>
              <a href="#" className="text-white-50 text-decoration-none" aria-label="Twitter">
                <FiTwitter size={22} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-top border-secondary pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="small text-white-50 mb-2 mb-md-0">
            &copy; {currentYear} Linxun. 保留所有权利。
          </p>
          
          <p className="small text-white-50 d-flex align-items-center">
            用 <FiHeart className="mx-1 text-danger" /> 制作
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

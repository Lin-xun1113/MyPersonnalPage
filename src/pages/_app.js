import '../styles/globals.css';
import '../styles/rainbowkit-custom.css';
import '../styles/blog.css';
import { useEffect } from 'react';
import { Web3Provider } from '../utils/Web3Provider';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 导入Bootstrap JavaScript
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}

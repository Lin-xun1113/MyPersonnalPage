import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

// 根据当前页面动态获取正确的WalletConnect元数据URL
const getMetadataUrl = () => {
  if (typeof window === 'undefined') return 'https://linxun.windsurf.build';
  
  // 修复不同页面的元数据URL问题
  return window.location.origin;
};

// 管理员钱包地址列表 - 之后会由用户提供
const ADMIN_ADDRESSES = [
  // 这是一个测试地址，请替换为您自己的钱包地址
  '0xA795CEDd3962232e5A58EcB59BBb85ACa7f24781'
];

// RainbowKit 2.x 版本的新配置方式
const config = getDefaultConfig({
  appName: 'Lin Xun个人网站',
  projectId: '5bea21046e83e66bf45240815786236b', // 需要替换为真实的WalletConnect项目ID
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
  // 添加正确的元数据配置
  metadata: {
    url: getMetadataUrl(),
    description: 'Lin Xun的个人网站与博客',
    icons: ['https://linxun.windsurf.build/favicon.ico']
  }
});

// 检查是否为管理员
const isAdmin = (address) => {
  if (!address) return false;
  return ADMIN_ADDRESSES.some(
    (admin) => admin.toLowerCase() === address.toLowerCase()
  );
};

// 消息签名函数
const signMessage = async (message) => {
  if (typeof window === 'undefined' || !window.ethereum) {
    console.error('浏览器不支持以太坊或者未安装钱包');
    throw new Error('浏览器不支持以太坊或者未安装钱包');
  }

  try {
    // 获取当前连接的账户
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const address = accounts[0];
    
    if (!address) {
      throw new Error('没有连接的钱包账户');
    }

    console.log('准备签名，使用地址:', address);
    console.log('签名消息:', message);
    
    // 使用 personal_sign 方法进行签名
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });
    
    console.log('签名成功:', signature.substring(0, 20) + '...');
    
    return {
      signature,
      message,
      address
    };
  } catch (error) {
    console.error('签名过程中出错:', error);
    throw error;
  }
};

export { config, isAdmin, ADMIN_ADDRESSES, signMessage };

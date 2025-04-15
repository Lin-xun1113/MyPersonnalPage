import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

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
    url: typeof window !== 'undefined' ? window.location.origin : 'https://linxun.windsurf.build',
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

export { config, isAdmin, ADMIN_ADDRESSES };

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

// 根据当前页面动态获取正确的WalletConnect元数据URL
const getMetadataUrl = () => {
  // 在服务器端渲染时使用默认URL
  if (typeof window === 'undefined') return 'https://linxun.windsurf.build';
  
  // 获取域名部分，不包含路径
  const origin = window.location.origin;
  console.log('设置 WalletConnect 元数据 URL:', origin);
  return origin;
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

// 消息签名函数 - RainbowKit兼容版
const signMessage = async (message) => {
  console.log('===== 开始消息签名过程 =====');
  console.log('消息内容:', message);
  
  // 检查浏览器环境
  if (typeof window === 'undefined') {
    console.error('无法在服务器端执行签名');
    throw new Error('无法在服务器端执行签名');
  }

  // 寻找各种可能的以太坊提供商
  console.log('检查可用的钱包提供商...');
  const provider = window.ethereum || 
                 window.web3?.currentProvider || 
                 window?.rainbowKit?.getProvider?.() || 
                 window?.wagmi?.getProvider?.();
  
  if (!provider) {
    console.error('未检测到以太坊提供商');
    alert('请确保钱包已安装并连接！');
    throw new Error('未检测到钱包提供商');
  }
  
  console.log('检测到钱包提供商:', provider.constructor?.name || '未知提供商');

  try {
    // 获取钱包账户
    console.log('请求钱包账户...');
    
    // 使用两种可能的方法获取账户
    let accounts;
    try {
      // 先尝试eth_accounts
      accounts = await provider.request?.({ method: 'eth_accounts' });
    } catch (e) {
      console.log('eth_accounts请求失败，尝试方法二...');
      // 如果失败，尝试替代方法
      accounts = provider.selectedAddress ? [provider.selectedAddress] : [];
    }
    
    console.log('当前账户:', accounts);
    
    // 如果没有账户，请求钱包连接
    if (!accounts || accounts.length === 0) {
      console.log('未找到账户，请求连接钱包...');
      try {
        accounts = await provider.request?.({ method: 'eth_requestAccounts' });
        console.log('钱包连接成功:', accounts);
        // 如果上面的方法失败，尝试替代方法
        if (!accounts || accounts.length === 0) {
          // 尝试使用兼容方法连接
          if (provider.enable) {
            const enabledAccounts = await provider.enable();
            accounts = enabledAccounts;
            console.log('使用enable()方法连接成功:', accounts);
          }
        }
      } catch (connectError) {
        console.error('钱包连接失败:', connectError);
        alert('钱包连接失败，请检查您的钱包并刷新页面再试');
        throw new Error(`钱包连接失败: ${connectError.message}`);
      }
    }
    
    // 确保我们获得了账户
    if (!accounts || accounts.length === 0) {
      throw new Error('连接钱包后仍然没有获取到账户');
    }
    
    const address = accounts[0];
    console.log('使用地址签名:', address);
    
    // 直接强制打开MetaMask签名弹窗
    console.log('生成签名弹窗...');
    alert('请在MetaMask弹窗中签名以认证您的操作');
    
    // 尝试签名，使用多种可能的方法
    let signature;
    try {
      console.log('尝试方法1: personal_sign');
      signature = await provider.request({
        method: 'personal_sign',
        params: [message, address],
      });
    } catch (signError1) {
      console.error('签名方法1失败:', signError1);
      
      try {
        console.log('尝试方法2: eth_sign');
        signature = await provider.request({
          method: 'eth_sign',
          params: [address, message],
        });
      } catch (signError2) {
        console.error('签名方法2失败:', signError2);
        
        // 最后一种尝试
        if (provider.sendAsync || provider.send) {
          console.log('尝试方法3: sendAsync/send');
          const sendMethod = provider.sendAsync || provider.send;
          
          signature = await new Promise((resolve, reject) => {
            sendMethod.call(provider, {
              method: 'personal_sign',
              params: [message, address],
              from: address
            }, (error, result) => {
              if (error) reject(error);
              else resolve(result.result);
            });
          });
        } else {
          throw new Error('所有签名方法都失败，请检查钱包设置');
        }
      }
    }
    
    if (!signature) {
      throw new Error('签名结果为空');
    }
    
    console.log('签名成功!');
    console.log('签名值:', signature.substring(0, 10) + '...' + signature.substring(signature.length - 10));
    console.log('签名长度:', signature.length);
    
    const result = {
      signature,
      message,
      address
    };
    
    console.log('===== 签名过程成功完成 =====');
    return result;
  } catch (error) {
    console.error('===== 签名过程出错 =====');
    console.error('错误类型:', error.constructor.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
    
    // 根据错误类型提供更友好的错误信息
    let userFriendlyMessage = '签名请求失败';
    
    if (error.code === 4001) {
      userFriendlyMessage = '您拒绝了签名请求';
    } else if (error.message.includes('already pending')) {
      userFriendlyMessage = '有另一个签名请求正在进行，请先完成它';
    } else if (error.message.includes('user rejected')) {
      userFriendlyMessage = '您取消了签名操作';
    }
    
    alert(`签名失败: ${userFriendlyMessage}`);
    throw new Error(userFriendlyMessage);
  }
};

export { config, isAdmin, ADMIN_ADDRESSES, signMessage };

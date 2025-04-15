import React, { createContext, useContext, useState, useEffect } from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { config, isAdmin } from './web3Config';

// 创建上下文对象
// 这个上下文将包含钱包连接状态和管理员权限信息
const Web3Context = createContext(null);

// 创建查询客户端实例
const queryClient = new QueryClient();

// Web3状态的提供者组件
export const Web3Provider = ({ children }) => {
  const [adminAddress, setAdminAddress] = useState('');
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Web3ContextProvider adminAddress={adminAddress} setAdminAddress={setAdminAddress}>
            {children}
          </Web3ContextProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// u5b9eu9645u7684u4e0au4e0bu6587u63d0u4f9bu8005
const Web3ContextProvider = ({ children, adminAddress, setAdminAddress }) => {
  const { address, isConnected } = useAccount();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  
  // u5f53u94b1u5305u5730u5740u53d8u5316u65f6u68c0u67e5u662fu5426u4e3au7ba1u7406u5458
  useEffect(() => {
    if (address) {
      setIsUserAdmin(isAdmin(address));
    } else {
      setIsUserAdmin(false);
    }
  }, [address]);
  
  // 签名消息的帮助函数
  const signMessage = async (message) => {
    if (!window.ethereum) {
      throw new Error('浏览器不支持以太坊');
    }
    
    try {
      if (typeof window.ethereum.request !== 'function') {
        throw new Error('您的钱包不支持签名');
      }
      
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });
      
      return {
        message,
        signature,
        address
      };
    } catch (error) {
      console.error('签名失败:', error);
      throw error;
    }
  };
  
  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        isAdmin: isUserAdmin,
        signMessage,
        adminAddress,
        setAdminAddress
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// u81eau5b9au4e49Hooku4ee5u4fbfu4e8eu4f7fu7528u4e0au4e0bu6587
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3u5fc5u987bu5728Web3Provideru5185u90e8u4f7fu7528');
  }
  return context;
};

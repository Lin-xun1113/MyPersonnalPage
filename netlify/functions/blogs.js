// 采用CommonJS格式导入依赖项
try {
  var { Octokit } = require('@octokit/rest');
} catch (error) {
  console.error('无法加载@octokit/rest:', error);
  // 尝试加载octokit
  try {
    var { Octokit } = require('octokit');
  } catch (error) {
    console.error('无法加载octokit:', error);
    // 创建一个空的Octokit实现，避免函数崩溃
    var Octokit = function() { this.rest = { repos: { getContent: async () => { throw new Error('Octokit模块无法加载'); } } }; };
  }
}

// 添加CORS头
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

// u521du59cbu5316GitHub API
let octokit;
try {
  octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });
} catch (error) {
  console.error('初始化Octokit失败:', error);
  // 创建一个空对象作为备用
  octokit = {
    rest: {
      repos: {
        getContent: async () => { throw new Error('Octokit初始化失败'); }
      }
    }
  };
}

const REPO_OWNER = 'Lin-xun1113'; // u66ffu6362u4e3au60a8u7684GitHubu7528u6237u540d
const REPO_NAME = 'MyPersonnalPage'; // u60a8u7684u4ed3u5e93u540d
const BLOGS_PATH = 'data/blogs.json'; // u5b58u50a8u535au5ba2u6570u636eu7684u8defu5f84

// u83b7u53d6u535au5ba2u5217u8868
exports.handler = async (event, context) => {
  console.log('blogs函数被调用');

  // 处理预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // u786eu4fddu53eau5904u7406GETu8bf7u6c42
  if (event.httpMethod !== 'GET') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: '方法不允许' }) 
    };
  }
  
  // 检查GitHub Token是否已设置
  if (!process.env.GITHUB_TOKEN) {
    console.error('未设置GITHUB_TOKEN环境变量');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: '服务器配置错误: 缺少GITHUB_TOKEN' })
    };
  }

  try {
    console.log(`正在从GitHub获取博客数据: ${REPO_OWNER}/${REPO_NAME}/${BLOGS_PATH}`);
    
    // u5c1du8bd5u4eceu4ed3u5e93u83b7u53d6u535au5ba2u6570u636e
    try {
      // 尝试使用master分支，如果失败则尝试main分支
      let data;
      try {
        const response = await octokit.rest.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: BLOGS_PATH,
          ref: 'master', // 先尝试master分支
        });
        data = response.data;
        console.log('成功使用master分支获取数据');
      } catch (branchError) {
        console.log('尝试使用main分支');
        const response = await octokit.rest.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: BLOGS_PATH,
          ref: 'main',
        });
        data = response.data;
        console.log('成功使用main分支获取数据');
      }
      
      console.log('成功获取GitHub文件');
      // u89e3u7801base64u5185u5bb9
      const content = Buffer.from(data.content, 'base64').toString();
      const blogs = JSON.parse(content);
      console.log(`成功解析博客数据，找到${blogs.length}篇博客`);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(blogs)
      };
    } catch (error) {
      // 文件不存在或访问失败，返回空数组
      console.log('获取博客数据出错:', error.message);
      
      if (error.status === 404) {
        console.log('博客文件不存在，返回空数组');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify([])
        };
      } else {
        throw error; // 其他错误继续抛出给下面的catch块处理
      }
    }
  } catch (error) {
    console.error('获取博客列表出错:', error);
    console.error('错误详情:', error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: `获取博客列表失败: ${error.message}`,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};

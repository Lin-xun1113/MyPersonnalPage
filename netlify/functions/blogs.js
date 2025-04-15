const { Octokit } = require('octokit');

// u521du59cbu5316GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = 'Lin-xun1113'; // u66ffu6362u4e3au60a8u7684GitHubu7528u6237u540d
const REPO_NAME = 'MyPersonnalPage'; // u60a8u7684u4ed3u5e93u540d
const BLOGS_PATH = 'data/blogs.json'; // u5b58u50a8u535au5ba2u6570u636eu7684u8defu5f84

// 添加CORS头
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

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
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: BLOGS_PATH,
        ref: 'main', // u6216u60a8u7684u9ed8u8ba4u5206u652f
      });
      
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

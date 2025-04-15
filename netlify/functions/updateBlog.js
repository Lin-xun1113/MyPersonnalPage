// 安全地导入模块
try {
  var { Octokit } = require('@octokit/rest');
} catch (error) {
  console.error('无法加载@octokit/rest:', error);
  try {
    var { Octokit } = require('octokit');
  } catch (error) {
    console.error('无法加载octokit:', error);
    var Octokit = function() { this.rest = { repos: { getContent: async () => { throw new Error('Octokit模块无法加载'); } } }; };
  }
}

try {
  var ethers = require('ethers');
} catch (error) {
  console.error('无法加载ethers:', error);
  // 创建一个模拟的ethers对象
  var ethers = {
    utils: {
      verifyMessage: () => { throw new Error('ethers模块无法加载'); }
    }
  };
}

// 检查环境变量
// 如果没有GITHUB_TOKEN，直接输出警告
if (!process.env.GITHUB_TOKEN) {
  console.error('警告: GITHUB_TOKEN环境变量未设置');
}

// u521du59cbu5316GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = 'Lin-xun1113'; // u6539u4e3au60a8u7684GitHubu7528u6237u540d
const REPO_NAME = 'MyPersonnalPage'; // u60a8u7684u4ed3u5e93u540d
const BLOGS_PATH = 'data/blogs.json'; // u5b58u50a8u535au5ba2u6570u636eu7684u8defu5f84
const ADMIN_ADDRESSES = []; // u7a7au6570u7ec4uff0cu7a0bu5e8fu4f1au4eceu5ba2u6237u7aefu4f20u5165u5730u5740u5e76u8fdbu884cu9a8cu8bc1

// u9a8cu8bc1u7b7eu540d
async function verifySignature(address, message, signature) {
  try {
    // 输出调试信息
    console.log('验证签名参数:', {
      address,
      message,
      signatureLength: signature ? signature.length : 0
    });
    
    if (!address || !message || !signature) {
      console.error('签名参数不完整');
      return false;
    }
    
    // ethers v5 版本的API
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    const isValid = signerAddr.toLowerCase() === address.toLowerCase();
    console.log(`签名验证${isValid ? '成功' : '失败'}: 签名者=${signerAddr}, 地址=${address}`);
    
    return isValid;
  } catch (error) {
    console.error('签名验证错误:', error);
    return false;
  }
}

// u66f4u65b0u535au5ba2
exports.handler = async (event, context) => {
  console.log('updateBlog函数被调用');
  
  // 添加CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // 处理预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // 只处理POST请求
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: '方法不允许' }) 
    };
  }

  try {
    const { operation, blog, address, signature, message, adminList } = JSON.parse(event.body);
    
    // u9a8cu8bc1u7b7eu540d
    console.log('正在验证签名，地址:', address);
    const isSignatureValid = await verifySignature(address, message, signature);
    if (!isSignatureValid) {
      console.error('签名验证失败');
      return { 
        statusCode: 403, 
        headers,
        body: JSON.stringify({ error: '签名验证失败' }) 
      };
    }
    console.log('签名验证成功');
    
    // u4f7fu7528u5ba2u6237u7aefu63d0u4f9bu7684u7ba1u7406u5458u5217u8868u8fdbu884cu9a8cu8bc1
    // u5b9eu9645u4e0au8fd9u5e94u8be5u5b58u50a8u5728u670du52a1u5668u7aefuff0cu4f46u6211u4eecu4f7fu7528u7b7eu540du9a8cu8bc1u6765u786eu4fddu5b89u5168u6027
    const allAdminAddresses = adminList || ADMIN_ADDRESSES;
    console.log('管理员列表:', JSON.stringify(allAdminAddresses));
    console.log('当前钱包地址:', address);
    
    const isAdmin = allAdminAddresses.some(
      admin => admin.toLowerCase() === address.toLowerCase()
    );

    if (!isAdmin) {
      console.error('没有管理员权限');
      return { 
        statusCode: 403, 
        headers,
        body: JSON.stringify({ error: '没有管理员权限' }) 
      };
    }
    console.log('管理员验证成功');

    // u83b7u53d6u73b0u6709u535au5ba2u6570u636e// 获取现有博客数据
    let blogs = [];
    try {
      console.log(`正在从GitHub获取博客数据: ${REPO_OWNER}/${REPO_NAME}/${BLOGS_PATH}`);
      console.log(`使用的GitHub Token长度: ${process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.length : 0}`);

      // 检查GitHub Token是否已设置
      if (!process.env.GITHUB_TOKEN) {
        throw new Error('未设置GITHUB_TOKEN环境变量');
      }

      console.log('正在获取博客文件，使用master分支');
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: BLOGS_PATH,
        ref: 'master', // 使用master分支而不main
      });
      console.log('成功获取GitHub文件内容');
      const content = Buffer.from(data.content, 'base64').toString();
      blogs = JSON.parse(content);
      console.log(`成功解析博客数据，找到${blogs.length}篇博客`);
    } catch (error) {
      // 如果文件不存在，则创建空数组
      console.error('获取博客数据出错:', error.message);
      console.error('错误详情:', error.stack);

      // 如果是首次使用，创建一个新的博客数组
      if (error.status === 404) {
        console.log('博客文件不存在，将创建新文件');
      } else {
        // 对于其他错误，返回更具体的错误信息
        return { 
          statusCode: 500, 
          body: JSON.stringify({ 
            error: `获取博客数据失败: ${error.message}`,
            details: error.stack
          })
        };
      }
    }

    // u6839u636eu64cdu4f5cu7c7bu578bu5904u7406
    if (operation === 'add') {
      // u6dfbu52a0u65b0u535au5ba2
      const newBlog = {
        id: Date.now().toString(),
        title: blog.title,
        content: blog.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        comments: []
      };
      blogs.push(newBlog);
    } else if (operation === 'update') {
      // u66f4u65b0u73b0u6709u535au5ba2
      const index = blogs.findIndex(b => b.id === blog.id);
      if (index !== -1) {
        blogs[index] = {
          ...blogs[index],
          title: blog.title,
          content: blog.content,
          updatedAt: new Date().toISOString()
        };
      }
    } else if (operation === 'delete') {
      // u5220u9664u535au5ba2
      blogs = blogs.filter(b => b.id !== blog.id);
    }

    // u5c06u66f4u65b0u540eu7684u6570u636eu5199u56deu5230    // 将更新后的数据写回到GitHub
    const content = JSON.stringify(blogs, null, 2);
    let sha;
    
    try {
      console.log('尝试获取现有文件的SHA值');
      // 获取当前文件的SHA值(如果存在)
      console.log('正在获取文件SHA，使用master分支');
      const fileData = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: BLOGS_PATH,
        ref: 'master', // 使用master分支而不main
      });
      sha = fileData.data.sha;
      console.log(`获取到现有文件的SHA值: ${sha}`);
    } catch (error) {
      // 如果文件不存在，sha保持undefined
      console.log('文件尚不存在，将创建新文件');
      if (error.status !== 404) {
        console.error('获取文件SHA值时出错:', error.message);
      }
    }

    // 创建或更新文件
    try {
      console.log(`准备${sha ? '更新' : '创建'}博客文件`);
      console.log('准备写入GitHub文件，使用master分支');
      console.log('操作:', operation, '博客标题:', blog.title);
      console.log('SHA值:', sha ? '有SHA' : '无SHA');
      
      const response = await octokit.rest.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: BLOGS_PATH,
        message: `${operation} blog: ${blog.title}`,
        content: Buffer.from(content).toString('base64'),
        sha: sha, // 如果文件已存在，需要提供sha
        branch: 'master', // 使用master分支而不main
      });
      console.log('博客数据成功保存到GitHub');
    } catch (error) {
      console.error('保存博客数据失败:', error.message);
      console.error('错误详情:', error.stack);
      return { 
        statusCode: 500, 
        body: JSON.stringify({ 
          error: `保存博客数据失败: ${error.message}`,
          details: error.stack 
        }) 
      };
    }

    return { 
      statusCode: 200, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ message: '操作成功', blogs }) 
    };
  } catch (error) {
    console.error('函数执行出错:', error.message);
    console.error('错误详情:', error.stack);
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        error: '服务器错误', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }) 
    };
  }
};

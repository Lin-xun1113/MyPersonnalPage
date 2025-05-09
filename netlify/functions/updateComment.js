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

// u521du59cbu5316GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = 'Lin-xun1113'; // u66ffu6362u4e3au60a8u7684GitHubu7528u6237u540d
const REPO_NAME = 'MyPersonnalPage'; // u60a8u7684u4ed3u5e93u540d
const BLOGS_PATH = 'data/blogs.json'; // u5b58u50a8u535au5ba2u6570u636eu7684u8defu5f84

// u9a8cu8bc1u7b7eu540d
async function verifySignature(address, message, signature) {
  try {
    console.log('验证评论签名参数:', {
      address,
      message,
      signatureLength: signature ? signature.length : 0
    });
    
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    const isValid = signerAddr.toLowerCase() === address.toLowerCase();
    console.log(`签名验证${isValid ? '成功' : '失败'}: 签名者=${signerAddr}, 地址=${address}`);
    
    return isValid;
  } catch (error) {
    console.error('签名验证错误:', error);
    return false;
  }
}

// u66f4u65b0u535au5ba2u8bc4u8bba
exports.handler = async (event, context) => {
  // u53eau5904u7406POSTu8bf7u6c42
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'u65b9u6cd5u4e0du5141u8bb8' }) };
  }

  try {
    const { operation, blogId, comment, address, signature, message, adminList } = JSON.parse(event.body);
    
    // u9a8cu8bc1u7b7eu540d
    const isSignatureValid = await verifySignature(address, message, signature);
    if (!isSignatureValid) {
      return { statusCode: 403, body: JSON.stringify({ error: 'u7b7eu540du9a8cu8bc1u5931u8d25' }) };
    }
    
    // u83b7u53d6u73b0u6709u535au5ba2u6570u636e
    let blogs = [];
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: BLOGS_PATH,
        ref: 'master', // 使用master分支
      });
      console.log('成功从仓库获取博客数据');
      const content = Buffer.from(data.content, 'base64').toString();
      blogs = JSON.parse(content);
    } catch (error) {
      return { statusCode: 404, body: JSON.stringify({ error: 'u535au5ba2u6570u636eu4e0du5b58u5728' }) };
    }

    // u67e5u627eu76eeu6807u535au5ba2
    const blogIndex = blogs.findIndex(b => b.id === blogId);
    if (blogIndex === -1) {
      return { statusCode: 404, body: JSON.stringify({ error: 'u535au5ba2u4e0du5b58u5728' }) };
    }

    // u68c0u67e5u662fu5426u7ba1u7406u5458
    const isAdmin = adminList && adminList.some(
      admin => admin.toLowerCase() === address.toLowerCase()
    );

    // u6839u636eu64cdu4f5cu7c7bu578bu5904u7406
    if (operation === 'add') {
      // u6dfbu52a0u65b0u8bc4u8bba
      const newComment = {
        id: Date.now().toString(),
        content: comment.content,
        author: address,
        createdAt: new Date().toISOString(),
      };
      blogs[blogIndex].comments = blogs[blogIndex].comments || [];
      blogs[blogIndex].comments.push(newComment);
    } else if (operation === 'delete') {
      // u5220u9664u8bc4u8bba (u53eau6709u7ba1u7406u5458u6216u8bc4u8bbau4f5cu8005u53efu4ee5u5220u9664)
      const commentIndex = blogs[blogIndex].comments.findIndex(c => c.id === comment.id);
      if (commentIndex !== -1) {
        const commentAuthor = blogs[blogIndex].comments[commentIndex].author;
        if (isAdmin || commentAuthor.toLowerCase() === address.toLowerCase()) {
          blogs[blogIndex].comments.splice(commentIndex, 1);
        } else {
          return { statusCode: 403, body: JSON.stringify({ error: 'u6ca1u6709u6743u9650u5220u9664u6b64u8bc4u8bba' }) };
        }
      }
    }

    // u5c06u66f4u65b0u540eu7684u6570u636eu5199u56deu5230GitHub
    const content = JSON.stringify(blogs, null, 2);
    
    // u83b7u53d6u6587u4ef6u7684SHAu503c
    const fileData = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: BLOGS_PATH,
      ref: 'master', // 使用master分支
    });
    console.log('成功获取文件SHA值');
    const sha = fileData.data.sha;

    // u66f4u65b0u6587u4ef6
    console.log(`准备${operation}博客评论, 博客ID: ${blogId}`);
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: BLOGS_PATH,
      message: `${operation} comment on blog: ${blogId}`,
      content: Buffer.from(JSON.stringify(blogs, null, 2)).toString('base64'),
      sha: fileData.data.sha,
      branch: 'master', // 使用master分支
    });
    console.log('成功更新评论数据');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, blogs: blogs[blogIndex] }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error updating comment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'u66f4u65b0u8bc4u8bbau5931u8d25' })
    };
  }
};

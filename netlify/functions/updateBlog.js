const { Octokit } = require('octokit');
const { ethers } = require('ethers');

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
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    return signerAddr.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// u66f4u65b0u535au5ba2
exports.handler = async (event, context) => {
  // u53eau5904u7406POSTu8bf7u6c42
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'u65b9u6cd5u4e0du5141u8bb8' }) };
  }

  try {
    const { operation, blog, address, signature, message, adminList } = JSON.parse(event.body);
    
    // u9a8cu8bc1u7b7eu540d
    const isSignatureValid = await verifySignature(address, message, signature);
    if (!isSignatureValid) {
      return { statusCode: 403, body: JSON.stringify({ error: 'u7b7eu540du9a8cu8bc1u5931u8d25' }) };
    }
    
    // u4f7fu7528u5ba2u6237u7aefu63d0u4f9bu7684u7ba1u7406u5458u5217u8868u8fdbu884cu9a8cu8bc1
    // u5b9eu9645u4e0au8fd9u5e94u8be5u5b58u50a8u5728u670du52a1u5668u7aefuff0cu4f46u6211u4eecu4f7fu7528u7b7eu540du9a8cu8bc1u6765u786eu4fddu5b89u5168u6027
    const allAdminAddresses = adminList || ADMIN_ADDRESSES;
    const isAdmin = allAdminAddresses.some(
      admin => admin.toLowerCase() === address.toLowerCase()
    );

    if (!isAdmin) {
      return { statusCode: 403, body: JSON.stringify({ error: 'u6ca1u6709u7ba1u7406u5458u6743u9650' }) };
    }

    // u83b7u53d6u73b0u6709u535au5ba2u6570u636e
    let blogs = [];
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: BLOGS_PATH,
        ref: 'main',
      });
      const content = Buffer.from(data.content, 'base64').toString();
      blogs = JSON.parse(content);
    } catch (error) {
      // u5982u679cu6587u4ef6u4e0du5b58u5728uff0cu5219u521bu5efau7a7au6570u7ec4
      console.log('Blog file not found, creating new one');
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

    // u5c06u66f4u65b0u540eu7684u6570u636eu5199u56deu5230GitHub
    const content = JSON.stringify(blogs, null, 2);
    let sha;
    
    try {
      // u83b7u53d6u5f53u524du6587u4ef6u7684SHAu503c(u5982u679cu5b58u5728)
      const fileData = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: BLOGS_PATH,
      });
      sha = fileData.data.sha;
    } catch (error) {
      // u6587u4ef6u4e0du5b58u5728uff0cu5c06u521bu5efau65b0u6587u4ef6
    }

    // u66f4u65b0u6216u521bu5efau6587u4ef6
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: BLOGS_PATH,
      message: `${operation} blog: ${blog.title || blog.id}`,
      content: Buffer.from(content).toString('base64'),
      sha: sha,
      branch: 'main',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, blogs }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error updating blog:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'u66f4u65b0u535au5ba2u5931u8d25' })
    };
  }
};

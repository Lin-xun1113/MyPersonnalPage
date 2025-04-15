const { Octokit } = require('octokit');

// u521du59cbu5316GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = 'Lin-xun1113'; // u66ffu6362u4e3au60a8u7684GitHubu7528u6237u540d
const REPO_NAME = 'MyPersonnalPage'; // u60a8u7684u4ed3u5e93u540d
const BLOGS_PATH = 'data/blogs.json'; // u5b58u50a8u535au5ba2u6570u636eu7684u8defu5f84

// u83b7u53d6u535au5ba2u5217u8868
exports.handler = async (event, context) => {
  // u786eu4fddu53eau5904u7406GETu8bf7u6c42
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'u65b9u6cd5u4e0du5141u8bb8' }) };
  }

  try {
    // u5c1du8bd5u4eceu4ed3u5e93u83b7u53d6u535au5ba2u6570u636e
    const { data } = await octokit.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: BLOGS_PATH,
      ref: 'main', // u6216u60a8u7684u9ed8u8ba4u5206u652f
    }).catch(err => {
      // u5982u679cu6587u4ef6u4e0du5b58u5728uff0cu8fd4u56deu7a7au6570u7ec4
      console.log('Blog data not found, returning empty array');
      return { data: { content: Buffer.from(JSON.stringify([])).toString('base64') } };
    });

    // u89e3u7801base64u5185u5bb9
    const content = Buffer.from(data.content, 'base64').toString();
    const blogs = JSON.parse(content);

    return {
      statusCode: 200,
      body: JSON.stringify(blogs),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'u83b7u53d6u535au5ba2u5217u8868u5931u8d25' })
    };
  }
};

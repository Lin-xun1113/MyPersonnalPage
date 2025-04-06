# Linxun个人网站

这是Linxun的个人网站项目，基于React、Next.js和Tailwind CSS构建。网站展示了个人信息、技术技能、项目经验和个人爱好。

## 技术栈

- **React**: 用于构建用户界面
- **Next.js**: React框架，提供服务端渲染和静态站点生成
- **Tailwind CSS**: 实用优先的CSS框架
- **DaisyUI**: 基于Tailwind CSS的组件库
- **Framer Motion**: 用于实现动画效果
- **React Icons**: 提供丰富的图标库

## 项目结构

```
/src
  /components - 组件文件
    /Navbar.js - 导航栏组件
    /Hero.js - 首页hero部分
    /About.js - 关于我部分
    /Skills.js - 技能展示部分
    /Projects.js - 项目展示部分
    /Hobbies.js - 个人爱好部分
    /Contact.js - 联系方式部分
    /Footer.js - 页脚组件
  /pages - Next.js页面
    /index.js - 网站首页
    /_app.js - Next.js应用入口
  /styles - 样式文件
    /globals.css - 全局样式
/public - 静态资源文件
```

## 本地开发

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

3. 打开浏览器访问 http://localhost:3000

## 构建部署

1. 构建生产版本：

```bash
npm run build
```

2. 启动生产服务器：

```bash
npm start
```

## 自定义

- 修改 `/src/components` 中的组件文件以更新内容
- 在 `tailwind.config.js` 中自定义主题和颜色
- 在 `public` 目录中添加自定义图片和静态资源

## 作者

Linxun - 区块链技术爱好者 | 智能合约开发者 | 计算机科学学生

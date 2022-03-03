# [Hacker News](https://news.ycombinator.com/) App

A project to preview tech stack of ali cloud Front-end.

The tech stack can be listed as following:

- RxJS
- Hooks
- TypeScript
- React

## Requirements

- 使用 Github 提交你的代码，每个 commit 符合 [Angular Commit Guide](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
- 要求使用 RxJS/Hooks/TypeScript/React 完成你的应用从开发到打包
- 使用以上依赖的最新版本，打包工具需要手动使用 Webpack 配置（要求使用 - - - TypeScript 完成 Webpack 配置）
- 不允许使用第三方组件库及第三方 CSS 框架

## Getting Started

1. install

> yarn

2. launch

> yarn start

## Change Logs

- `v0.1.0` 首页界面原型
- `v0.1.1` 首页加载数据（rxjs）
- `v0.1.2` Webpack 打包([@laffery/webpack-starter-kit](https://www.npmjs.com/package/@laffery/webpack-starter-kit))
- `v0.1.3` ESlint 和 husky pre-commit 配置
- `v0.1.4` 修复 news 列表上新闻源地址域名显示问题和时间显示问题
- `v0.1.5` 使用 react-router-dom 库实现路由，增加 /newsguidelines 页面
- `v0.1.6` 增加 /newsfaq 页面，和 /newsguidelines 一起抽象出 html-page 组件
- `v0.1.7` 增加 /security 页面，将 html-page 底部红色分割线抽出，通过参数决定是否有
- `v0.1.8` 增加 /lists 页面，首页底部footer全部完成，重构仓库结构

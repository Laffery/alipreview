# Change Logs

- `0.1.0` 首页界面原型
- `0.1.1` 首页加载数据（rxjs）
- `0.1.2` Webpack 打包([@laffery/webpack-starter-kit](https://www.npmjs.com/package/@laffery/webpack-starter-kit))
- `0.1.3` ESlint 和 husky pre-commit 配置
- `0.1.4` 修复 news 列表上新闻源地址域名显示问题和时间显示问题
- `0.1.5` 使用 react-router-dom 库实现路由，增加 /newsguidelines 页面
- `0.1.6` 增加 /newsfaq 页面，和 /newsguidelines 一起抽象出 html-page 组件
- `0.1.7` 增加 /security 页面，将 html-page 底部红色分割线抽出，通过参数决定是否有
- `0.1.8` 增加 /lists 页面，首页底部footer全部完成，重构仓库结构
- `0.1.9` 使用`forkJoin`将列表中请求集中发出，从而实现列表同时渲染的效果
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

```bash
# install dependencies
yarn

# build this project by webpack, output in /dist
yarn build

yarn start
```

If you wanna developing by yourself, run `yarn dev` to launch a HMR server and enjoy coding.

### API

- [online](https://hackernews.api-docs.io/v0/overview/introduction)
- [local](./docs/API.md)

## Attention Please

### Server Side Render

基于本人的另一个项目[webpack-starter-kit](https://github.com/Laffery/webpack-starter-kit)，完全基于`Webpack5`和`React18`实现对`SSR`的支持。

在服务端使用`RxJS`处理网络请求，一般需要引入node端的`fetch`，而最新的`nodejs@18`开始在原生支持`fetch API`，故采用（注意，v18将在2022年10月15日才成为LTS版本）。

### Authorization

根据[Does the Hacker News API have auth documentation?](https://news.ycombinator.com/item?id=24127575)，并且原生的登录注册接口还需要`reRAPTCHA`人机身份验证，因此不太好实现调用Hacker News API进行注册和登录。\
本项目基于express，提供一个真实存在的账号（参见配置中的mock account），在BFF层**模拟实现**

- 注册不开放，仅可使用提供的账号进行注册
- 登录仅可使用提供的账号进行登录，并颁发预设的cookie（过期时间到2038年，足够可用）
- forget忘记密码重置-不支持（因为我们只有唯一指定的账号）

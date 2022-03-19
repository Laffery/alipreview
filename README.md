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

## Attention Please

### Authorization

事实上，根据[Does the Hacker News API have auth documentation?](https://news.ycombinator.com/item?id=24127575)的说法，以及实际开发中的情况，目前是不太好实现用实际请求的方法进行注册和登录，所以本项目目前采用`catchError`操作符**模拟实现**，同时略去了`reRAPTCHA`人机身份验证部分。

为了保证接近真实的使用体验，提供一个真实存在的账号（参见配置中的mock account），以及在模拟登录/注册时，颁发一个虚拟的cookie，官方格式为`user=<username>&<32位token>`

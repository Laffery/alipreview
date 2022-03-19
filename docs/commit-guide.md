# Commit Guide

> 节选和翻译自[Angular Commit Guide](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

每个提交包括一个header, 一个body, 一个footer.

- header 是必要的并需要遵循 Commit Message Header 的形式
- 除了类型为"docs"的提交，body 是必要的。至少20个字母长，并需要遵循Commit Message Body的形式
- footer是可选的，并需要遵循Commit Message Footer的形式

## Commit Message Header

```text
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ 现在时态.非大写.无需句号结尾.
  │       └─⫸ Commit Scope
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

`<type>`和`<summary>`是必须的, `<scope>` 可选。

### Type

应该是以下之一：
- build: Changes that affect the build system or external dependencies
- ci: Changes to our CI configuration files and scripts
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests

### Scope
scope 应该是所影响到的npm包的名称 (as perceived by the person reading the changelog generated from commit messages).c
Summary
为更改提供精炼地描述。

## Commit Message Body

- 就像概述summary一样，使用简练的、现在时的句子描述
- 阐述更改的动机，比较更改前后的异同

## Commit Message Footer

footer包含 breaking changes 和 deprecations 的信息，同时也可以引用 GitHub issues, Jira tickets,  PRs that this commit closes or is related to.

```text
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

或

```text
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

重大突破应该以"BREAKING CHANGE: "开头。Followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.
弃置信息应该以"DEPRECATED: "开头。Followed by a short description of what is deprecated, a blank line, and a detailed description of the deprecation that also mentions the recommended update path.

## Revert commits
如果你的提交还原了先前的提交，应该以revert: 开头，接着是被还原的提交的header，提交的body应该包括
- 被还原提交的SHA信息：This reverts commit <SHA>,
- 还原的原因

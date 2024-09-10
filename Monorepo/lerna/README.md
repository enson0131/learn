# 简介

本项目是 yarn workspace + lerna + typescript 的 monorepo 项目。

具体配置如下：


```json

// lerna.json
{
  "version": "independent",
  "npmClient": "yarn", // 使用 yarn 作为包管理工具
  "useWorkspaces": true, // 使用 yarn workspaces
  "packages": ["packages/*"]
}


// package.json
{
  "private": true, // 私有项目，不会发布到 npm
  "workspaces": [ // 此时 lerna.json 中的 packages 配置项将不再使用 
    "packages/*"
  ],
}

// 此时执行 yarn install 相当于执行了 lerna bootstrap --npm-client yarn --use-workspaces 命令

```


如果 x-cli 这个包引用了底层包 x-core，当开发 x-cli 时，除了安装 x-cli，x-core 也需要被安装。
如果 x-core还没有被发布，正常情况下，x-core 是不会被安装的。

yarn 可以解决这个问题，可以创建一个虚拟链接🔗，在顶层的 node_modules上.


# 相关命令

```bash
yarn bootstrap - 会安装所有的依赖
yarn clean - 清除所有依赖包下的 node_modules，根目录不会
yarn publish - 发布软件包
```

# 参考文章
- https://juejin.cn/post/7215886869199896637?searchId=2024091014060558A6822EEF1F5EC92D42#heading-8
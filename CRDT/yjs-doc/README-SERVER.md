# Yjs WebSocket 服务器

## 📦 安装依赖

```bash
yarn install
# 或
npm install
```

## 🚀 启动服务器

### 方式一：只启动 WebSocket 服务器
```bash
yarn server
# 或
npm run server
```

### 方式二：同时启动服务器和前端开发服务器（推荐）
```bash
yarn start
# 或
npm start
```

## 📝 说明

- **端口**: 1234
- **地址**: ws://localhost:1234
- **房间名**: yjs-doc（在客户端代码中配置）

## 🔧 功能特性

- ✅ 支持多客户端协同编辑
- ✅ 实时同步文档状态
- ✅ 自动垃圾回收
- ✅ 连接状态监控
- ✅ 优雅关闭处理

## 📊 监控信息

服务器会每 30 秒输出当前连接数，帮助您了解活跃连接情况。

## 🛠️ 自定义配置

如需修改端口或其他配置，请编辑 `server.js` 文件。

## 🔥 测试

1. 启动服务器：`yarn server`
2. 启动前端：`yarn dev`（另开一个终端）
3. 打开多个浏览器标签页访问应用
4. 在任意标签页编辑文本，其他标签页会实时同步

## 📚 相关文档

- [Yjs 官方文档](https://docs.yjs.dev/)
- [y-websocket 文档](https://github.com/yjs/y-websocket)


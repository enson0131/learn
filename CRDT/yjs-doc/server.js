const { WebSocketServer } = require("ws");
const { setupWSConnection } = require("y-websocket/bin/utils");

const PORT = 1234;

// 创建 WebSocket 服务器
const wss = new WebSocketServer({ port: PORT });

console.log(`✨ Yjs WebSocket 服务器已启动！`);
console.log(`📡 监听地址: ws://localhost:${PORT}`);
console.log(`🎯 准备接收协同编辑连接...\n`);

// 连接处理
wss.on("connection", (ws, req) => {
  const url = new URL(req.url || "/", `ws://localhost:${PORT}`);
  const roomName = url.pathname.slice(1);

  console.log(`🔗 新客户端连接 - 房间: "${roomName || "未指定"}"`);

  setupWSConnection(ws, req, {
    // 是否启用持久化（可选）
    // persistence: false,

    // 垃圾回收配置
    gcEnabled: true,
  });

  // 监听连接关闭
  ws.on("close", () => {
    console.log(`❌ 客户端断开连接 - 房间: "${roomName || "未指定"}"`);
  });
});

// 错误处理
wss.on("error", (error) => {
  console.error("❌ WebSocket 服务器错误:", error);
});

// 优雅关闭
process.on("SIGINT", () => {
  console.log("\n🛑 正在关闭 WebSocket 服务器...");
  wss.close(() => {
    console.log("✅ 服务器已关闭");
    process.exit(0);
  });
});

// 统计信息（可选）
setInterval(() => {
  const clientCount = wss.clients.size;
  if (clientCount > 0) {
    console.log(`📊 当前连接数: ${clientCount}`);
  }
}, 30000); // 每30秒输出一次

# 简介

通过 Yjs 实现简单的文本协同

# 技术方案

- y-websocket （数据同步）+ Yjs 实现基于 CRDT 的分布式数据同步
- y-indexeddb 实现本地弱网数据存储
- 状态管理（用户光标等） + 用户标识

# 功能分层

- 用户信息、光标、房间信息等数据存放于 awareness 层 （有本地、远程）
- 数据同步层，使用 yjs Y.doc 实现 （Y.text、Y.map、Y.array）
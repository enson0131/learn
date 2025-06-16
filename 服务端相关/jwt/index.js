const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

/**
 * 创建自定义的 HMAC-SHA256 JWT Token
 * @param {string} jwtSec - 密钥
 * @param {number} ttlMillis - 过期时间（毫秒）
 * @param {object} claims - JWT 载荷内容
 * @returns {string} - 签名后的 JWT 字符串
 */
function createCustomizeHmacSha256(jwtSec, ttlMillis, claims) {
  const now = Math.floor(Date.now() / 1000); // 当前时间戳（单位：秒）

  const payload = {
    ...claims,
    jti: uuidv4(), // JWT ID
    iat: now, // 签发时间
    sub: claims.name || "", // 主题
  };

  if (ttlMillis >= 0) {
    payload.exp = now + Math.floor(ttlMillis / 1000); // 设置过期时间
  }

  return jwt.sign(payload, jwtSec, { algorithm: "HS256" });
}

const secret = "your-secret-key";

const claims = {
  account: "test@163.com",
  email: "test@163.com",
  origin: "Partner",
};

const ttl = 60 * 60 * 1000; // 1小时

const token = createCustomizeHmacSha256(secret, ttl, claims);
console.log(token);

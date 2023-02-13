var hmacSha256 = require("crypto-js/hmac-sha256");


/**
 * hmacSha256 主要用于消息摘要，验证信息是否有被篡改
 */
const encode = hmacSha256(
    `test`,
    '123456778'
).toString();

console.log(`encode===>`, encode);

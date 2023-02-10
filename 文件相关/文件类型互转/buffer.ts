import path from "path";
import { readFileSync } from "fs";
import { Blob } from "buffer";

/*
Buffer: 是 Nodejs 提供的可以直接操作二进制数据的类
ArrayBuffer: 是符合ES标准的, 用来表示通用的、固定长度的原始二进制数据缓冲区，是一个字节数组，可读但不可直接写
Blob: 前端的一个专门用于支持文件操作的二进制对象
File: File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件

DataView: 是一个可以从 ArrayBuffer 对象中读写多种数值类型的底层接口
类型有:
Int8Array：8位有符号整数，长度1个字节
Uint8Array：8位无符号整数，长度1个字节
Int16Array：16位有符号整数，长度2个字节
Uint16Array：16位无符号整数，长度2个字节
Int32Array：32位有符号整数，长度4个字节
Uint32Array：32位无符号整数，长度4个字节
Float32Array：32位浮点数，长度4个字节
Float64Array：64位浮点数，长度8个字节

总结:
1 Buffer 转 ArrayBuffer: 先转成 Unit8Array 然后通过 Unit8Array.buffer 获取 ArrayBuffer
2 ArrayBuffer 转 Buffer: 调用 Buffer.from 方法即可
3 ArrayBuffer/Buffer 转 DataView: new DateView(ArrayBuffer | Buffer)

参考文档: 
1 https://www.nodeapp.cn/buffer.html
2 https://www.cnblogs.com/baby123/p/13970439.html
3 https://juejin.cn/post/6992205283732766750
*/

function getImageBuffer() {
  const imagePath = path.join(__dirname, "./test.png");
  return readFileSync(imagePath);
}

const imgaeBuffer = getImageBuffer();

console.log(
  `imgaeBuffer===>`,
  imgaeBuffer,
  imgaeBuffer.buffer instanceof ArrayBuffer,
  Buffer.alloc(0).buffer // Create a 0 bytes buffer object:
);

// Buffer 转 ArrayBuffer: Buffer => Uint8Array => ArrayBuffer
const uint8Array = new Uint8Array(imgaeBuffer);
const arrayBuffer = uint8Array.buffer;
// console.log(`uint8Array`, uint8Array);
// console.log(`arrayBuffer`, arrayBuffer);

// ArrayBuffer 转 buffer
const buffer = Buffer.from(arrayBuffer);
// console.log(`buffer--->`, buffer);

// DataView/ArrayBuffer 互转
const view = new DataView(arrayBuffer);
const arrayBuf = view.buffer;
// console.log(`arrayBuf===>`, arrayBuf);

// Buffer 转 Blob: Buffer -> uint8Array -> Blob
const imageBlob: any = new Blob([uint8Array], {
  type: "image/png",
});

// // Blob 转 File
// const imageFile = new File([imageBlob], "test1.png", {
//   type: "image/png",
// });

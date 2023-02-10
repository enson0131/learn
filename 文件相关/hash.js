console.log(`self`, self);
// 在worker内，不能直接操作DOM节点，也不能使用window对象的默认方法和属性。
// 然而你可以使用大量window对象之下的东西，包括WebSockets，IndexedDB以及FireFox OS专用的Data Store API等数据存储机制
// console.log(`window`, window);

importScripts("./spark-md5.js"); // 导入脚本

// 生成文件 hash

/**
 * workers和主线程间的数据传递通过这样的消息机制进行
 * 双方都使用postMessage()方法发送各自的消息，
 * 使用onmessage事件处理函数来响应消息（消息被包含在Message事件的data属性中）。
 * 这个过程中数据并不是被共享而是被复制
 */
// self代表子线程自身，即子线程的全局对象
self.onmessage = e => {
    const { fileChunkList } = e.data;
    const spark = new self.SparkMD5.ArrayBuffer();
    let count = 0;
    const loadNext = index => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileChunkList[index].file);
      reader.onload = e => {
        count++;
        spark.append(e.target.result);
        // spark-md5 需要根据所有切片才能算出一个 hash 值，不能直接将整个文件放入计算，否则即使不同文件也会有相同的 hash，具体可以看官方文档
        if (count === fileChunkList.length) { 
          self.postMessage({
            percentage: 100,
            hash: spark.end()
          });
          self.close();
        } else {
          // 递归计算下一个切片
          loadNext(count);
        }
      };
    };
    loadNext(0);
};
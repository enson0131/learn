/**
实现洗牌算法函数shuffle，给定一个数组[0,1,2,3,4,5,6]，每次随机抽选数组的n个值，连续抽选不重复已经抽选的值，直到数组抽完，在进行下一轮循环。

示例1：
var random = shuffle([0,1,2,3,4,5,6]);
random(1); // [1]
random(1); // [0]
random(1); // [2]
random(1); // [3]
random(1); // [5]
random(1); // [4]
random(1); // [6]
random(1); // [3]

示例2：
var random = shuffle([0,1,2,3,4,5,6]);
random(1); // [1]
random(2); // [0,6]
random(1); // [2]
random(4); // [3,4,5,2]

**/

function shuffle(arr) {
  let arrList = arr.slice();
  return function (count) {
    let res = [];
    while(res.length < count) {
      if (arrList.length <= 0) arrList = arr.slice(); // 如果arrList为空了，重新赋牌

      const curIndex = Math.floor(Math.random() * (arrList.length - 1));
      const value = arrList.splice(curIndex, 1); // 过滤重复的
      
      if (!res.includes(value)) {
        res = res.concat(...value);
      }
    }

    return res;
  }
}

  
const arr = [0, 1, 2, 3, 4, 5, 6]
var random = shuffle([0, 1, 2, 3, 4, 5, 6])
// console.log(random(1)) // [1]
// console.log(random(1)) // [0]
// console.log(random(1)) // [2]
// console.log(random(1)) // [3]
// console.log(random(1)) // [5]
// console.log(random(1)) // [4]
// console.log(random(1)) // [6]
// console.log(random(1)) // [3]
//------
console.log(random(1)); // [1]
console.log(random(2)); // [0,6]
console.log(random(1)); // [2]
console.log(random(4)); // [3,4,5,2]
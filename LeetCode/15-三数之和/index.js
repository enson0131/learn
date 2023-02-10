/**
 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
 注意：答案中不可以包含重复的三元组。
 */

 /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums = nums.sort((a, b) => a - b); // nums 从小到大
  const result = [];
  for(let i = 0; i < nums.length - 2; i++) {
    let start = i + 1;
    let end = nums.length - 1;
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    while(start < end) {
      if (nums[i] + nums[start] + nums[end] === 0) {
        const hasSome = result.some(item => {
          const [ povit, startValue, endValue ] = item;
          if (startValue === nums[start] && endValue === nums[end]) return true;
          if (startValue === nums[end] && endValue === nums[start]) return true;

          return false;
        })
        console.log('hasSome', hasSome);
        if (!hasSome) {
          result.push([nums[i], nums[start], nums[end]]);
        }
        start++;
        end--;
      } else if (nums[i] + nums[start] + nums[end] > 0) {
        end--;
      } else {
        start++;
      }
    }
  }
  return result;
};

console.log(threeSum([-2,0,0,2,2]))


const [ povit, start, end ] = [ -2, 0, 2 ];
console.log('start', povit, start, end);



console.log(1);

setTimeout(() =>{
    console.log(2);
    setTimeout(() =>{
        console.log(14);
        new Promise((resolve, reject) =>{
            console.log(15);
            resolve()
        }).then(res =>{
            console.log(16);
        })
    }) 

    new Promise((resolve, reject) =>{
        console.log(3);
        resolve()
    }).then(res =>{
        console.log(4);
    })
})

new Promise((resolve, reject) =>{
    resolve()
}).then(res =>{
    console.log(5);
}).then(res =>{
    console.log(6);

})

new Promise((resolve, reject) =>{
    console.log(7);
    resolve()
}).then(res =>{
    console.log(8);
}).then(res =>{
    console.log(9);

})

setTimeout(() =>{
    console.log(10);
    new Promise((resolve, reject) =>{
        console.log(11);
        resolve()
    }).then(res =>{
        console.log(12);
    })
})

console.log(13);
/**
   用的是哈希表的思想，哈希表的思想就是根据key去获取value，并且hash槽是有序的
   在内存上，hash表本身也是个数组

    1. 题目说到的要找最小正整数，所以我们可以理解为[1,N]， 但是有一种情况，如果最小正整数不在数组中，那么就是 [1, N+1]，所以真正的范围是[1, N+1]

    2. 根据hash表的思路，我们可以这样做：就把 1这个数放到下标为 0 的位置， 2这个数放到下标为 1 的位置，按照这种思路整理一遍数组。然后我们再遍历一次数组，第 1 个遇到的它的值不等于下标的那个数，就是我们要找的缺失的第一个正数。

    3. 这个思路就跟hash表的实现一样了，元素为a，那么映射到的数组下标就是a-1的位置
 */
const firstMissingPositive = (nums) => {
    for (let i = 0; i < nums.length; i++) {
      while (
        nums[i] >= 1 &&
        nums[i] <= nums.length && // 对1~nums.length范围内的元素进行安排
        nums[nums[i] - 1] !== nums[i] // 已经出现在理想位置的，就不用交换
      ) {
        const temp = nums[nums[i] - 1]; // 交换
        nums[nums[i] - 1] = nums[i];
        nums[i] = temp;
      }
    }
    // 现在期待的是 [1,2,3,...]，如果遍历到不是放着该放的元素
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] != i + 1) {
        return i + 1;
      }
    }
    return nums.length + 1; // 发现元素 1~nums.length 占满了数组，一个没缺
  };

console.log(firstMissingPositive([1,2,0]))






const findMinNumber = (arr) => {
    for (let i = 0; i <= arr.length - 1; i++) {
        while (arr[i] >= 1 && arr[i] <= arr.length && arr[arr[i] - 1] !== arr[i]) {
            // const temp1 = arr[i]; // --> 不能这么做，应该第三步赋值还用到了arr[i]
            // arr[i] = arr[arr[i] - 1];
            // arr[arr[i] - 1] = temp;
            const temp1 = arr[i];
            const temp2 = arr[arr[i] - 1];
            arr[temp1 - 1] = temp1; // 一定要先用这个
            arr[i] = temp2;
     
            
        //     const temp = arr[arr[i] - 1]; // 交换
        // arr[arr[i] - 1] = arr[i];
        // arr[i] = temp;
        }
    }

    for (let i = 0; i <= arr.length - 1; i++) {
        if (arr[i] !== i + 1) return i + 1;
    }

    return arr.length;
}

console.log(findMinNumber([-3, 4, -1, 1]))



/**** 
 * 1 通过 set 数据进行按顺存储
 * 2 找到第一个不连续的正整数
 * 3 返回第一个正整数
 */

function findNumber (arr) {
    const cacheSet = new Set();
    arr.forEach(element => {
        cacheSet.add(element)
    });

    for(let i = 1; i<= arr.length + 1; i++) {
        if (!cacheSet.has(i)) return i
    }
}

console.log(findNumber([1, 2, 0]))
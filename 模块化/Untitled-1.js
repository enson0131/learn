// var qSort = function (nums) {
//   var pivotValue = nums[0];
//   var _left = 0;
//   var _right = nums.length - 1;
//   console.log('_left < _right', _left, _right);

//   if (nums.length <= 1) return nums;
//   // [1, 4, 2, 3]
//   while(_left < _right) {
//       if (pivotValue > nums[_right]) {
//           console.log('进来过1:', _left, _right)
//           var temp = nums[_left];
//           nums[_left] = nums[_right];
//           nums[_right] = temp;
//           _left++;
//           return;
//       } 

//       if (pivotValue < nums[_left]) {
//         console.log('进来过2:', _left, _right)
//           var temp = nums[_right];
//           nums[_right] = nums[_left];
//           nums[_left] = temp;
//           _right--;
//           return;
//       }
//       _left++;
//       _right--;
//       console.log('while', _left, _right);
//   }
//   console.log('out', _left, _right);
//   nums[_left] = pivotValue;
//   console.log('numsnumsnums', nums);
//   const leftNums = nums.slice(0, _left);
//   const rightNums = nums.slice(_left, nums.length);


//   return qSort(leftNums).concat(qSort(rightNums));
  

// }
// var findKthLargest = function(nums, k) {
//   var sortNums = qSort(nums);
//   console.log('sortNums', sortNums)
//   return sortNums[nums.length - k];
// };


// var a = findKthLargest([1, 4, 2, 3], 1);
// console.log(a);

//-------------------------------------------------
// import {counter, incCounter} from './esmodule.js';

// incCounter();
// console.log('counter111', counter);

var b = require('./require.js');

b.incCounter();


var c = require('./require.js');

console.log(c.counter);


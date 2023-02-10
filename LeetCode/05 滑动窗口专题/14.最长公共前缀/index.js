/*
示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"
示例 2：

输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
*/


function longestCommonPrefix(arr) {
 if (!arr.length) return '';

 let res = '';
 const povit = arr[0];
 for(let i = 0; i < povit.length; i++) {
  let key = povit[i];

  const flag = arr.every(value => {
   return value[i] === key;
  });

  if (flag) {
   res = res + key;
  } else {
   return res;
  }
 }

 return res;
}
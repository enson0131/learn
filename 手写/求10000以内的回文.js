// 求10000以内的回文数
function fn(x) {
  var res = [];

  // 判断是否是回文数
  var _isPalindrome = function(x) {
    const str = x.toString();
    let left = 0;
    let right = str.length - 1;
  
    while(left <= right) {
      if(str[left] === str[right]) {
        left++;
        right--;
      } else {
        return false;
      }
    } 
  
    return true
  };

  for(let i = 0; i <= x; i++) {
    if (_isPalindrome(i)) {
      res.push(i)
    }
  }

  return res;
}
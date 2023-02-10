/**
 * 输入: 123ABcdE
 * 输出: 123abCDe
 */

/**
 * 思路1:
 * 1 通过正则表达式 /[a-z]/ 判断是否是小写
 * 2 通过正则表达式 /[A-Z]/ 判断是否是大写
 * 3 进行判断后做相对应的转换
 * @param {} str 
 */
function fn(str) {
  let res = '';
  
  for(let i = 0; i <= str.length - 1; i++) {
    const povit = str[i];

    if (/[a-z]/.test(povit)) {
      res = res + povit.toUpperCase();
    } else if (/[A-Z]/.test(povit)) {
      res = res + povit.toLowerCase();
    } else {
      res = res + povit
    }
  }

  return res;
}

console.log(fn('123ABcdE'));


/**
 * 思路2:
 * 1 通过ASCII码判断
 * 2 "a".charCodeAt() - "z".charCodeAt() 之间的字符则为小写
 * 3 "A".charCodeAt() - "Z".charCodeAt() 之间的字符则为大写
 * 3 进行判断后做相对应的转换
 * @param {} str 
 */
 function fn2(str) {
  let res = '';
  const min1 = "a".charCodeAt();
  const max2 = "z".charCodeAt();
  const min3 = "A".charCodeAt();
  const max4 = "Z".charCodeAt();
  for(let i = 0; i <= str.length - 1; i++) {
    const povit = str[i];
    const povitCode = povit.charCodeAt();

    if (povitCode >= min1 && povitCode <= max2) {
      res = res + povit.toUpperCase();
    } else if (povitCode >= min3 && povitCode <= max4) {
      res = res + povit.toLowerCase();
    } else {
      res = res + povit
    }
  }

  return res;
}

console.log(fn2('123ABcdE'));
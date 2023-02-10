/**
 * @param {string[]} strs
 * @return {string}
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
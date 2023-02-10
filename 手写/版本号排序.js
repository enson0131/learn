/**
 * 题目描述:
 * 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。
 * 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
 */

const versionArr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];

/**
 * 思路:
 * 1 通过，拆分成数组
 * 2 依次对比数组的值得大小
 */

const a = versionArr.sort((a, b) => {
  const arrA = a.split('.');
  const arrB = b.split('.');
  const maxLen = Math.max(arrA.length, arrB.length)

  let i = 0;
  while(i < maxLen) {
    const tempA = Number(arrA[i]) || 0;
    const tempB = Number(arrB[i]) || 0;
    if (tempA === tempB) {
      i++;
    } else {
      return tempB - tempA
    }
  }
})

console.log(a);

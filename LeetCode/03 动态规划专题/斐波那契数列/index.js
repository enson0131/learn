// 0, 1, 1, 2, 3, 5

/**
 * fibonacci(递归)
 * 时间复杂度 O(2^n)
 * @param {*} n
 * @returns
 */
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));

/**
 * fibonacci(循环)
 * 时间复杂度 O(n)
 * @param {*} n
 * @returns
 */
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let n_1 = 1;
  let n_2 = 0;
  let res = 0;

  for (let i = 2; i <= n; i++) {
    res = n_1 + n_2;
    n_2 = n_1;
    n_1 = res;
  }

  return res;
}
console.log(fibonacci(10));

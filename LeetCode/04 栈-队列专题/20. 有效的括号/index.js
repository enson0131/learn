/**
  给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

  有效字符串需满足：

  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。
 */
/**
 思路: 
 1 通过栈来处理
   a. 遇到左括号入栈
   b. 遇到右括号，如栈顶是对应的左括号则出栈，如果匹配不上，直接return false
 2 最后看栈的长度是否会0
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];
  const map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']']
  ])
  for(let i = 0; i <= s.length - 1; i++) {
    const value = s[i];

    if (map.has(value)) {
      stack.push(map.get(value))
    } else {
      const target = stack.pop();
      if ( target !== value) {
        return false;
      }
    }
  } 

  return !stack.length;
}

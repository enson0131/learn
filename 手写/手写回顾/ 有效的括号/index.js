/**
    给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

    有效字符串需满足：

    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    每个右括号都有一个对应的相同类型的左括号。

    示例 1：
    输入：s = "()"
    输出：true

    示例 2：
    输入：s = "()[]{}"
    输出：true

    示例 3：
    输入：s = "(]"
    输出：false
*/

/**
 * 通过栈去存储左括号，遇到右括号时，判断栈顶元素是否是对应的左括号
 * 如果是则出栈，否则返回false
 * 最后判断栈是否为空，如果为空则返回true，否则返回false
 * @param {*} s - 目标字符串
 * @return {boolean} - 是否有效
 */
function isValid(s) {
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const value = s[i];
    if (Object.values(map).includes(value)) {
      stack.push(value);
    }

    if (Object.keys(map).includes(value)) {
      const top = stack.pop();
      if (top !== map[value]) {
        return false;
      }
    }
  }

  return !stack.length;
}

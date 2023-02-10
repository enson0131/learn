// 双指针解法
function lagerPhoneNumber(number1, number2) {
    // 确保number1是最小数
    if (number1.length > number2.length) {
      [number1, number2] = [number2, number1];
    }

    let res = "";
    const len1 = number1.length;
    const len2 = number2.length;
    let i = 0; // number1的指针
    let j = 0; // number2的指针
    let povit = 0; // 权重
    while (i < len1) {
      let num =
        Number(number1[len1 - 1 - i]) + Number(number2[len2 - 1 - j]) + povit;

      if (num >= 10) {
        povit = 1;
        num = num - 10;
      } else {
        povit = 0; // 重置
      }

      res = num + res;
      i++;
      j++;
    }

    // 最后考虑number2的情况
    while (j < len2) {
      let num = Number(number2[len2 - 1 - j]) + povit;

      if (num >= 10) {
        povit = 1;
        num = num - 10;
      } else {
        povit = 0; // 重置
      }

      res = num + res;
      j++;
    }

    if (povit) {
      // 最后一种情况
      res = 1 + res;
      povit = 0;
    }

    return res;
  }
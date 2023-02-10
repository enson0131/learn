function myAtoi(s) {
    const max = Math.pow(2, 31) - 1;
    const min = -max - 1;

    const str = s.trim(); // 去掉空格后开始匹配

    let value = str.match(/^[\+|-]?\d+/);

    if (!value) return 0;

    value = Number(value[0]);

    if (value > max) return max;
    if (value < min) return min;

    return value;
}
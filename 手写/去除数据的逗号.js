function transformArr2Str(arr) {
    let res = '[';
  
    for (const value of arr) {
      if (Array.isArray(value)) {
        res = res + transformArr2Str(value);
      } else {
        res = res + value;
      }
    }
  
    res = res + ']';
  
    return res;
  }
  
  console.log(transformArr2Str([1, 2, [3, [4, 5]]]));
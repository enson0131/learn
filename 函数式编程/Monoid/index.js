/**
   Monoid = Semigroup + empty
 */

const Add = (x) => ({
  value: x,
  concat: (box) => Add(x + box.value),
});

// empty 与任何运算值结合都等于运算值本身
Add.empty = () => Add(0);

const d = Add.empty().concat(Add(1)).concat(Add(2)); // Add(3)
console.log(`d`, d.value); // 3

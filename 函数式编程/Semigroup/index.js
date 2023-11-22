const Add = (value) => ({
  value,
  concat: (box) => Add(value + box.value),
});

const a = Add(1).concat(Add(2)).concat(Add(3)); // Add(6)
const b = Add(1).concat(Add(2).concat(Add(3))); // Add(6)

console.log(`a`, a.value, `b`, b.value);

const Multi = (value) => ({
  value,
  concat: (box) => Multi(value * box.value),
});

const c = Multi(1).concat(Multi(2)).concat(Multi(3)); // Multi(6)
const d = Multi(1).concat(Multi(2).concat(Multi(3))); // Multi(6)

console.log(`c`, c.value, `d`, d.value);

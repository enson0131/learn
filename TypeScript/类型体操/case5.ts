// 数组长度做计数
// TS 是没有直接对数值进行加减乘除的计算的，但可以借助数组，通过对数字的构造和转化，最后取‘length’获取最终值

// 加法
// 1 先构造数组，在合并数组，获取 length
type BuildArr<
  Len extends number,
  Item = unknown,
  Res extends unknown[] = []
> = Res["length"] extends Len ? Res : BuildArr<Len, Item, [...Res, Item]>;

type Add<number1 extends number, number2 extends number> = [
  ...BuildArr<number1>,
  ...BuildArr<number2>
]["length"];

type AddRes = Add<13, 15>;

// 减法
// 构造数组，然后通过模式匹配，提取掉减数，剩余部分就是差值
type Subtract<
  number1 extends number,
  number2 extends number
> = BuildArr<number1> extends [...BuildArr<number2>, ...infer Rest]
  ? Rest["length"]
  : never;

type SubtractRes = Subtract<5, 3>;

// 乘法
// 乘法其实就是在加法的基础上做次数
type Multiply<
  number1 extends number,
  number2 extends number,
  Res extends unknown[] = []
> = number2 extends 0
  ? Res["length"]
  : Multiply<number1, Subtract<number2, 1>, [...Res, ...BuildArr<number1>]>;

type MultiplyRes = Multiply<5, 4>;

// 除法
// 除法就是在减法的基础上做次数
type Divide<
  number1 extends number,
  number2 extends number,
  Res extends number = number1
> = number2 extends 0
  ? Res
  : Divide<number1, Subtract<number2, 1>, Subtract<Res, number2>>;

type DivideRes = Divide<9, 3>;

// 获取字符串长度
// 数组长度可以通过 length 去取, 求字符串长度需转化成数组长度获取 length
type StrLen<
  Str extends string,
  Res extends unknown[] = []
> = Str extends `${infer First}${infer Rest}`
  ? StrLen<Rest, [...Res, First]>
  : Res["length"];

type StrLenRes = StrLen<"enson">;

// 比较俩个数A、B的大小
// 不断的放大数组，如果数组长度先到A，则B大，如果先到B，则A大
type GreaterThan<
  A extends number,
  B extends number,
  Res extends unknown[] = []
> = A extends B
  ? false
  : Res["length"] extends A
  ? false
  : Res["length"] extends B
  ? true
  : GreaterThan<A, B, [unknown, ...Res]>;

type GreaterThanRes1 = GreaterThan<1, 2>;
type GreaterThanRes2 = GreaterThan<2, 1>;

// 斐波那契数列
// 1 1 2 3 5 8 13 21
type Fibonacci<
  preArr extends unknown[],
  curArr extends unknown[],
  indexArr extends unknown[],
  num extends number
> = indexArr["length"] extends num
  ? curArr["length"]
  : Fibonacci<curArr, [...preArr, ...curArr], [...indexArr, unknown], num>;

type FibonacciRes = Fibonacci<[1], [], [], 8>;

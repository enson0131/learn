const b: unknown = 1;
const a: unknown = b; // 任何值都可以赋值给 unknown
const c: any = a;
// const d: number = a; // 不能将类型“unknown”分配给类型“number”
// const e: never = a; // 不能将类型“unknown”分配给类型“never”

// 减法
// 通过模式匹配获取剩余项
type E_Subtraction<
  number1 extends number,
  number2 extends number
> = SetArr<number1> extends [...SetArr<number2>, ...infer Rest]
  ? Rest["length"]
  : never;

// 乘法
// 乘法就是在加法的基础上做次数
type E_Multiplication<
  number1 extends number,
  number2 extends number,
  Res extends unknown[] = []
> = number2 extends 0
  ? Res["length"]
  : E_Multiplication<
      number1,
      E_Subtraction<number2, 1>,
      [...SetArr<number1>, ...Res]
    >;
type E_MultiplicationRes = E_Multiplication<2, 2>;

type SetArr<
  Num extends number,
  Element = unknown,
  Res extends unknown[] = []
> = Res["length"] extends Num ? Res : SetArr<Num, Element, [Element, ...Res]>;

// 加法
type E_Add<number1 extends number, number2 extends number> = [
  ...SetArr<number1>,
  ...SetArr<number2>
]["length"];

type E_AddRes = E_Add<1, 2>;

// 乘法就是在加法的基础上做次数
type E_Multiplication1<
  number1 extends number,
  number2 extends number
> = number2 extends 0
  ? number1
  : E_Multiplication<E_Add<number1, number1>, E_Subtraction<number2, 1>>;

// E_Add<number1, number1> 报错是因为 ['length'] 返回的不是number

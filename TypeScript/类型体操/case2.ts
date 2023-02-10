/**
 * 模式匹配主要是通过 extends 结合 infer 做模式匹配, 取得结果后返回
 */
// 模式匹配章节
type p = Promise<"guang">;
type GetValueType<T> = T extends Promise<infer Value> ? Value : never;

type GetValueResult = GetValueType<Promise<"test">>;
type GetValueResult1 = GetValueType<"test">;

// 数组相关的模式匹配
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;

type GetFirstArr<Arr extends unknown[]> = Arr extends [
  ...infer FirstArr,
  unknown
]
  ? FirstArr
  : never;

type GetLastArr<Arr extends unknown[]> = Arr extends [unknown, ...infer LastArr]
  ? LastArr
  : never;

type a = GetFirst<[1, 2, 3]>;
type b = GetLast<[1, 2, 3]>;
type c = GetFirstArr<[1, 2, 3]>;
type d = GetLastArr<[1, 2, 3]>;

// 字符串类型
type StartsWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false; // 是否是 Prefix 开头

type e = StartsWith<"enson is good", "enson">;
type f = StartsWith<"enson is good", "good">;

type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}` // 将字符串 From 替换成 To
  : Str;

type g = ReplaceStr<"enson", "s", "b">;

// Trim - 能够匹配和替换字符串，那也就能实现去掉空白字符的 Trim：
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimStrRight<Rest>
  : Str;

type h = TrimStrRight<"enson    \n">;

type TrimStrLeft<Str extends string> = Str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;

type i = TrimStrLeft<"    \n     \t enson">;
type j = TrimStrLeft<TrimStrRight<"    \n     \t enson     \n    \t">>;

// 函数
type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never; // 提取参数

type GetParametersResult = GetParameters<(a: number, b: string) => string>;

type GetReturnType<Func extends Function> = Func extends (
  ...args: unknown[]
) => infer Result
  ? Result
  : never;

type GetReturnTypeResult = GetReturnType<(a: number, b: string) => boolean>;

// 构造器 - 可以用 interface 声明
interface Person {
  name: string;
}

interface PersonConstructor {
  // 声明一个构造器
  new (name: string): Person;
}

type GetInstanceType<ConstructorType extends new (...args: any) => any> =
  ConstructorType extends new (...args: any) => infer InstanceType
    ? InstanceType
    : never;

type GetInstanceTypeRes = GetInstanceType<PersonConstructor>;

type GetConstructorParameters<
  ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: infer Param) => any ? Param : never;

type GetConstructorParametersRes = GetConstructorParameters<PersonConstructor>;

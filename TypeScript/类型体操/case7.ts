// 特殊特性

// 判断类型是否是 any
type IsAny<T> = "enson" extends 1 & T ? true : false;
type IsAnyRes1 = IsAny<any>;
type IsAnyRes2 = IsAny<number>;
type IsAnyRes3 = IsAny<string>;
type a1 = never & any; // never 和 any 类型交叉取 never

// 判断类型是否相等
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type IsEqualRes1 = IsEqual<number, string>;
type IsEqualRes2 = IsEqual<number, number>;
type IsEqualRes3 = IsEqual<number, any>;
type IsEqualRes4 = IsEqual<string, any>; // 因为 any 可以是任何类型，任何类型也都是 any，所以当这样写判断不出 any 类型来。

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

type IsEqual2Res = IsEqual2<string, any>; // 对于 hask 的写法， TS 做了特殊处理

// IsUnion - 判断是否是联合类型
// 联合类型遇到 extends 条件判断会分布式传入
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : false;
type IsUnionRes1 = IsUnion<1 | 2>;
type IsUnionRes2 = IsUnion<1>;

// IsNever - 判断类型是否是 never
type TestIsNever<T> = T extends number ? 1 : 2;
type TestIsNeverRes = TestIsNever<never>; // never 如果在条件类型的左边会直接返回 never

type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverRes = IsNever<never>;
type IsNeverRes1 = IsNever<1>;

type TestAnyType = any extends 1 ? 2 : 3;

type IsTuple<T> = T extends readonly [...infer Rest]
  ? IsEqual<number, Rest["length"]> extends false
    ? true
    : false
  : false;

type IsTupleRes1 = IsTuple<[1, 2, 3]>;
type IsTupleRes2 = IsTuple<number[]>;

// 逆变: 将联合类型转化为交叉类型
// 利用模式匹配函数参数的逆变特性将联合类型改成交叉类型
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : 2;

type UnionToIntersectionRes = UnionToIntersection<{ guang: 1 } | { dong: 2 }>;
type UnionToIntersectionRes1 = UnionToIntersection<"1" | "2">; // 因为 “1” 和 “2”的交叉类型是 never

// GetOptional - 获取对象类型中的可选属性
// 通过 {} extends Pick<Obj, key> 可以判断 key 是否是可选类型
type GetOptional<T extends Record<string, any>> = {
  [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K];
};

// 获取对象的必要属性
type GetRequired<T extends Record<string, any>> = {
  [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
};

type TestObj = {
  name: string;
  age?: number;
};

type GetOptionalRes = GetOptional<TestObj>;
type GetRequiredRes = GetRequired<TestObj>;

type Dong = {
  // 索引类型可能有索引，也可能有可索引签名。
  [key: string]: any; // 可索引签名
  sleep(): void; // 索引
};

// 索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};

type RemoveIndexSignatureRes = RemoveIndexSignature<Dong>;

// keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
class Dong1 {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = "dong";
    this.age = 20;
    this.hobbies = ["sleep", "eat"];
  }
}

type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};

type ClassPublicPropsRes = ClassPublicProps<Dong1>;

type TestAny = any & never;

// type GetParam<T extends string, Res extends object = {}> = T extends `${infer FirstKey}&${infer FristValue}${infer Rest}` ? GetParam<Rest, {
//   [K in keyof Res]: Res[K],
//   [FirstKey]: FristValue
// }> : Res;

type GetReturnType<Func extends Function> = Func extends (
  ...args: any[] // 这里不能是 unkown[] 👉 [unkown、unkown]
) => infer ReturnType
  ? ReturnType
  : never;
type GetReturnTypeRes = GetReturnType<(a: string) => string>;

// ParseParam 的实现就是提取和构造：
// ParseParam 将 a = 1 提取构造成 {a: 1}
type ParseParam<Str extends string> = Str extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value;
    }
  : {};

type ParseParamRes = ParseParam<"a=1">;

type MergeParam<
  oneParam extends Record<string, any>,
  otherParam extends Record<string, any>
> = {
  [Key in keyof oneParam | keyof otherParam]: Key extends keyof oneParam
    ? Key extends keyof otherParam
      ? MergeValue<oneParam[Key], otherParam[Key]>
      : oneParam[Key]
    : Key extends keyof otherParam
    ? otherParam[Key]
    : never;
};

// type mergeParamRes = MergeParam<{a:1}, {a:2, b:3}>

type MergeValue<value1, value2> = value1 extends value2
  ? value2
  : value1 extends unknown[]
  ? value2 extends unknown[]
    ? [...value1, ...value2]
    : [...value1, value2]
  : value2 extends unknown[]
  ? [value1, ...value2]
  : [value1, value2];

// type mergeValueRes = mergeValue<[1, 2, 3], 2>

/**
 * 将 a=1&b=2&c=3 转化为 {a:1, b:2, c:3}
 * 思路
 * 模式匹配分割成 a = 1, b = 2 c = 3
 * 构成对象 {a:1, b: 2, c: 3}
 * 通过迭代合并key值
 * 最后通过递归的形式，实现不断切割和合并
 */
type ParseQueryString<Str extends string> =
  Str extends `${infer FristValue}&${infer Rest}`
    ? MergeParam<ParseParam<FristValue>, ParseQueryString<Rest>>
    : ParseParam<Str>;
type ParseQueryStringRes = ParseQueryString<"a=1&b=2&c=3">;

// 判断元素是否存在于数组中
type HasExietArr<Arr extends any[], T extends any> = Arr extends [
  infer FirstValue,
  ...infer Rest
]
  ? T extends FirstValue
    ? true
    : HasExietArr<Rest, T>
  : false;

type HasExietArrRes = HasExietArr<[1, 2, 3], 4>;

type OnlyArr<Arr extends any[], Res extends any[] = []> = Arr extends [
  infer FirstValue,
  ...infer Rest
]
  ? HasExietArr<Res, FirstValue> extends true
    ? OnlyArr<Rest, Res>
    : OnlyArr<Rest, [...Res, FirstValue]>
  : Res;

type OnlyArrRes = OnlyArr<[1, 2, 3, 3, 4, 5, 6, 7]>;

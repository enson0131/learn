// 递归复用做循环
// Promise 的递归复用
// Promise<Promise<Promise<Record<string, any>>>>; -> 提取 Record<string, any>
type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer Res
>
  ? Res extends Promise<unknown>
    ? DeepPromiseValueType<Res>
    : Res
  : P;

type DeepPromiseValueTypeRes = DeepPromiseValueType<
  Promise<Promise<Promise<Record<string, any>>>>
>;

// 简化
type DeepPromiseValueType2<T> = T extends Promise<infer Res>
  ? DeepPromiseValueType2<Res>
  : T;

type DeepPromiseValueType2Res = DeepPromiseValueType2<
  Promise<Promise<Promise<Record<string, any>>>>
>;

// 数组相关递归
// 反转数组
type arr = [1, 2, 3, 4, 5];
type ReverseArr<T extends Array<unknown>> = T extends [
  infer First,
  ...infer Rest
]
  ? [...ReverseArr<Rest>, First]
  : T;
type ReverseArrRes = ReverseArr<arr>;

// 查找 4 是否存在
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false); // 判断类型是否相等

type Includes<T extends unknown[], Item> = T extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, Item> extends true
    ? true
    : Includes<Rest, Item>
  : false;

type IncludesRes = Includes<arr, 4>;

// 删除元素
type RemoveItem<
  Arr extends unknown[],
  Item,
  Res extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Res>
    : RemoveItem<Rest, Item, [...Res, First]>
  : Res;

type RemoveItemRes = RemoveItem<arr, 4>;

// 构建数组
type BuildArray<
  L extends number,
  Item = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends L ? Arr : BuildArray<L, Item, [...Arr, Item]>;

type BuildArrayRes = BuildArray<5>;

// 字符串相关
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer First}${From}${infer Last}`
  ? `${First}${To}${ReplaceAll<Last, From, To>}`
  : Str;
type ReplaceAllRes = ReplaceAll<"ensonss", "s", "b">; // 将所有的s 替换成 b

// 将字符串的每一个字符转化为联合类型
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;

type StringToUnionRes = StringToUnion<"hello">;

// 字符串反转
type ReverseStr<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : Str;

type ReverseStrRes = ReverseStr<"abcd">;

// 对象相关
type obj = {
  a: {
    b: {
      c: {
        f: () => "dong";
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};
type DeepReadonly<Obj extends Record<string, any>> =
  // Obj extends any ? 因为 ts 的类型只有被用到的时候才会做计算, 加上这句就会触发内层的计算了
  {
    readonly [Key in keyof Obj]: Obj[Key] extends object
      ? Obj[Key] extends Function // 排除是函数的情况
        ? Obj[Key]
        : DeepReadonly<Obj[Key]>
      : Obj[Key];
  };
//   : never;

type DeepReadonlyRes = DeepReadonly<obj>;

// 通过重新构造产生新的类型

// 构造一个新的数组或者元组
type tuple = [1, 2, 3]; // 如果想给该元素新增多一种类型，需要重新构造，因为类型变量不支持修改
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type PushResult = Push<tuple, 4>;

type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];
type UnshiftResult = Unshift<[1, 2, 3], 0>;

type tuple1 = [1, 2, 3];
type tuple2 = [4, 5, 6];

type Zip<One extends unknown[], Two extends unknown[]> = [...One, ...Two];
type ZipRes = Zip<tuple1, tuple2>;

type ConcatEle<One extends unknown[], Two extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneOthers
]
  ? Two extends [infer TwoFirst, ...infer TwoOther]
    ? [[OneFirst, TwoFirst], ...ConcatEle<OneOthers, TwoOther>]
    : []
  : [];

type ConcatEleRes = ConcatEle<tuple1, tuple2>;

// 构造字符串$
// enson -> Enson
type CapitalizeStr<Str extends string> = // 首字母大写
  Str extends `${infer FirstStr}${infer OtherStr}`
    ? `${Uppercase<FirstStr>}${OtherStr}`
    : Str;
type CapitalizeStrRes = CapitalizeStr<"enson">;

// 将 en_s_on -> enson
type CamelCase<Str extends string> =
  Str extends `${infer First}_${infer Middle}${infer Last}`
    ? `${First}${Middle}${CamelCase<Last>}`
    : Str;

type CamelCaseRes = CamelCase<"en_s_on">;

// 删除字符串中的某个子串
type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer First}${SubStr}${infer Last}`
  ? `${First}${Last}`
  : Str;

type DropSubStrRes = DropSubStr<"enson", "e">;
type DropSubStrRes1 = DropSubStr<"enson", "s">;

// 重新构造函数
type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;

interface FuncType {
  (name: string, age: number): void;
}
type AppendArgumentRes = AppendArgument<FuncType, true>;

// 构造索引类型
// 1 构造新的索引类型根据值进行过滤
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};

type FilterByValueTypeRes = FilterByValueType<
  // 只取值为 number 的健值对
  {
    a: 1;
    b: "2";
  },
  number
>;

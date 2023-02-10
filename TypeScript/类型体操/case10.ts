//  可以通过字符串的创建实现字符串的加法（拼接）
// type KebabCaseToCamelCase<T extends string, R> = T extends `${infer F}-${infer Rest}` ? KebabCaseToCamelCase<Rest, >  : T
type KebabCaseToCamelCase<T extends string> =
  T extends `${infer F}-${infer Rest}`
    ? `${F}${KebabCaseToCamelCase<Capitalize<Rest>>}`
    : T;

type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<"case-enson-res">; // 将连字符改成驼峰

// 根据字母大小写进行分割
type CamelCaseToKebabCase<T extends string> = T extends `${infer F}${infer R}`
  ? F extends Lowercase<F>
    ? `${F}${CamelCaseToKebabCase<R>}`
    : `-${Lowercase<F>}${CamelCaseToKebabCase<R>}`
  : T;

type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<"caseEnsonRes">; // 驼峰转连字符

// 对数组进行分组 [1, 2, 3, 4, 5] 👉 [[1, 2] [3, 4], [5]]
// 通过模式匹配 + 构造数组对数组进行分组
type Chunk<
  Arr extends unknown[], // 源数组
  ItemLen extends number, //
  CurItem extends unknown[] = [],
  Res extends unknown[] = []
> = Arr extends [infer F, ...infer Rest]
  ? CurItem["length"] extends ItemLen
    ? Chunk<Rest, ItemLen, [F], [...Res, CurItem]>
    : Chunk<Rest, ItemLen, [...CurItem, F], Res>
  : [...Res, CurItem]; // 这步没有问题，他是等 [...CurItem, F] 传过去后，发现 Arr 不匹配，最后将 CurItem 放到了 [...Res, CurItem] 里面

type chunkRes = Chunk<[1, 2, 3, 4, 5, 6], 2>;

// 将数组转化为嵌套对象
type TupleToNestedObject<Tuple extends unknown[], Value> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? {
      [Key in First as Key extends keyof any // keyof any 👉 因为比如 null、undefined 等类型是不能作为索引类型的 key 的，就需要做下过滤，如果是这些类型，就返回 never，否则返回当前 Key。而 keyof any 就是取索引类型的key值
        ? Key
        : never]: TupleToNestedObject<Rest, Value>;
    }
  : Value;

type TupleToNestedObjectRes = TupleToNestedObject<["a", "b", "c"], "xxx">;

// 对象部分值可选部分值不可选
interface Dong {
  name: string;
  age: number;
  sex: string;
}

type PartialObjectPropByKeys<
  Obj extends Record<string, any>,
  Key extends keyof any
> = Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>; // Pick第二个参数是联合类型，但是在这里的Key的联合类型具有分布式的特性，此时是单独某个值，因此需要通过 Extract 转化为联合类型

type PartialObjectPropByKeysRes = PartialObjectPropByKeys<Dong, "name" | "age">; // 这里没有显示 TS 没有计算，需要计算后才会显示
type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};
type PartialObjectPropByKeysResCopy = Copy<PartialObjectPropByKeysRes>;

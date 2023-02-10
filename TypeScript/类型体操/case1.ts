import { type } from "os";

type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
    ? {
        [K in Key]: Value;
      }
    : {};

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type MergeParams<
  OneParam extends Record<string, any>,
  OtherParam extends Record<string, any>
> = {
  [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};
type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

type res = ParseQueryString<"a=1&b=2&c=3">;

const a: any = 1;
// const b: never = a; any 不能赋值给 never

type Union = 1 | 2 | 3;

// 类型推断 infer
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
  ? T
  : never;

type inferRes = First<[1, 2, 3]>;

// 类型映射
enum Shape {
  circle,
  rect,
}

type c = keyof typeof Shape; // 获取枚举类型的 key
type d = `${Shape}`; // 获取枚举类型的 value

type ShapeOperation = {
  [Key in keyof typeof Shape as `${Key & string}`]: () => void;
};

const test: ShapeOperation = {
  circle: () => {},
  rect: () => {},
};

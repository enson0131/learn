type a = Exclude<"a" | "b" | "c", "a">;

// 逆变 - 将联合类型转化为交叉类型
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

// TODO 做逆变的时候，参数好像只能是对象（对象的key不一样）以及函数
type UnionToIntersectionRes = UnionToIntersection<
  (() => 1) | (() => 2) | (() => 3)
>;

// 任何类型都可以赋值给 unknow, 但 unknow 只能赋值给 unkown 或者 any
let a12: unknown = 1;
let b: any = a12;
const c: unknown = a12;
// const d: number = a12;

// join('-')("a", "b", "c") 👉 a-b-c
// Delimiter 👉 连接符

declare function join<Delimiter extends string>(
  delimiter: Delimiter
): <Items extends string[]>(...path: Items) => JoinType<Items, Delimiter>;

type JoinType<
  Items extends any,
  Delimiter extends string,
  Res extends string = ""
> = Items extends [infer First, ...infer Rest]
  ? JoinType<Rest, Delimiter, `${Res}${Delimiter}${First & string}`>
  : RemoveFirstDelimiter<Res>;

type RemoveFirstDelimiter<T extends string> =
  T extends `${infer _}${infer Rest}` ? Rest : T;

let res = join("-")("a", "b", "c"); // 这样居然可以作为类型？？ 骚操作

type Camelize<Str extends string> = Str extends `${infer First}-${infer Rest}`
  ? `${First}${Camelize<Capitalize<Rest>>}`
  : Str;

type CamelizeArr<Arr> = Arr extends [infer First, ...infer Rest]
  ? [DeepCamelize<First>, CamelizeArr<Rest>]
  : [];

type DeepCamelize<Obj extends any> = Obj extends Record<string, any>
  ? Obj extends unknown[]
    ? CamelizeArr<Obj>
    : {
        [Key in keyof Obj as `${Camelize<Key & string>}`]: DeepCamelize<
          Obj[Key]
        >;
      }
  : Obj;

type DeepCamelizeRes = DeepCamelize<{
  a: 1;
  "b-c": 2;
  "hello-world": {
    "c-d": {
      "d-e": 3;
    };
  };
}>;

// 获取索性类型的所有 key
type AllKeyPath<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Key extends string // Key extends string 这步很关键
    ? Obj[Key] extends Record<string, any>
      ? Key | `${Key}.${AllKeyPath<Obj[Key]>}`
      : Key
    : Obj[Key];
}[keyof Obj];

type AllKeyPathRes = AllKeyPath<{
  a: {
    b: {
      b1: string;
      b2: string;
    };
    c: {
      c1: string;
      c2: string;
    };
  };
}>;

/**
 * Defaultize 的作用如下:
 * A 存在的属性必选
 * B 存在的属性可选
 */
type A = {
  aaa: "111";
  bbb: "222";
};
type B = {
  bbb: "222";
  ccc: "333";
};
type Defaultize<A, B> = A & Partial<B>;
type DefaultizeRes = Copy<Defaultize<A, B>>;

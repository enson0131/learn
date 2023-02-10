// 利用联合类型的条件分布式判断
// A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入
// [B] extends [A] 这样写可以通过加中括号避免 B 也变成联合类型
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type bemResult = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;

type TestBem<Element extends string[]> = `${Element[number]}`;
type TestBemRes = TestBem<["a", "b"]>; // 字符串类型中遇到联合类型的时候，会每个元素单独传入计算

// 排列组合
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type CombinationAll<A extends string, B extends string = A> = A extends A
  ? Combination<A, CombinationAll<Exclude<B, A>>>
  : never;

type CombinationAllRes = CombinationAll<"a" | "b" | "c">;

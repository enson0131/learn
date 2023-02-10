// Typescript 内置的高级类型
// Parameters 提取函数的参数类型
type ParametersRes = Parameters<(a: number, b: string) => any>;

// Parameters 原理
type Parameters1<T extends (...args: any) => any> = T extends (
  ...args: infer Rest
) => any
  ? Rest
  : never;
type Parameters1Res = Parameters1<(a: number, b: string) => any>;

// ReturnType 提取函数的返回值类型
type ReturnTypeRes = ReturnType<() => number>;

// ReturnType 原理
type ReturnType1<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
type ReturnType1Res = ReturnType1<() => number>;

// ConstructorParameters 提取构造函数的参数类型
type Person = {
  name: "enson";
};
interface PersonCoustructor {
  new (name: string): Person;
}

type ConstructorParametersRes = ConstructorParameters<PersonCoustructor>;

// ConstructorParameters原理
// abstract 代表不能直接被实例
type ConstructorParameters1<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

type ConstructorParameters1Res = ConstructorParameters1<PersonCoustructor>;

// InstanceType 提取构造函数的返回值
type InstanceTypeRes = InstanceType<PersonCoustructor>;

// 原理
type InstanceType1<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never;

type InstanceType1Res = InstanceType1<PersonCoustructor>;

// ThisParameterType - 获取函数的this类型
function hello(this: Person) {
  return this.name;
}

type ThisParameterTypeRes = ThisParameterType<typeof hello>; // typeof 👉 从变量中获取类型

// 原理
type ThisParameterType1<T> = T extends (this: infer R, ...args: any[]) => any
  ? R
  : never;
type ThisParameterType1Res = ThisParameterType1<typeof hello>;

// OmitThisParameter 将this剔除
type OmitThisParameterRes = OmitThisParameter<typeof hello>;
// 原理
type OmitThisParameter1<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer Rest) => infer R
  ? (...args: Rest) => R
  : T;
type OmitThisParameter1Res = OmitThisParameter1<typeof hello>;

// Exclude - 取联合类型的差集
type ExcludeRes = Exclude<"a" | "b" | "c", "a">;

// 原理
type Exclude1<T, U> = T extends U ? never : T;
type Exclude1Res = Exclude1<"a" | "b" | "c", "a">;

// Extract - 取联合类型的交集
type ExtractRes = Extract<"a" | "b" | "c", "a">;

// 原理
type Extract1<T, U> = T extends U ? T : never;
type Extract1Res = Extract1<"a" | "b" | "c", "a">;

// Pick - 取出索引类型的部分构造新的索引类型
type PickRes = Pick<{ a: 1; b: 2 }, "a">;

// 原理
type Pick1<T, U extends keyof T> = {
  [Key in U]: T[U];
};
type Pick1Res = Pick1<{ a: 1; b: 2 }, "a">;

// Omit - 去掉索引类型的部分构造新的索引类型
type OmitRes = Omit<{ a: 1; b: 2 }, "a">;
type Omit1<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>; // 原理
type Omit1Res = Omit1<{ a: 1; b: 2 }, "a">;

// Awaited - 获取 Promise 的 returnType
type AwaitedRes = Awaited<Promise<Promise<string>>>;

// NonNullable - 判断是否传入的是非空类型
type NonNullableRes1 = NonNullable<"enson">;
type NonNullableRes2 = NonNullable<null>;

// 原理
type NonNullable1<T> = T extends null | undefined ? never : T;
type NonNullableRes3 = NonNullable1<"enson">;
type NonNullableRes4 = NonNullable1<null>;

// Uppercase - 大写
type UppercaseRes = Uppercase<"enson">;

// Lowercase - 小写
type LowercaseRes = Lowercase<"ENSON">;

// Capitalize
type CapitalizeRes = Capitalize<"enson">;

// Uncapitalize - 去除首字母大写
type UncapitalizeRes = Uncapitalize<"Enson">;

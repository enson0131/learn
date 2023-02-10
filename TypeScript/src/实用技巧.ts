// typeof 可以推出类型
let _p1 = {
    name: "hello",
    age: 10
}

type People = typeof _p1; // 通过typeof获取类型

function getName(p: People) : string {
    return p.name;
}

// keyof可以获取对象的所有key值
interface Persion2 {
    name: string;
    age: number;
    gender: "male" | "female";
}

type PersionKey = keyof Persion2;

function getValueByKey(p: Persion2, key: PersionKey) {
    return p[key];
}


// 索引访问操作符
type x = Persion2['name']; // 通过索引获取对应的类型，同样也是用于menu, menu可以通过value获取key
const s : x = '1';

// in
type PartPersion = { // 将Persion2所有类型都变成可选的
    [key in keyof Persion2] ?: Persion2[key]
}

// 内置工具
// 1 Exclude<T, U> => 将T可分配的类型排查U
type E = Exclude<string | number, string >;
const e: E = 1;

// 2 Extract<T, U> => 从 T 可分配的类型中提取U
type Ext = Extract<string | number, string>;
const ext: Ext = "1";

// 3 NonNullable<T> => 从T中排除null和undefined
type T0 = NonNullable<string | number | undefined>;
const non: T0 = "throw";


// 5 Parameters 获取函数参数的类型
interface Person {
    name: string;
    age: number;
    gender ?: "male" | "female"
}

// 7 Required 可选变必须
let q: Required<Person> = {
    name: "hello",
    age: 1,
    gender: "male"
}

// 8 只读 Readonly
let p: Readonly<Person> = {
    name: "hello",
    age: 1
}
// p.age = 1; // error

// 10 Record

// 11 Omit<K, T> 基于已经声明的类型进行属性剔除获得新类型
type User = {
    id: string;
    name: string;
    email: string;
}

type UserWithoutEmail = Omit<User, "email">;

interface Person {
    name: string;
    age: number;
}

type PersonProps = keyof Person;

const PersonObj = {
    name: 'jack',
    age: 20
}

type PersionObjProps = keyof typeof PersonObj; // 获取对象的属性作为类型
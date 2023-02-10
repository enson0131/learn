console.log(`b2.js`)
export const a = () => {
    console.log(`箭头函数2`)
}
export const p = new Promise(resolve => {
    resolve(1)
}).then((v) => {
    console.log(`v`, v)
});
export let b = 1;
export const c = 3;
console.log(a, b, c, p)


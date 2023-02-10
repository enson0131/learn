import 'babel-polyfill';

const a = (a, b) => {
    return a+b
}


const b = new Promise((resolve) => {
    a(1, 2);
    resolve();
})
console.log(a);

export default b;

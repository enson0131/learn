/**
    作者：runnerdancer
    链接：https://juejin.cn/post/7309775437942718474
    来源：稀土掘金
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
process.nextTick(() => {
  console.log("next tick1");
});

process.nextTick(() => {
  console.log("next tick2");
  process.nextTick(() => {
    console.log("next tick3");
  });
});

process.nextTick(() => {
  console.log("next tick4");
});

Promise.resolve().then(() => {
  console.log("promise 1");
});

Promise.resolve().then(() => {
  console.log("promise 2");
  process.nextTick(() => {
    console.log("next tick5");
  });
});

Promise.resolve().then(() => {
  console.log("promise 3");
});

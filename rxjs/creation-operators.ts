import { empty, from, fromEvent, interval, of, range } from "rxjs";
import { repeat, delay } from "rxjs/operators";
// const observableInterval = interval(1000 /* number of milliseconds */);

// observableInterval.subscribe((data) => {
//   console.log(`interval: `, data);
// });

const observableEmpty = empty();
// observableEmpty.subscribe((data) => {
//   console.log(`observableEmpty`, data); 订阅不了
// });

const observableFrom = from([1, 2, 3]);
// observableFrom.subscribe((data) => {
//   console.log(`observableFrom: `, data);
// });

// const observableFromEvent = fromEvent(document, "click");
// observableFromEvent.subscribe((data) => {
//   console.log(`observableFromEvent: `, data);
// });

// const observableFromPromise = from(
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000))
// );

// observableFromPromise.subscribe((data) => {
//   console.log(`observableFromPromise`, data);
// });

const observableOf = of(1, 2, 3);
// observableOf.subscribe((data) => {
//   console.log(`observableOf`, data); // 依次输出 1、2、3
// });

const observableRepeat = of(1, 2, 3).pipe(repeat(3));

observableRepeat.subscribe((data) => {
  console.log(`observableRepeat`, data); // 依次输出 1、2、3
});

const observableRange = range(1, 4);
observableRange.subscribe((data) => {
  console.log(`observableRange: `, data);
});

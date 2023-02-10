import { interval, fromEvent, of } from "rxjs";
import {
  buffer,
  concatMap,
  delay,
  map,
  mapTo,
  mergeMap,
  pluck,
  scan,
  switchMap,
  take,
} from "rxjs/operators";

// const myInterval = interval(1000);
// const bufferBy = fromEvent(document, "click");

// const myBufferedInterval = myInterval.pipe(buffer(bufferBy));

// const subject = myBufferedInterval.subscribe((data: any) => {
//   console.log(`Buffered values: `, data);
// });

// 发出延迟值
// const sourceConcatMap = of(2000, 1000);
// // 将内部 observable 映射成 source，当前一个完成时发出结果后订阅下一个
// const resultConcatMap = sourceConcatMap.pipe(
//   concatMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
// );
// // 输出: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
// resultConcatMap.subscribe((val) => console.log(`With concatMap: ${val}`));

// const sourceMap = interval(1000).pipe(take(3));
// const resultMap = sourceMap.pipe(map((x) => x * 2));
// resultMap.subscribe((x) => {
//   console.log(`resultMap: `, x); // 每隔 1 s 依次输出 0/2/4
// });

// const sourceMapTo = interval(1000).pipe(take(3));
// const resultMapTo = sourceMapTo.pipe(mapTo("Hello world"));
// resultMapTo.subscribe((data) => {
//   console.log(`resultMapTo: `, data);
// });

// const sourceScan = of(1, 2, 3);
// const exampleScan = sourceScan.pipe(scan((acc, curr) => acc + curr, 0));
// exampleScan.subscribe((val) => {
//   console.log(`exampleScan: `, val); // 依次输出 1、3、6
// });

// const source = of(2000, 1000);
// const exampleConcatMap1 = source.pipe(
//   concatMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
// );
// exampleConcatMap1.subscribe((val) => {
//   console.log(`With concatMap: ${val}`);
// });

// const mergeMapExample = source.pipe(
//   delay(5000), // 确保比 concatMap 晚执行
//   mergeMap((val) => of(`Delayed by: ${val}ms`).pipe(delay(val)))
// );
// mergeMapExample.subscribe((val) => {
//   console.log(`With mergeMap: ${val}`);
// });

const btn = document.createElement("button");
btn.innerText = "try try";
document.body.append(btn);
const sourceSwithMap = fromEvent(btn, "click");
const resultSwithMap = sourceSwithMap.pipe(
  switchMap(() => interval(1000).pipe(take(3)))
);
resultSwithMap.subscribe((data) => {
  console.log(`resultSwithMap `, data);
});

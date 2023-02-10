import {
  map,
  concatAll,
  take,
  delay,
  mergeAll,
  startWith,
} from "rxjs/operators";
import { of, interval, zip } from "rxjs";

// const source = interval(2000);
// const example = source.pipe(
//   map((val) => of(val + 10))
//   // concatAll() // 合并内部的 observable 的值
// );
// example.subscribe((val) => {
//   console.log(`val: `, val);
// });

// const s1 = interval(1000).pipe(take(3));
// const s2 = interval(1000).pipe(take(5));
// const result = zip(s1, s2);
// result.subscribe((data) => {
//   console.log(`data: `, data);
// });

const sourceStartWith = interval(1000).pipe(take(3));
const resStartWith = sourceStartWith.pipe(startWith(666));
resStartWith.subscribe((data) => {
  console.log(`data => `, data);
});

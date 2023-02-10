import { EMPTY, of, Subject } from "rxjs";
import {
  defaultIfEmpty,
  every,
  find,
  findIndex,
  isEmpty,
} from "rxjs/operators";

// of(1, 2, 3, 4, 5)
//   .pipe(every((val: number) => val % 2 === 0))
//   .subscribe((val) => {
//     console.log(`val`, val); // false
//   });

// of(2, 4, 6, 8)
//   .pipe(every((val: number) => val % 2 === 0))
//   .subscribe((val) => {
//     console.log(`val`, val); // true
//   });

// EMPTY.pipe(defaultIfEmpty("defaultValue")).subscribe((val) => {
//   console.log(val);
// });

// const source = new Subject<string>();
// const result = source.pipe(isEmpty());

// source.subscribe((x) => console.log(x));
// result.subscribe((x) => console.log(x));

// source.next("a");
// source.next("b");
// source.next("c");
// source.complete();

of(1, 5, 10)
  .pipe(findIndex((val: number) => val % 5 === 0))
  .subscribe((val) => {
    console.log(`find ===>`, val); // 输出 1
  });

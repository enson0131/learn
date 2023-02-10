import { from, interval } from "rxjs";
import {
  debounceTime,
  distinct,
  filter,
  skip,
  take,
  throttleTime,
} from "rxjs/operators";

// interval(1000)
//   .pipe(take(3))
//   .subscribe((data) => {
//     console.log(`data`, data);
//   });

// from([1, 2, 3, 4, 5])
//   .pipe(skip(2))
//   .subscribe((data) => {
//     console.log(`skip`, data);
//   });

// from([1, 2, 3, 4, 5])
//   .pipe(filter((x) => x > 3))
//   .subscribe((data) => {
//     console.log(`filter`, data);
//   });

// from([1, 2, 2, 3, 3, 4])
//   .pipe(distinct())
//   .subscribe((val) => {
//     console.log("distinct", val);
//   });

// interval(1000)
//   .pipe(take(3), debounceTime(2000))
//   .subscribe((data) => {
//     console.log(`debounceTime`, data); // 第 5 秒的时候发出值 2
//   });

interval(1000)
  .pipe(take(3), throttleTime(2000))
  .subscribe((data) => {
    console.log(`throttleTime`, data);
  });

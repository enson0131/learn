import { interval, of, throwError, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  mergeMap,
  retry,
  retryWhen,
  tap,
} from "rxjs/operators";

// const sourceError = throwError("This is an error!");
// const exampleError = sourceError.pipe(
//   catchError((val) => of(`I caught: ${val}`))
// );
// exampleError.subscribe((val) => {
//   console.log(`exampleError`, val);
// });

// const sourceRetry = interval(1000);
// const exampleRetry = sourceRetry.pipe(
//   mergeMap((val) => {
//     if (val > 5) {
//       return throwError("Error!");
//     }

//     return of(val);
//   }),
//   retry(2)
// );

// exampleRetry.subscribe({
//   next: (val) => console.log(val),
//   error: (val) => console.log(`get Error: ${val}`),
// });

const source = interval(1000);
const example = source.pipe(
  map((val) => {
    if (val > 5) {
      throw val;
    }
    return val;
  }),
  retryWhen((errors) =>
    errors.pipe(
      tap((val) => console.log(`Error: ${val}`)),
      // 5秒后重启
      delayWhen((val) => timer(val * 1000))
    )
  )
);

example.subscribe((val) => console.log(val));

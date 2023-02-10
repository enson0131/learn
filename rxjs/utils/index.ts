import { interval, of } from "rxjs";
import {
  catchError,
  concatMap,
  delay,
  finalize,
  take,
  timeout,
  toArray,
} from "rxjs/operators";

// of(5)
//   .toPromise()
//   .then((data) => {
//     console.log(`toPromise`, data);
//   });

// of(2)
//   .pipe(delay(2000))
//   .subscribe((data) => {
//     console.log(`延迟 2s 输出`, data);
//   });

// interval(500)
//   .pipe(take(5), toArray())
//   .subscribe((data) => {
//     console.log(`toArray`, data);
//   });

function makeRequest(time: number) {
  return of("Request Complete!").pipe(delay(time));
}

of(4000, 3000, 2000)
  .pipe(
    concatMap((time) =>
      makeRequest(time).pipe(
        timeout(2500),
        catchError((err) => of(`Request Error ${err}`))
      )
    ),
    finalize(() => {
      console.log(`finalize`);
    })
  )
  .subscribe((val) => {
    console.log(val);
  });

import {
  ConnectableObservable,
  interval,
  range,
  Subject,
  Subscription,
} from "rxjs";
import { multicast, take } from "rxjs/operators";

// const source$ = range(5);
// // 先输出A: 0...再输出B: 0... 👉 单播，先输完 A 相关的, 在输出 B 相关的
// source$.subscribe((value) => console.log("A: " + value));
// source$.subscribe((value) => console.log("B: " + value));

// const subject$ = new Subject();
// subject$.subscribe((value) => console.log("subject - A: " + value));
// subject$.subscribe((value) => console.log("subject - B: " + value));
// source$.subscribe(subject$); // 输出A: 0 B: 0 A: 1 B: 1... 👉 多播， A、B交替输出

const source = interval(500).pipe(take(5));
const multicasted = source.pipe(
  multicast(new Subject())
) as ConnectableObservable<number>;

const subscriptionA = multicasted.subscribe((v) => console.log("A: " + v));
const subscriptionB = multicasted.subscribe((v) => console.log("B: " + v));
const connect = multicasted.connect();

setTimeout(() => {
  subscriptionA.unsubscribe();
  subscriptionB.unsubscribe();
  connect.unsubscribe();
});

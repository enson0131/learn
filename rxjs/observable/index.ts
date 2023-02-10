import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  setTimeout(() => {
    subscriber.next(5);
  });
});

console.log("start");
observable.subscribe((val) => {
  console.log(`observable, `, val);
});
console.log("end");

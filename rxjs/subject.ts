/*
Observable - 可观察的事件, 是一个可调用的未来值或事件的集合
Observer - 观察者，可以通过 Observer 观察 Observable 的事件
Subscription - 订阅事件， 代表正在执行的 Observable/ Observer 的个体，可用来取消订阅
*/

import { Observer, Observable, Subject } from "rxjs";

const observable = Observable.create(
  (observer: { next: (arg0: number) => void }) => {
    observer.next(Math.random());
  }
);

// 订阅者1
observable.subscribe((data: any) => {
  // 每当调用一次 observable.subscribe 就会有一个新的 Observable 产生, 即俩次的data是不一样的
  // 因为 Observable 在设计上就是单播
  console.log(`data1`, data);
});

// 订阅者2
observable.subscribe((data: any) => {
  console.log(`data2`, data);
});

// Subject 的设计上是多播，当我们订阅Subject时，他只会在现有的观察者列表中多注册一个新的观察者
const subject = new Subject();

// subject.next(400); // 写在这儿不会触发

subject.subscribe((data) => {
  // data3/data4的值是一样的
  console.log(`data3`, data);
});

subject.subscribe((data) => {
  console.log(`data4`, data);
});

// subject.next(Math.random());

// subject.next(500); // 写在这儿会触发

// 借助 Subject 将 Observable 转化为多播
observable.subscribe(subject);

// 结论
// 如果想 Observable 的每个订阅者都获取相同的数据，应该使用 Subject 替代 Observable

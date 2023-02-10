/*
BehaviorSubject - 只要订阅了BehaviorSubject, BehaviorSubject会直接返回给订阅者当前存储的值
ReplaySubject - 
AsyncSubject -
*/

import { BehaviorSubject, ReplaySubject, AsyncSubject } from "rxjs";

// ---------------------------BehaviorSubject start------------------------------------------------

const subject = new BehaviorSubject(50); // 构造函数传入的 random 后面都是会订阅到的

subject.subscribe((data) => {
  console.log("Subject A", data);
});

subject.next(100); // BehaviorSubject

subject.subscribe((data) => {
  // 只要订阅了BehaviorSubject, BehaviorSubject会直接返回给订阅者当前存储的值
  console.log("Subject B", data);
});

subject.next(200);

console.log(subject.value); // 获取上一次的广播的值

// ---------------------------BehaviorSubject end--------------------------------------------------

// ---------------------------ReplaySubject start--------------------------------------------------

const replaySubject = new ReplaySubject(2); // 指定只存储2个旧的值

// 订阅者A
replaySubject.subscribe((data) => {
  console.log(`Subscriber A:`, data);
});

replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);

// 订阅者B
replaySubject.subscribe((data) => {
  // 如果之前有存储的值，会触发订阅
  console.log(`Subscriber B:`, data);
});

replaySubject.next(4);

// ---------------------------ReplaySubject end--------------------------------------------------

// ---------------------------AsyncSubject end--------------------------------------------------
const asyncSubject = new AsyncSubject();
// 订阅者A
asyncSubject.subscribe((data) => {
  console.log(`Subscriber A:`, data);
});

asyncSubject.next(1);
asyncSubject.next(2);
asyncSubject.next(3);

// 订阅者B
asyncSubject.subscribe((data) => {
  console.log(`Subscriber B:`, data);
});

asyncSubject.next(4);
asyncSubject.complete();

// ---------------------------AsyncSubject start--------------------------------------------------

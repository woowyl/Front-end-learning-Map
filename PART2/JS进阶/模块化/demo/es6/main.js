
import Counter from './counter.js';
// import {counter, objCounter, addCounter}  from './counter.js';

console.log('main第一次输入出:',Counter.counter, Counter.objCounter.num);
Counter.addCounter();
console.log('main第二次输入出:',Counter.counter, Counter.objCounter.num);

// console.log('main第一次输入出:',counter, objCounter.num);
// addCounter();
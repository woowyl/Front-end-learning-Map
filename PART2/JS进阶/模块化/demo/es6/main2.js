
import Counter from './counter.js';
import {counter, incCounter} from './counter2.js';
console.log('1',counter); // 3
incCounter();
console.log('122',counter); // 4

Counter.counter = 4;
Counter.objCounter.num = 9;
console.log('初始输出:',Counter.counter, Counter.objCounter.num);
Counter.addCounter();
console.log('初始输出:',Counter.counter, Counter.objCounter.num);
Counter.counter = 14;
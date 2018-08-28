

var counterMoudle = require('./counter');

console.log('第一次数字输出', counterMoudle.counter, counterMoudle.objCounter.num);
counterMoudle.addCounter();

console.log('第二次数字输出'+counterMoudle.counter, counterMoudle.objCounter.num);
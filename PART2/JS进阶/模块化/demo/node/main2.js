var counterMoudle = require('./counter');

counterMoudle.counter = 4;
counterMoudle.objCounter.num = 7;
counterMoudle.addCounter();
console.log('另一个文件的输出', counterMoudle.counter, counterMoudle.objCounter.num);
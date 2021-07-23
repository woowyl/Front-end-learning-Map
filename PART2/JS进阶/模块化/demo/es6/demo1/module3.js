import c, {a, inc, obj} from './module1.js';

console.log(a, obj.b, c.c, 'in module3');
inc()
console.log(a, obj.b, c.c, 'in module3');
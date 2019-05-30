# call & apply

> call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个`参数数组`。

## call是什么

> call() 方法`调用`一个函数, 其具有一个指定的this值和分别提供的参数(相对apply的数组)。

- 通俗的说就是改变函数内this的指向，指向第一个参数。
- 它是函数的一个方法，所以出现在它`.`前的一定是一个函数 `function`
- 可理解为fn.call(thisArg, arg1, arg2, ...) 就是 fn(arg1, arg2, ....)在执行时，将fn里的this 替换为thisArg;

语法：

>fun.call(thisArg, arg1, arg2, ...)

### thisArg

fun体内this所指向的对象,在严格模式下需单独讨论

#### arg1, arg2  

fun 本身的的参数

### call 可以用来干什么 why

- call()提供新的 this 值给当前调用的函数/方法。你可以使用call来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）

``` javascript
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }

    function Food(name,price) {
        Product.call(this,name,price);
    }

    var food1 = new Food('apple', 100);
    console.log("food1.name ="+food1.name);
    console.log("food1.price ="+food1.price);

```

```js
    food1.name = "apple";
    foo1.price = 100;
```

- 使用call方法调用匿名函数

``` java
var animals = [
    { species: 'Lion', name: 'King' },
    { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
    (function(i){
        this.print = function() {
            console.log('#'+i+''+this.species+':'+this.name);
        }

        this.print();
    }).call(animals[i],i);
}
```

- 使用call方法调用函数并且指定上下文的'this',可以定义一个对象无关的函数，然后在后续使用中调用它

```javascript
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```

## apply

> apply的作用和call完全相同，唯一的不同是第二个参数，apply以数组的形式传递。

下面我们一起来看一些apply的应用，在实际应用中理解他。

### 用 apply 将数组添加到另一个数组

在这种情况下，concat确实具有我们想要的行为，但它实际上并不附加到现有数组，而是创建并返回一个新数组。如果原始数组已经很大的话，就会重复赋值，浪费更多的内存空间，我们想在原始数组上直接添加的话，该怎么做呢

``` javascript
    var array = ['a', 'b'];
    var elements = [0, 1, 2];
    array.push.apply(array, elements);
    console.info(array); // ["a", "b", 0, 1, 2]
```

### 使用apply和内置函数

聪明的apply用法允许你在某些本来需要写成遍历数组变量的任务中使用内建的函数。在接下里的例子中我们会使用Math.max/Math.min来找出一个数组中的最大/最小值。

``` javascript
    /* 找出数组中最大/小的数字 */
    var numbers = [5, 6, 2, 3, 7];

    /* 应用(apply) Math.min/Math.max 内置函数完成 */
    var max = Math.max.apply(null, numbers); /* 基本等同于 Math.max(numbers[0], ...) 或 Math.max(5, 6, ..) */
    var min = Math.min.apply(null, numbers);

    /* 代码对比： 用简单循环完成 */
    max = -Infinity, min = +Infinity;

    for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] > max)
        max = numbers[i];
    if (numbers[i] < min) 
        min = numbers[i];
    }
```

考虑到[JS对于参数的限制](https://bugs.webkit.org/show_bug.cgi?id=80797)——65536，可对方法进行优化

```javascript
    function minOfArray(arr) {
        var min = Infinity;
        var QUANTUM = 32768;

        for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
            var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
            min = Math.min(submin, min);
        }

        return min;
    }

    var min = minOfArray([5, 6, 2, 3, 7]);
```

### reference 
[Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
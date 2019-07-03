# arguments

## 一、是什么

MDN中给出的定义是:

> arguments 是一个对应于传递给函数的参数的类数组对象。

有两层含义：
 - 它对应传递给函数的参数
 - 它是一个类数组的对象

### 1.1 对应传递给函数的参数

arguments对象是所有（非箭头）函数中都可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：

```js
    function testArgs(args) {
        for(var i = 0; i<arguments.length; i++)
            console.log(arguments[i]); 
    }

    testArgs('wangyuanliang', 'hello', 'world');
    // wangyuanliang
    // hello
    // world
```

### 1.2 类数组的对象

这里也有两层含义：

 - 类数组
 - 对象

首先它是一个对象，其次它类数组。说它类数组是因为它有一些数组的性质，但并不完全拥有数组的方法。除了length属性和索引元素之外没有任何Array属性或者方法。比如`pop()`、`push()`、`slice()`...等等这些方法。

除了length 属性外，它还有以下属性

 - arguments.callee  
  指向当前执行的函数。
 - arguments.caller (已被废止)  
  指向调用当前函数的函数。
 - arguments.length  
  指向传递给当前函数的参数数量。  
 - arguments[@@iterator]  
  返回一个新的Array迭代器对象，该对象包含参数中每个索引的值。

注意:现在在严格模式下，arguments对象已与过往不同。arguments[@@iterator]不再与函数的实际形参之间共享，同时caller属性也被移除。

## 二、为什么

它是JS的一个内置对象，常被人们所忽略，但实际上确很重要，JS不像JAVA是显示传递参数，JS传的是形参，可以传也可以不传，若方法里没有写参数却传入了参数，该如何拿到参数呢，答案就是arguments了，在一些插件里通常这样使用。

## 三、怎么用

通过几个例子来理解它的用法：

### 3.1 遍历参数求和

```js
    function add() {
        var sum =0,
            len = arguments.length;
        for(var i=0; i<len; i++){
            sum += arguments[i];
        }
        return sum;
    }
    add()                           // 0
    add(1)                          // 1
    add(1,2,3,4);                   // 10
```
### 3.2 定义连接字符串的函数

这个例子定义了一个函数来连接字符串。这个函数唯一正式声明了的参数是一个字符串，该参数指定一个字符作为衔接点来连接字符串。该函数定义如下：

```js
    function myConcat(separator) {
        var arr = Object.prototype.call(arguments,1); //通过这步，将参数除第一个元素外的其他元素转为数组，并存在arr中

        return arr.join(separator);
    }

    // returns "red, orange, blue"
    myConcat(", ", "red", "orange", "blue");

    // returns "elephant; giraffe; lion; cheetah"
    myConcat("; ", "elephant", "giraffe", "lion", "cheetah");

    // returns "sage. basil. oregano. pepper. parsley"
    myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");
```
这个例子中使用到了`将arguments对象转换为数组的操作`。实际使用中这也是一个非常常用的方法。除了例子中的方式之外，我们还可以使用其他一些方法，我们将他们统一整理在这里：

```js
    function args2Arr(args) {
        var args1 = Array.prototype.slice.call(arguments); //这个转化比较慢，在性能不好的代码中不推荐这种做法。
        
        var args2 = Array.from(arguments); //ES6语法

        var args3 = [...arguments]; //ES6语法
        console.log(args1, args2);
    }
```
对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8 - [更多信息](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments))。如果你关心性能，尝试通过遍历arguments对象来构造一个新的数组。另一种方法是使用被忽视的Array构造函数作为一个函数：

```js
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
```

## 3.3 传递参数

下面是将参数从一个函数传递到另一个函数的推荐做法。

``` js
    function foo() {
        bar.apply(null, arguments);
    }
    function bar(a, b, c) {
        // 干活
    }
```

## reference

[完全理解JS--arguments - 简书](https://www.jianshu.com/p/e6bfa4bdf718)

[Arguments 对象 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

[arguments 对象 - 极客学院wiki](https://wiki.jikexueyuan.com/project/javascript-garden/function/arguments.html)
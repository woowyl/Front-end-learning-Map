## arguments

#### 先看一个例子

```javascript
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

#### 是什么

>arguments 是一个对应于传递给函数的参数的类数组对象。
arguments对象是所有（非箭头）`函数中`都可用的`局部变量`。你可以使用arguments对象在函数中`引用函数`的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处。  
参数也可以被设置。

arguments对象不是一个 Array 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：

#### 为什么要arguments WHY

如果`调用的参数`多于`正式声明接受的参数`，则可以使用arguments对象。这种技术对于可以传递可变数量的参数的函数很有用。使用 arguments.length来确定传递给函数参数的个数，然后使用arguments对象来处理每个参数。

#### 怎么用

1. 遍历参数求和

```javascript
    function add() {
        var sum = 0,
            len = arguments.length;
        for (var i = 0; i<len; i++) {
            sum += arguments[i];
        }
        return sum;
    }

    add();  //0
    add(1); //1
    add(1,2,3,4);//10
```

## arguments.callee

``` javascript
    function create() {
        return function(n) {
            if (n <= 1)
                return 1;
            return n * arguments.callee(n - 1);
        };
    }

var result = create()(5); // returns 120 (5 * 4 * 3 * 2 * 1)

```

### 是什么

> callee 是 arguments 对象的一个属性。它可以用于`引用`该函数的函数体内当前`正在执行的函数`。这在函数的名称是未知时很有用，例如在没有名称的函数表达式 (也称为“匿名函数”)内。

#### 警告

警告：在严格模式下，第5版 ECMAScript (ES5) 禁止使用 arguments.callee()。当一个函数必须调用自身的时候, 避免使用 arguments.callee(), 通过要么给函数表达式一个名字,要么使用一个函数声明.

### 为什么

`早期版本`(现在可以)的 JavaScript不允许使用命名函数表达式，出于这样的原因, 你不能创建一个递归函数表达式。

例如，下边这个语法就是行的通的：

```javascript
function factorial (n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
}

[1,2,3,4,5].map(factorial);
```

但是:

```javascript
[1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : /* what goes here? */ (n - 1) * n;
});
```

这个不行。为了解决这个问题， arguments.callee 添加进来了。然后你可以这么做

```javascript
[1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```

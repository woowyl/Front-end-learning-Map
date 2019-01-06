# call & apply

## call是什么
> call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。


- 通俗的说就是改变函数内this的指向，指向第一个参数。
- 它是函数的一个方法，所以出现在它`.`前的一定是一个函数 `function`

语法：

>fun.call(thisArg, arg1, arg2, ...)

##### thisArg   
fun体内this所指向的对象,在严格模式下需单独讨论

##### arg1, arg2  
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
```

### call 怎么去用


### reference 
[Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
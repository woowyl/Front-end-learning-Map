# this

this是javascript的关键字。  
它指向一个对象。  
它的指向是在运行/运行时确定的，函数申明时并不确定。
它只能在函数内部使用。  

举例说明：

``` javascript
    function foo() {
        this.name = 'foo';
    }
```
虽然它的指向在运行时决定，但是有一个固定的原则，就是<span style="color:#F08080"> **指向调用函数的那个对象**。</span>  (`.`前的对象)

this只能出现在函数体内，但根据函数的不同形式，有四种不同的表示方式：

## 1. 纯函数调用

此时this 指向[全局对象](./global.md);  
*** <span style="color:red;">注意在严格模式下，this指向了undefined </span>  
在浏览器环境下，全局对象为windows;

```javascript
    var a = 1;
    function test() {
        var a = 2;
        console.log(this.a);
    }

    test();
```

此时控制台输出的是 `1`

## 2. 对象方法调用

```javascript
    var person = {
        name: 'yuanliang',
        getName: function(){
            console.log(this.name);
        }
    }

    person.getName();
```


## 3. 构造函数调用
``` javascript
    function foo() {
        this.a = 2;
        this.func = function() {
            console.log(this.a);
        }
    }
    var a = 1;
    var fobj = new foo();

    fobj.func();

```
此时this指向，方法的调用者，也就是fobj，那么this.a 便是2。
## 4. apply & call



## 5. 箭头函数中的this
```javascript
function a() {
    return () => {
        return () => {
        	console.log(this)
        }
    }
}
console.log(a()()())

```

箭头函数其实是没有 this 的，这个函数中的 this 只取决于他外面的第一个不是箭头函数的函数的 this。在这个例子中，因为调用 a 符合前面代码中的第一个情况，所以 this 是 window。并且 this 一旦绑定了上下文，就不会被任何代码改变。

## Java语言中的this





## Reference
- [Understanding JavaScript Function Invocation and "this"](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)

- [深入浅出 JavaScript 中的 this](https://www.ibm.com/developerworks/cn/web/1207_wangqf_jsthis/index.html)
- [Javascript的this用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
- [interviewMap](https://yuchengkai.cn/docs/zh/frontend/#%E5%AF%B9%E8%B1%A1%E8%BD%AC%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B)
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

## 4. apply & call


## Java语言中的this





## Reference
- [Understanding JavaScript Function Invocation and "this"](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)

- [深入浅出 JavaScript 中的 this](https://www.ibm.com/developerworks/cn/web/1207_wangqf_jsthis/index.html)
- [Javascript的this用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
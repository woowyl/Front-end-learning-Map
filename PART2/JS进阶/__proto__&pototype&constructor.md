## 一、原型对象
JS里没有类的概念，全部都是对象，但是通过new 的方式我们可以实现和Class类似的效果。
```javascript
    function Foo(name,age) {
        this.name = name;
        this.age = age;
    }

    var foo = new Foo('wyl', 28);

```
为了区分这两者的不同，方便后续描述方便，我们把`Foo`这样的定义称为`大对象`，`foo`这样的定义称为`小对象`.

从这个例子我们就可以看出，foo和Foo直接有着非常密切的联系，那这种联系在编程中如何体现呢？这里就要提到他们的中间桥梁，一个对象，在开始介绍它之前，我们给它取名字叫`原型对象`。

- 它长什么样子呢？
- 它的作用又是什么呢？

先从一个最常见但是没有最常用的属性说起：

## 1  `__proto__`
JS提供了一个叫做`__proto`的属性，它简直太常见了。任何对象均有此属性（真的吗？？？！！！）。

### 1.2 小对象的`__proto__`
我们先来看看小对象下的`__proto__`：
![](./images/prototype/foo_proto_.jpg)  
它指向一个对象——有连个属性组成:constructor和又一个`__proto__`(考虑到一切对象皆有`__proto`,这里也就不足为奇)。
```javascript
    {
        constructor: {
            ...
        },
        `__proto__`: {

        }
    }
```
这个对象就是我们今天要重点要研究的对象——**原型对象**。

通过上面的例子我们已经知道可以通过 `小对象.__proto__`来获取到其对应的原型对象。进一步分析这个原型对象，它有两部分组成

#### 1.`__proto__`

#### 2.constructor

我们先顺着`__proto__`看下去
原型对象的`__proto__`指向了另外一个对象：
```javascript
    {
        constuctor: {
            // f Object()
        },
        hasOwnProperty: f{},
        isPrototypeOf: f{},
        protertyIsEumerable: f{},
        toLocaleString: f{},
        toString: f{},
        valueOf: f{},
        `__defineGetter__`:f{},
        `__defineSetter__`:f{},
        `__lookupGetter__`:f{},
        `__lookupSetter__`:f{},
        get: f{},
        set: f{}
    }
```
![](./images/prototype/foo_proto_toggle.png)  

到这里我们发现，这个对象怎么没有`__proto__`呢？说好的所有对象都有`__proto__`，这是什么原因呢，我们这里不做展开，在后面会解释这个问题，先要明白三点：
1. 小对象.`__proto__`  = 原型对象
2. 原型对象.`__proto__` = 一个确定的对象(没有`__proto__`)。
3. 这个确定的对象是JS里唯一没有`__proto__`的对象

小对象的`__proto__`看完，我们来分析一下大对象，既然大对象也是对象，那么它一定也有`__proto__`。


### 1.3 大对象的`__proto__`
还是之前的代码，在控制台输入 
> `Foo.__proto__`  

![](./images/prototype/Foo_proto_.png)  

看到返回的是一个字符串`ƒ () { [native code] }`，不是我们想象中的对象。这就是JS帮我们封装好的代码，也就是说底层语言留给我们的接口。  
那native code 是什么东西呢，我们放后面讲，现在需要明白第四点
4. 大对象.`__proto__` = 我们不可改动的native code 

`__proto__`先告一段落，我们再来看prototype

## 2. prototype

之前我们讲了`__proto__`，这个prototype又是什么鬼？先来看一张图
![](./images/prototype/prototype.png) 
分别输入:  

- >foo.prototype
- >Foo.prototype
- >foo.`__proto__`  

从输出的结果来看，小对象没有prototype,大对象的prototype和小对象的`__proto__`指向同一个对象，没错就是我们开始讲到的原型对象！！ 它们之间的联系终于建立起来了，为了验证这个关系，向控制台输入
> foo.`__proto__` === Foo.prototype
结果是什么呢？  

![](./images/prototype/__proto__eqPrototype.png) 

<p style="color:red">true!!</p>,实锤无误了。  
样我们得到了小对象、大对象、原型对象之间的关系。我们再之前的结论里添加第五条：  

5. 小对象没有prototype；大对象.prototype === (其对应)小对象.`__proto__` === 原型对象

这个关系建立之后，再去分析原型对象的内部结构。回忆一下Foo的原型函数  

```javascript
    {
        constructor: {
            ...
        },
        `__proto__`: {

        }
    }
```
由两部分组成，`__proto__`之前我们看过，指向了一个没有`__proto__`的原型对象。
我们现在来看另一个属性，constuctor:

## constructor
constructor顾名思义：构造函数。那我们来仔细看看这个constructor有些什么：

![](./images/prototype/constructor.png)   

红色框内是constructor的内容，大体属性是下面几个：
```javascript
    constructor: {
        arguments: null,
        caller: null,
        length: number,
        name: 'Foo',
        prototype:  {
            constructor: {},
            `__proto__`: {}
        },
        `__proto__`: f()
    }
```
这个constructor是何方神圣呢？是谁的构造函数呢，从它的name属性来看，它应该就是Foo()函数，为了验证这个猜想，在控制台输入：
> foo.`__proto__`.constructor === Foo;

![](./images/prototype/constructorEqFoo.png)   
得到的结果印证了我们的猜想，我们再来看上上图绿色的部分，这恰好和我们之前prototype联系起来。

> \>`foo.__proto__.constructor` === Foo;

> \> `Foo.prototype` === `foo.__proto__` === `foo.__proto__.constructor.prototype` === 其对应的原型对象;

至此原型对象、`__proto__`、prototype、constructor、大对象、小对象之间的关系已经建立。

我们回过头再去看之前遗留下来的两个问题：
 1. 没有`__proto__`属性的对象是什么
 2. 大对象.`__proto__`指向的native code 是什么
# Vue原理解析 & 简单的双向绑定MVVM

## 几种常见的监听模式

> 发布者-订阅者模式 （backbone.js）  

> 脏值检查 （angular.js）  

> 数据劫持 （vue.js） 

## 数据劫持


## 一 双向数据绑定

### 1.1 什么是双向数据绑定

就是数据的双向互通，即：

1. 页面数据改变 => js中 data值中的改变
2. js中 data值的改变 => 页面数据改变

从定义上了解它之后，我们就一步一步去完成它。

### 1.2 怎么去做

step1:  监听 addEventListener 与 Object.defineProperty()
---
首先我要有能监听到两个变化的函数，
1. 页面的变化，无非是输入和点击，那么我们可以使用`addEventListener`去完成。
2. data值的变化，可以采用不同的方式，Angular（脏数据检测），本文以Vue的实现`Object.defineProperty()`来说明。这个api可以监听到对象中每个属性的改变操作，并自定义回调函数。

OK 能够监听到变化之后，我们就需要做第二部操作，写回调函数


step2: 监听回调
---
再次明确一下我们的需求。  
> 我们在js中定义了一个变量，这个变量可能在页面<span style="color:red; font-size:20px">多处</span>引用。当在js中改变这个变量时，要求页面的这些引用同步更新；而且当在页面中对某个引用做修改时（比如input框输入），对应的js文件中的变量也同步修改，页面中这个变量的其他引用也完成修改。

这里放一张图 用于说明，互相修改时需要做的操作。

在清楚每个变化之后的回调之后，我们就要设计去实现它。单靠原生的html DOMapi是不能直接实现以上需求的，所以我们要定义一个<span style="color:red; font-size:20px">规则</span>，首先他能完成页面的初始赋值;其次它通知浏览器，这是一个特殊的node，每次变动需要有回调。

step3: 初始化页面  实现/自定义html中的指令 
---
我们需要一些特殊的符号，在html中去表示，它是和js的变量有绑定关系的。我们以在vue中我们用的是`{{}}`和`v-`的方式为例。写代码的时候可以定义一些特殊符号，但是给浏览器的还是原始的html代码。所以我们就需要一个编译的过程，定义compile文件来完成这些工作。  
整理一下，compile的两项任务:
1. 将`{{}}`以及`v-`这些符号（指令）编译为原始的html代码
2. 编译完成后还要将js中变量的值，赋值给对应的dom

1> 过程的思路是 ，获取包裹在VUE作用域内的dom树 => 获取这个dom树转为fragment对象 ([为什么要转fragemen对象??](vue原理中的几个api.md)) => 循环遍历dom树下的子节点，并依次完成编译过程。

编译的关键代码， 完整代码[戳这里](./demo/js/compile.js)
```javascript
    // 编译fragement  dom树对象 以el参数的形式传入,
    compileElement: function(el) {
        var childNodes = el.childNodes,
             me =this;
        /**
         * [].slice.call(arrays)  arrays.slice的区别？？
         * 
         */
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            // 判断双大括号 {{ }} 的表达式
            var reg = /\{\{(.*)\}\}/; 
            // 按元素节点方式编译

            if (me.isElementNode(node)) {
                me.compile(node);
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            //遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        })
    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;
            // 遍历node节点上的属性 ‘v-’
            [].slice.call(nodeAttrs).forEach(function(attr){
                var attrName = attr.name;
                if (me.isDirective(attrName)) {
                    var exp = attr.value;
                    
                    var dir = attrName.substring(2);
                    //事件指令
                    if (me.isEventDirective(dir)) {
                        compileUtil.eventHandler(node, me.$vm, exp, dir);
                        //普通指令
                    } else {
                        compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                    }

                    node.removeAttribute(attrName);
                }
            });
    },

```

step4: 回调的定义
---
前期工作准备好后，就要具体写回调,也就是我们第一步提到的两个监听事件。

1. addEventListenter  
给绑定了`v-model`指令的
``` javascript

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            val = newValue;
        });
    },
```

2. Object.defineProperty 

```javascript

    defineReactive: function(data, key, val) {
        // 通过defineProperty监听属性的变化
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                return val;
            },
            set: function(newVal) {
                if (val === newVal) return;
                val = newVal;
               // 新值是obj的话，进行监听
            }
        });
    }

```



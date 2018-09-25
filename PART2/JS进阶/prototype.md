# Js原型 prototype

## 一、产生原因
对象的继承，是面向对象编程一个很重要的方面。A对象通过继承B对象，就能够直接拥有B对象的所有属性和方法。这对于代码的复用十分重要。  
大部分面向对象的编程语言，都是通过类Class来实现对象的继承。JavaScript语言的继承则是通过“原型对象”（prototype);
## 二、 \_\_proto__ 与 prototype

这里用XXXX表示类，xxxx表示类的一个实例。

### 2.1 几点说明：
- Object Function Foo这些都是XXXX,
- 其中`function Function()` 和 `function Object()`由底层代码定义。`function Foo()`代表由用户定义的类。
 
### 2.2 两者指向
- \_\_proto__ 指向 XXXX.prototype.
    - `xxxx.__proto__ `指向指向起对应XXXX的prototype，即，`xxxx.__proto__` == `XXXX.prototype`
    - `XXXX.prototype.__proto__` 指向 `Object.prototype`, `Object.prototype.__proto__`指向null
    - `XXXX.__proto__`指向最基层的 `Funciton.prototype`

- prototype就是一个对象
    - 对象没有prototype只有类才有
    - 对象的\_\_proto__指向对应类的protype
    - 包含一个constractor 指向其对应的类

    ![](./images/prototype.png)
### 2.3
## 三、 为什么
### 3.1 构造函数的缺点
定义在构造函数里的属性和方法，再每次定义对象时会重复定义，造成内存浪费。而定义在原型上的属性和方法可以复用，且修改后统一修改。
### 3.2 prototype的作用
JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。 

也就是说，如果A对象想要继承B对象的属性和方法，只需要将B的protype赋值给A即可，但是也要考虑A的prototype能否全部覆盖。
## 四、怎么用

### 4.1
prototype前的元素一定是一个“类”，而不能是一个对象。
```javascript
    function Dog(sex, color) {
        this.sex = sex;
        this.color = color;

    }
    var poppy = new Dog();
    // 这是正确的写法
    Dog.prototype.bark = function();
    // 这是错误的写法
    poppy.prototype
```
那么如果想要通过对象查看它的构造函数该符合看呢：  
poppy是构造函数Dog的实例，可以从poppy.constructor间接调用构造函数。这使得在实例方法中，调用自身的构造函数成为可能。
```javascript
    poppy.constructor
```
### 4.2原型链
- 任何一个对象，都可以充当其他对象的原型
- 由于原型对象也是对象，所以它也有自己的原型  
因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

### 4.3 constructor
prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。

```javascript
    function Person() {}
    Person.prototype.constructor == Person // true
```

构造函数是原型prototype上非常重要的一个属性，它说明了当前类的构造函数，所以对prototype修改时，一定不要忘记加上constructor属性。
- 有问题的写法：
```javascript
    function Person() {}
    /**
     * 构造函数Person的原型对象改掉了，但是没有修改constructor属性，导致这个属性不再指向Person。由于Person的新原型是一个普通对象，
     * 而普通对象的contructor属性指向Object构造函数，导致Person.prototype.constructor变成了Object
     * */
    Person.prototype = {
        addMethod: function() {}  
    }
```

- 没有问题的写法

```javascript
    function Person() {}

    Person.prototype = {
        addMethod: function() {}  ,
        constructor: Person,
        ...
    }
```

- 推荐的写法
```javascript

    function Person() {}
    // 直接为prototype属性添加一个方法，而不是覆盖它
    Person.prototype.addMethod = function() {
        //...
    }
```

## 4.4 instanceof 运算符

instanceof 运算符返回一个布尔值，表示对象是否为某个构造函数的实例。
instanceof运算符的左边是实例对象，右边是构造函数。它会检查右边构建函数的原型对象（prototype），是否在左边对象的<span style="color:red">原型链</span>上。因此，下面两种写法是等价的。  

```javascript
    v instanceof Vehicle
    // 等同于
    Vehicle.prototype.isPrototypeOf(v)
```
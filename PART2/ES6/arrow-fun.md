# 箭头函数

## 是什么

  `x => x + x`  
这就是一个简单的箭头函数，翻译成ES5的语法就是:

```javascript
function(x) {
    return x + x;
}
```

## 为什么

箭头函数相对于一个匿名函数，简化了函数定义。ES6中好多语法都是为了简化定义，箭头函数也有一样的作用。它省略掉了传统定义中的 `function`， `{ }` ，`return` 等定义。

## 怎么用

三种形式

### 1. 最简表达式：返回一个表达式或变量

```javascript
    let x = [1,2,3,4,5,6,7]

    console.log((array => array.filter(num => num > 3))(x));
```

等价于

``` javascript 
    var x = [1,2,3,4,5,6,7]

    console.log((function(array) {
        return array.filter(function(num) {
            return num > 3;
        })
    })(x))
```

rerult:  
`[4,5,6,7]`

### 2.加'{  }': 返回一个函数/包含多个条件语句

> 此时不能省略 `{...}` 和 `return`

```javascript
    x => {
        if (x > 0) {
            return x + x;
        } else {
            return x * x
        }
    }
```

### 3. 加`(  )`:返回一个对象，为了不和2中的函数冲突，需要加小括号

```javascript
    x => ({
        name: 'leon',
        age: '28',
        sex: 'male'
    })
```

### this 关键字

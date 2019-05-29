# 关于作用域的思考

先来想一个问题，下面这两个函数是一样的意思吗

```javascript
    function foo() {}
    something.on('event', foo)
```

and

```javascript
    function foo() {}
    something.on('event', function() {
        foo();
    })
```

## 这两个函数差别在哪儿

## 结论

分不同情况得到不一样的结果，当`foo`函数内不涉及作用域相关的操作时，两者是完全一样的效果。
但当`foo`内的操作和作用域相关时，两者得到的结果可能就不太一样了。

## 那作用域相关的操作有哪些呢
# 防抖和节流

## 1. 为什么需要防抖和节流

在日常开发中，我们多少会碰到这些问题：  

 - 一个按钮，当短时间内多次被点击时，我们希望它上面绑定的事件只触发一次
 - 当一个function被绑定到密集触发的动作（eg:scroll、resize、input）上时，我们希望它能够低频率地触发
 - ...

防抖和节流就是为了解决上面的这些问题，但他们的思路又有点不太一样。

## 2. 防抖和节流分别是什么

### 防抖-debounce

防抖的思路是，在指定间隔内，如果事件被再次触发，之前事件不会触发，重新开始计时，直到间隔时间内没有再次触发事件，最后一次事件才被执行。

### 节流-throttle

节流的思路是，每隔一段时间触发一次，在指定时间间隔内触发的事件将会被屏蔽。

总结一下就是，防抖适合对实时性要求不高的函数，比如需要调取接口的函数;而节流相对防抖有更好的实时性，比如在页面scroll中要渲染界面的函数，则适合用节流，如果用防抖，可能会出现，如果用户滚的比较快，在用户停下来之前，页面一直没有内容被渲染。

## 3. 防抖和节流怎么做

目前我们用的比较多的是underscore.js的_.debounce()方法。为了能更好理解debounce和throttle的工作方式，这里用自己的方式来实现它。

### 防抖

``` javascript
    function debounce(func, await) {
        var timeout, timeout2;

        return function() {
            if (!timeout) {    //之前没有绑定事件
                timeout = setTimeout(() => {
                    func();
                    timeout = 0;
                }, wait);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func();
                    timeout = 0;
                }, wait);
            }
        }
    }
```

#### 节流

```javascript
    function throttle(func, await) {
        var timeout = 0,result;
        return function() {
            if (!timeout) {
                timeout = setTimeout(() => {
                   func() 
                   timeout = 0;
                }, wait);
            }
        };
    }
```

### 4. 防抖节流的实际表现

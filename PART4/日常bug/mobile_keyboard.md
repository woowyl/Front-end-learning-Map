# 实现一个移动端唤起软键盘输入的页面

这个需求实现起来本身并不复杂，复杂之处在于，安卓和IOS在键盘唤起后引发的布局问题。 当我们使用传统的fixed布局实现底部固定时，在键盘唤起之后，fixed元素常常会

## 使用flex布局实现

放弃fixed布局，才有flex的布局方式

``` html
    <body>
        <header></header>
        <div class="container">
            <!-- 这里放一些需要滚动的内容 -->
        </div>
        <footer></footer>
    </body>
```

css是关键：

```css
    * {
        box-sizing: border-box;
    }
    html {
        height: 100%;
    }
    body {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        height:100%;
        width: 100%;
    }
    header {
        width: 100%;
        border-top: 1px solid #dedede;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
    }
    div.container {
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    footer {
        width: 100%;
        border-top: 1px solid #dedede;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
    }

```

## 在唤起键盘后定义滚动监听

使用flex之后，可以保证吊起键盘后没有问题，但是当用户滚动页面时，仍然会把底部的元素滚出界面。这时，我们就可以通过js监听用户的滚动行为，当页面滚动时，让其回滚到初始位置。

```js

    // 当input focus时触发滚动监听
    $JInput.on('focus', function() {
        //键盘起来是滞后的 所以+ settimeout
        setTimeout(function() {
            keyboardScrollTop = $(window).scrollTop();
            $(window).on("scroll.test", keyboardScrollTop);
        }, 500);
    })
    // 当键盘收起后去除scroll 监听
    .on('blur', function() {
        $(window).off("scroll.test", keyboardScrollTop);
    });

    function keyboardScrollTop() {
         window.scrollTo(0, keyboardScrollTop);
    }

```

这里需要注意的是，

## 通过节流防止页面抖动

``` javascript
     var  throttleScroll = throttle(250, function() {
        window.scrollTo(0, keyboardScrollTop);

        $(window).on("scroll.test", throttleScroll);
    })
```

这里需要注意的是，要区分以下两段代码的区别

```js
    function throttleScroll() {
        throttle(200, function() {

        });
    }

    var throttleScroll = throttle(200, function() {

    })
```

附节流代码：

``` javascript
    function throttle(delay, fn, debounce_mode) {
        var last = 0,
            timeId;

        if (typeof fn !== 'function') {
            debounce_mode = fn;
            fn = delay;
            delay = 250;
        }

        function wrapper() {
            var that = this,
                period = (new Date()).getTime() - last,
                args = arguments;

            function exec() {
                last = (new Date()).getTime();
                fn.apply(that, args);
            };

            function clear() {
                timeId = undefined;
            };

            if (debounce_mode && !timeId) {
                // debounce模式 && 第一次调用
                exec();
            }

            timeId && clearTimeout(timeId);
            if (debounce_mode === undefined && period > delay) {
                // throttle, 执行到了delay时间
                exec();
            } else {
                // debounce, 如果是start就clearTimeout
                timeId = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - period : delay);
            }
        };
        return wrapper;
    }


```

## 可能遇到的问题
  
- 使用flex之后，元素超出页面后的滚动是在div元素内滚动，而不是window。所以之前通过`$(window).scroll(function(){})`绑定的事件，将不再生效。eg: 滚动加载，曝光和埋点

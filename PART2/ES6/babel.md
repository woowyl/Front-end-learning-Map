## babel

### preset

### babel-polyfill
Babel 默认值转换新的JavaScript句法（syntax）,而不转换新的API，比如`Iterator`,`Generator`,`Set`,`Maps`,`Proxy`,`Reflect`,`Symbol`,`Promise`等全局对象，以及一些定义在全局对象上的一些方法。

比如Array新增的Array.from方法。Babel不会转码这个方法，如需转码，必须使用`babel-polyfill`

安装命令：   
```
    $ npm install --save-dev bable-polyfill
```
使用方法:在脚本头部添加
```javascript
    import 'bable-polyfill'
```


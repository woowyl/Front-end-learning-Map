## webpack踩过的坑

### 一、 clean-webpack-plugin 的root配置
```javascript 
    var CleanWebpackPlugin = require('clean-webpack-plugin');
    new CleanWebpackPlugin(baseConfig.output.path, {
        root: rootPath,
        verbose: true
    }),
```

 这个root配置项不能缺少，否则会出现如下提示，并且clean操作被跳过。
```javascript
    clean-webpack-plugin: ...\build is outside of the project root. Skipping...
```
另外，这verbose配置项挺有些费解。verbose的意思是冗长的，啰嗦的。实际表示的意义是Write logs to console，即是否要往终端上输出log。


### 二、 图片加载路径只能在根目录下



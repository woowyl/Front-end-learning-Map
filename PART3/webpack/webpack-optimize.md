## 优化

一、每次发布前执行删除操作

1. 安装插件
```javascript
    npm install --save-dev clean-webpack-plugin
```

2. 配置webpack.config.js
```javascript

    //引入插件
    const CleanWebpackPlugin = require('clean-webpack-plugin');

    config = {
        ...,
        plugin: [
            ...
            new CleanWebpackPlugin(
                ['dist/*'],
                {
                    root: __dirname,  //根目录
                    verbose: true,    //开启在控制台输出信息
                    dry: false        //启用删除文件
                }
            )
        ]
    }

```
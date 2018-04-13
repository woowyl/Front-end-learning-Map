## webpack-dev-server
### source map
作用：当webpack打包源代码时，可能会很难定位到错误的具体位置。比如，将（a.js b.js c.js）打包到bundle.js中，其中一个源文件（b.js）包含一个错误，但都会指向bundle.js。那如何解决这个问题？
使用source map，将编译后的代码映射回原始源代码、

### 使用
1. 安装依赖包
``` javascript
 npm i webpack-dev-server
```

2. 安装依赖包cross-env : 跨平台地设置及使用环境变量
> process是全局变量，不需要require。process.env返回一个包含用户环境信息的对象。

```javascript
    npm i --save-dev cross-env
```

3. 在package.json中添加配置开发启动脚本，并添加环境变量

> process.env中并没有NODE_ENV变量，这是为了判断开发环境后期添加的。

``` javascript

    "script": {
        ...
        "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
        "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
    }

```


### 区分开发和正式环境

- 使用同一个webpack config文件
- 使用不同的config文件  通过package.json中的script命名去指定不同的文件 （vue-cli）
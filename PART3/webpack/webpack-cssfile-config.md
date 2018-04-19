## webpack css代码分割

### 一、extract-text-webpack-plugin用法
1. 单独打包css,需要一个webpack插件

``` javascript
    npm install extract-text-webpack-plugin
```

2. 在webpack.config.js里添加配置

``` javascript

    const ExtractPlugin = require('extract-text-webpack-plugin');

    config = {
        ...
        module: [
            rules: [
                ...,
                {
                    test: /\.css/,
                    use: ExtractPlugin.extract({
                        fallback: "style-loader", //编译后用什么loader来提取css文件
                        use: "css-loader" //用什么样的loader如编译文件
                    })
                },
                {
                    test: /\.less/,
                    use: ExtractPlugin.extract({
                        fallback: "style-loader", //编译后用什么loader来提取css文件
                        use: [
                            "css-loader", //用什么样的loader如编译文件
                            "less-loader"
                        ]
                    })
                }
            ]
        ]
    }

```

### 二、添加postcss-loader

1. 首先安装postcss-loader autoprefixer

``` javascript
    npm install postcss-loader
    npm install autoprefixer
```

2. 在根目录添加 postcss.config.js

```javascript
    const autoprefixer = require('autoprefixer');

    module.exports = {
        plugins: [
            autoprefixer()
        ]
    }
```


3. 配置webpack.config.js

```javascript
    config = {
        ...
        modules: [
            rules: [
                ...,
                {
                    test: /\.css/,
                    use: ExtractPlugin.extract({
                        fallback: "style-loader", //编译后用什么loader来提取css文件
                        use: [
                            "css-loader",  //注意这两个的顺序
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            }
                        ] //用什么样的loader如编译文件
                    })
                },
                ...
            ]
        ]
    }
```
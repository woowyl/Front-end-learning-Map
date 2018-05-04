### 多页面应用程序

``` javascript
 const config = {
     entry: {
         pageOne: './src/pageOne/index.js',
         pageTwo: './src/pageTwo/index.js',
         pageThree: './src/pageThree/index.js'
     },
     output: {
         filename: '[name].js',
         path: __dirname+'[]'
     }
 }

```

### 多入口的方式

- 多个入口起点
- CommonsChunkPlugin

模板|描述
-|-
[hash]|模块标识符（module identifier）的hash
[chunkhash]|chunk内容的hash
[name]| 模块名称
[id]| 模块标识符（module identifier）
[query]| 模块的query 例如 文件名`?`后面的字符串


### 如何将多个js打包进html

``` json
config = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            ...
            chunks: [pageOne, pageTwo, pageThree]
        });
    ]
}

```


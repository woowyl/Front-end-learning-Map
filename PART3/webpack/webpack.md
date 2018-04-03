## webpack
> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

四个核心概念
- 入口 (entry)
- 输出 (output)
- loader 
- 插件 plugins

其他概念
- chunk
# # 

### 入口 （entry）
- 可以通过在 webpack 配置中配置 entry 属性，来指定一个入口起点（或多个入口起点，来作为构建其内部依赖图的开始。
- 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
- 每个依赖项随即被处理，最后输出到称之为 bundles 的文件中


### 出口 (output)

- output 属性告诉 webpack 在哪里输出(`output.path`)它所创建的 bundles，以及如何命名(`output.filename`)这些文件


### loader

- loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
- 通过loader,我们可以使用.vue .jsx的开发方式，也可以将.css sass less等文件进行打包
- loader,与其他三个的层级不同，在config.module下，而不是在config下
- loader 包含两个必须属性
    - test
    - use

### plugins
- loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
- 想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。
- 插件接口功能极其强大，可以用来处理各种各样的任务。

# #

### 一个基础的demo

``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 插件 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const path = require('path');

const config = {
 //定义入口
  entry: './path/to/my/entry/file.js',
  //定义输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  //loader
  module: {
    rules: [
        {
            test: /\.txt$/, 
            use: 'raw-loader' 
        },{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    ]
  },
  //插件   
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;

```
# #



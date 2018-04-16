# loader

## 基础用法：
在使用loader前，需要先安装对应的loader

```javascript
    npm install --save-dev css-loader
    npm install --save-dev vue-loader
    ...

```

``` javascript
    const config = {
        ...
        module: {
            rules: [
                {
                    test: /\.css$/
                    use: 'css-loader'
                },
                {
                    test: /\.vue$/
                    use: 'vue-loader'
                }
            ]
        }
    }
```

项目里常用的loader
- vue-loader
- css-loader
- style-loader


## css
- css-loader 是处理css文件中的url()等

- style-loader 将css插入到页面的style标签

- less-loader 是将less文件编译成css

- sass-loader 是将sass文件编译成css  

loader的加载顺序是从右往左，从下往上
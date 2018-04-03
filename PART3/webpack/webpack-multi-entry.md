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


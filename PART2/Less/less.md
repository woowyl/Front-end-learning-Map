# LESS
## 是什么
---
1. 一种动态样式语言。  
2. 它完全兼容CSS写法，只是CSS的一种形式的拓展。



## 为什么要使用LESS
---
将CSS赋予了动态语言的特性，比如变量，继承，运算，函数。这些特性的引入，可以通过逻辑的定义，减少我们重复代码的编写。同时在遇到修改时，通过规则可以让机器做批量修改，也减少了重复操作，是编程DRY原则的实践，提高了CSS代码的开发效率。  

举例说明
- ### 通过嵌套，减少开发量
```less
    .nav {
        h1 {
            font-size: .3rem;
            font-weight:bold;
        }
        p {
            font-size: .2rem;
            a {
                text-decaration: none;
                &:hover{border-width:1px;}
            }
        }
    }
```
等同于：
```css
    .nav h1 {
        font-size: .3rem;
        font-weight: bold;
    }
    .nav p {
        font-size: .2rem;
    }
    .nav p a {
        text-decoration: none;
    }
    .nav p a:hover {
        border-width: 1px;
    }
```

- ### 通过变量，减少修改量（也可以用混合的方式实现）
```less
@bgcolor: #f5f5f5;

.container1 {
    backgournd: @bgcolor
}
.container2 {
    backgournd: @bgcolor
}
.container3 {
    backgournd: @bgcolor
}
...
.container6 {
    backgournd: @bgcolor
}
```

那么可能会疑问，如果我指向改container1~container3的颜色，保留container4~container6的颜色，该如何去做。less提供了带参数的混合可以实现，详情语法篇的讲解。

## 怎么用
---
- 在Node.js下使用
```
    npm i -g less
    > lessc styles.less styles.css
```


- 在浏览器中直接使用
``` html
    <link rel="stylesheet/less" type="text/css" href="styles.less">
    <script src="less.js" type="text/javascript"></script>
```
- 使用编译工具 webpack less-loader
```
npm i webpack less-loader --save-dev
```
webpack.conf.js中添加：

``` javascript
    {
        test: /\.less$/,
        use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        })
    },
```


## 具体语法
---
### 1. 变量
- 基础语法，一般当做参数来用
- 支持运算
- 可以用变量名定义变量
```less
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header { color: @light-blue; }
```

编译后
```css
#header { color: #6c94be; }
```

### 2. 混合
- 在定义 ***一组*** 通用变量时适用。
- 定义一个classA,在classB中可以直接将classA当做属性引入。
```less
    .relative (@top:0, @right:0, @bottom:0, @left:0) {
        position: relative;
        top: @top;
        right: @right;
        bottom: @bottom;
        left: @left:
    }

    .section1{
        .relative;
    }
    .section2 {
        .relarive(.1rem, 0, .2rem);
    }
```
编译后

```css
    .section1 {
        position: relative;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0:
    }

    .section2 {
        position: relative;
        top: .1rem;
        right: 0;
        bottom: .2rem;
        left: 0:
    }
```
- @arguments 变量  
@arguments包含了所有传递进来的参数. 如果你不想单独处理每一个参数的话就可以像这样写:
```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}
.box-shadow(2px, 5px);
```
将会输出:
```css
  box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  -webkit-box-shadow: 2px 5px 1px #000;
``` 
注：这种写法在webpack中，已经可以通过postcss-loader解决

### 3. 嵌套
用嵌套的方式编写层叠样式，让命名空间更加清晰。
```less
    #header {
        color: black;

        .navigation {
            font-size: 12px;
        }
        .logo {
            width: 300px;
        &:hover { text-decoration: none }
        }
}
```
编译后
```css
    #header { color: black; }
    #header .navigation {
        font-size: 12px;
    }
    #header .logo { 
        width: 300px; 
    }
    #header .logo:hover {
        text-decoration: none;
    }
```
*注意 `&` 符号的使用—如果你想写串联选择器，而不是写后代选择器，就可以用到`&`了. 这点对伪类尤其有用如 `:hover` 和 `:focus`.
```less
    .bordered {
    &.float {
        float: left; 
    }
    .top {
        margin: 5px; 
    }
}
```
编译后
```css
    .bordered.float {
        float: left;  
    }
    .bordered .top {
        margin: 5px;
    }
```
### 4. 运算

变量间的四则运算
```less
@base: 5%;
@filler: @base * 2;
@other: @base + @filler;

color: #888 / 4;
background-color: @base-color + #111;
height: 100% / 2 + @filler;
```

### 5.color函数

LESS提供了一系列颜色运算函数，会将颜色转换为HSL色彩空间
```less
lighten(@color, 10%);     // return a color which is 10% *lighter* than @color
darken(@color, 10%);      // return a color which is 10% *darker* than @color

saturate(@color, 10%);    // return a color 10% *more* saturated than @color
desaturate(@color, 10%);  // return a color 10% *less* saturated than @color

fadein(@color, 10%);      // return a color 10% *less* transparent than @color
fadeout(@color, 10%);     // return a color 10% *more* transparent than @color
fade(@color, 50%);        // return @color with 50% transparency

spin(@color, 10);         // return a color with a 10 degree larger in hue than @color
spin(@color, -10);        // return a color with a 10 degree smaller hue than @color

mix(@color1, @color2);    // return a mix of @color1 and @color2

hue(@color);        // returns the `hue` channel of @color
saturation(@color); // returns the `saturation` channel of @color
lightness(@color);  // returns the 'lightness' channel of @color

hsl(hue(@old), 45%, 90%); //保持@old色调，具有不同的饱和度和亮度
```
### 6.命名空间

如果想要使用LESS通过嵌套定义的内层样式，比如下面例子中`.button`的样式，可以采用之前CSS的方式，用`>`表示层级。
```less
    #bundle {
    .button () {
        display: block;
        border: 1px solid black;
        background-color: grey;
        &:hover { background-color: white }
    }
    .tab { ... }
    .citation { ... }
    }
```
你只需要在 #header a中像这样引入 .button:
```css
#header a {
  color: orange;
  #bundle > .button;
}
```

### 7.作用域
与JavaScript类似，首先会从本地查找变量，或者混合模块，如果没有找到会去父级作用域查找。
```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}

#footer {
  color: @var; // red  
}
```

### 8.注释
注释
CSS 形式的注释在 LESS 中是依然保留的:
```less
/* Hello, I'm a CSS-style comment */
.class { color: black }
```
LESS 同样也支持双斜线的注释, 但是编译成 CSS 的时候自动过滤掉:
```less
// Hi, I'm a silent comment, I won't show up in your CSS
.class { color: white }
```

### 9.避免编译
`~`

### 10.匹配

类似于JavaScript中的判断语句，如果满足条件就使用匹配到的语句。在使用前需要首先定义好各种情况。
以三角形为例：
```less
    /*画一个三角形的原始方法*/
.triangle{
  width: 0;
  height: 0;
  margin-top: 10px;
  border-width: 60px;
  border-color: transparent transparent mediumvioletred transparent;
  border-style: dashed dashed solid dashed;//解决IE6有黑色边框问题
}

/*用匹配模式画三角形*/
.triangle_test(top,@w:60px,@c:mediumvioletred){
    border-width: @w;
    border-color: transparent transparent @c transparent;
    border-style: dashed dashed solid dashed;
}//向上的三角形
.triangle_test(bottom,@w:60px,@c:mediumvioletred){
    border-width: @w;
    border-color: @c transparent transparent transparent;
    border-style: solid dashed dashed dashed;
}//向下的三角形
.triangle_test(left,@w:60px,@c:mediumvioletred){
    border-width: @w;
    border-color: transparent @c transparent transparent ;
    border-style: dashed solid dashed dashed;
}//向左的三角形
.triangle_test(right,@w:60px,@c:mediumvioletred){
    border-width: @w;
    border-color: transparent transparent transparent @c;
    border-style: dashed dashed dashed solid;
}//向右的三角形

//@_：代表始终带着这个函数运行
.triangle_test(@_,@w:60px,@c:mediumvioletred){
    width: 0;
    height: 0;
    margin-top: 25px;
}

.triangle{    
//根据想得到的匹配格式画三角形 
  .triangle_test(top);
  .triangle_test(bottom);
  .triangle_test(left);
  .triangle_test(right);
//非匹配格式则css代码中只生成@_部分的代码
  .triangle_test(aaa);
}
```


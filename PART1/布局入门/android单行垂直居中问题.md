## 单行垂直居中的问题

### 1.关于垂直居中，css之前有好多方案。简单总结为
|父/子元素|单行文字/固定高度|不定高度行内/块级元素|
|-|-|-|
|固定高度|line-height   / margin-top:height(父元素-子元素)/2|table-cell+vertical-align/table+table-cell+vertical|
|不定高度|padding 上下边距一样|padding上下高度一样|

归纳为三个方式
 - line-height
 - padding
 - table-cell

### 2.直到flex的出现
直到flex的出现,将这些复杂的局面做了规整，让居中问题变得简单：

#### 旧版的flex

``` css
    display: -webkit-box;
    -webkit-box-pack: center; //在主轴上的居中
    -webkit-box-align: center;  //在cross axis 的居中
    
    -webkit-box-ori
```

#### 新版的flex

``` css
    /* =========在container上的属性 =========*/
    display: flex;
    flex-direction: row|colume|row-reverse;
    /*main axis 对齐方式*/
    just-content: flex-start | center | space-between| space-around; 
    /*cross axis 对齐方式*/
    align-items: flex-start | center | baseline| stretch; 
    /* cross axis 多轴时的对齐方式 */
    align-content: flex-start | center | space-bewtween | space-around | stretch;

    /* =========在item上的属性 =========*/
    /*越小越靠前*/
    order: <integer>;
    /* 定义放大比例 */
    flex-grow: <number>; /* default 0 不放大*/
    /* 定义缩小比例 */
    flex-shrink: <number>; /* default 1 */
    flex-basis: <length> | auto; /* default auto */
    /*推荐方式 flex属性是flex-grow, flex-shrink 和 flex-basis的简写*/
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ];
    /*单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性*/
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

### 3 但在android上依然有问题
flex 的出现解决了一部分问题，但是由于android手机上仍然会有偏上的情况。产生的原因：  

1. 字体小于12px后，浏览器解析异常的问题， 多发生在使用`rem`单位中。
#### 方案：
我们可以通过 transform: scale 来处理，比如，字体大小是 8px，我们把字体设定为 16px，然后通过 scale(0.5) 缩放至一倍大小，简单粗暴。

2. 字体原因，通过css基本无解
因为文字在content-area内部渲染的时候已经偏移了，而css的居中方案都是控制的整个content-area的居中

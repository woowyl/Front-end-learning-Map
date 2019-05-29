# source-map

## 是什么

一个.map文件,下面是一个demo:

``` json
    {
        "version":3,
        "sources":["foo.js"],
        "names":["sourceMapFoo","this","getName","source","console","log"],
        "mappings":"AAAA,SAASA,IAQT,OAHAC,KAAKC,QAAU,WACf,MAAO,SAEAD,KAGP,IAAIE,EAASH,IACbI,QAAQC,IAAIF,EAAOD"
    }
```

---

## 为什么

随着前端脚本越来越复杂，大部分源码需要经过转换，才可投入生产环境，常见的场景有：
> （1）压缩，减小体积。比如jQuery 1.9的源码，压缩前是252KB，压缩后是32KB。  
（2）多个文件合并，减少HTTP请求数。  
（3）其他语言编译成JavaScript。最常见的例子就是CoffeeScript。

这三种情况，都使得实际运行的代码不用于开发代码，debug变得困难重重。

而sourcemap的出现就是未了解决这个问题 。Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。将压缩处理后的代码，与源代码对应起来。

----

## 怎么用

### 1. 如何生成source-map文件

- [UglifyJs](https://github.com/mishoo/UglifyJS2)
- [Google Closure](https://developers.google.com/closure/compiler/)

### 2. 建立连接

在压缩后的代码最底部添加代码(工具自动添加)：//@sourceMappingURL= [filename].min.map.  
它是一个独立的map文件，与源码在同一个目录下。

### 3. 文件结构

```json
    {
　　　　"version" : 3,
　　　　"file": "out.js",
　　　　"sourceRoot" : "",
　　　　"sources": ["foo.js", "bar.js"],
　　　　"names": ["src", "maps", "are", "fun"],
　　　　"mappings": "AAgBC,SAAQ,CAAEA"
　　}
```

整个文件就是一个JSON对象，可以被解释器读取。它主要有以下几个属性：

```javascript
   - version：Source map的版本，目前为3。

　　- file：转换后的文件名。

　　- sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。

　　- sources：转换前的文件。该项是一个数组，表示可能存在多个文件合并。

　　- names：转换前的所有变量名和属性名。

　　- mappings：记录位置信息的字符串，下文详细介绍。
```

### 4.mappings解读

我们从最初的思路开始，完成mappings最终的形式。表面看它是一个乱码字符串,像： `AAFBc`、`SAAQ` ···。其实mappings是一个数组通过一定的方式编码后获得，这个数字包含了生成的文件中每行的映射点列表：

1. 通过映射点建立对应关系

 ```javascript
    mapppings = [
        第1行的映射点列表-A，
        第2行的映射点列表-B，
        ...
    ]
 ```

每行的映射点列表又是一个数组，包含了该行中所有的映射点。

```javascript

    mappings = [
        [ 第 1 行第 1 个映射点-A1, 第 1 行第 2 个映射点-A2, ... ] // 第 1 行的映射点列表-A
        [ 第 2 行第 1 个映射点-B1, 第 2 行第 2 个映射点-B2, ... ] // 第 2 行的映射点列表-B
    ...
    ]

```

每个映射点又是一个数组，包含了5个数字

```javascript
    [ 生成文件的列, 源文件索引, 源文件行号, 源文件列号, 名称索引 ]
```

至此已能够通过这三层数组，表示压缩文件和源文件之间的关系。

但是这种结构相对复杂，

```javascript
mappings = [
    [
        [1, 0, 2, 5, 1],
        [2, 0, 3, 6, 0]
    ], //第一行
    [
        [5, 0, 2, 3]
    ] //第二行
]

```

为了节约存储空间，
所以需要找一个适当的编码方式将其简化，
mappings 会被编码成一个字符串。

2. mappings编码

2.1  计算相对值  
将映射点中每个数字替换成当前映射点和上一个映射点相应位置的差，如

``` javascript
    mappings = [
        [
            [1, 0, 2, 5, 1],
            [2, 0, 3, 6, 0]
        ],
        [
            [5, 0, 2, 3]
        ]
    ]
```

其中第一个映射点不变，以后每个映射点上每个数字都减去上一个映射点(允许跨行)对应位置的数字(如果映射点元素个数不足 5，即名称索引为0，则省略部分按 0 处理)，最后得到：

```javascript
    mappings: [
    [
      [1, 0, 2, 5, 1],   // 不变
      [1, 0, 1, 1, -1]    // 1 = 2 - 1, 0 = 0 - 0, 1 = 3 - 2, 1 = 6 - 5, 1 = 0 - 1
    ],
    [
      [3, 0, -1, -3, 0]  // 3 = 5 - 2,  0 = 0 - 0, -1 = 2 - 3, -3 = 3 - 6, 0 = 0 - 0
    ]
]
```

2.2 合并数字  
将 mappings 中出现的所有数字写成一行，不同映射点使用,(逗号)隔开，不同的行使用;(分号)隔开。

```javascript
    1 0 2 5 1 , 1 0 1 1 1 ; 3, 0 , -1, -3, 0
```

2.3 编码数字
对于每个数字，都使用 Varibale Length Quantity [VLQ](https://en.wikipedia.org/wiki/Variable-length_quantitys) 编码 将其转为字母，具体转换方式为：

> 1. 如果数字是负数，则取其相反数。
> 2. 将数字转为等效的二进制。并在末尾补符号位，如果数字是负数则补 1 否则补 0。
> 3. 从右往左分割二进制，一次取 5 位，不足的补 0。
> 4. 将分好的二进制进行倒序。
> 5. 每段二进制前面补 1，最后一段二进制补 0。这样每段二进制就是 6 位，其值范围是 0 到 64(含0，不含64)。
> 6. 根据 Base64 编码表将每段二进制转为字母：  

  ![base](./images/base64.png)

0-15 与 15之后直接的编码并不相同
  以 5，16 为例，  
5:

> 1. 转为二进制即：101
> 2. 5 是正数，右边补 0：1010
> 3. 将整个数每隔5位,小于5直接保持， 01010。
> 4. 转为十进制：10。
> 5. 查表得到：K

16:

> 1. 转为二进制即：10000
> 2. 16 是正数，右边补 0：100000
> 3. 将整个数每隔5位,从右往左分割二进制：1, 00000。
> 4. 不足 5 位的补 0：00001,  00000
> 5. 倒序：00000, 00001
> 6. 除最后一个前面补 0，其它每段前面补 1：100000, 000001
> 7. 转为十进制：32, 1。
> 8. 查表得到：gB
  
2.4 合并结果
将第2.2步中的每个数字进行 VLQ 编码再拼接就是最终的结果。

``` javascipt
    CAEKC,CACCC;GADHA
```

---

## Reference

- [源映射(Source Map)详解 - 博客园 - xuld](https://www.cnblogs.com/xuld/p/5882677.html)
- [JavaScript Source Map 详解 - 阮一峰](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
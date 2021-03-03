# 词法分析和类型

## unicode
- BMP 四位内的unicode码
## 操作
- 查看一个字符的unicode码

```js

    let charC = str.charCodeAt();  //能用16位表示的 最大0xFFFF
    let codeP = str.codePointAt();

```
** *这个api得到的并不是unicode编码，而是编译器当前编码（多为UTF-8）下的编码表示。
比如，`a`的unicode编码是61（十六进制） 但是在UTF-8下是97(十进制)。

十进制换十六进制可以用toString

- 根据unicode码得到对应的字符
直接输出就可以


## 词法分析

![](InputElement.svg)

## 类型

![](Type.svg)

### Number
  - DecimalLiteral
    - 0
    - 0.1
    - .2
    - 1e3
  - BinaryIntegerLiteral
    - 0b111
  - OctalIntegerLiteral
    - 0o10
  - HexIntegerLiteral
    - 0xFF
    - \uffff
    - \xff


### String
 - character   a
 - codePoint  97
 - encoding  `0110 0001`
    - ASCII
    - Unicode
    - UCS U+0000 ~ U+FFFF
    - GB
      - GB2312
      - GBK
      - GB18030
    - ISO-8859
    - BIG5
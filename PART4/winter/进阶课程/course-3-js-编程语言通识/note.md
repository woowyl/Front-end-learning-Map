# 通识

## 语言按语法分类

- 非形式语言
  - 中文 英文

- 形式语言 （乔姆斯基谱系）
  - 0型  无限制文法
  - 1型  上下文相关文法
  - 2型  上下文无关文法
  - 3型  正则文法

## 产生式 

- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称终结符
  - 复合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- `*` 表示重复多次
- `|` 表示或
- `+` 表示至少一次

## 产生式（BNF）

- 四则运算
- 1 + 2 * 3

## 练习题  

    编写一个带括号的四则运算

``` bash
<Number> = "0" | "1" | "2" | ..... | "9"

<DecimalNumber> = "0" | (("1" | "2" | ..... | "9") <Number>* )

<PrimaryExpression> = <DecimalNumber> |
    "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <PrimaryExpression> | 
    <MultiplicativeExpression> "*" <PrimaryExpression>| 
    <MultiplicativeExpression> "/" <PrimaryExpression>

<AdditiveExpression> = <MultiplicativeExpression> | 
    <AdditiveExpression> "+" <MultiplicativeExpression>| 
    <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> | 
    <LogicalExpression> "||" <AdditiveExpression> | 
    <LogicalExpression> "&&" <AdditiveExpression>
```

## 练习 尽可能寻找你知道的计算机语言，尝试把他们分类


## 图灵完备性

- 图灵完备性
  - 命令式 —— 图灵式子
    - goto
    - if 和 while

  - 声明式 —— lambda
    - 递归

## 动态与静态

- 动态
  - 在用户的设备/在线服务器上
  - 产品实际运行时
  - Runtime

- 静态
  - 在程序员的设备上
  - 产品开发时
  - Compiletime

## 类型系统

- 动态类型系统与静态类型系统
- 强制型（无隐式转换）与弱类型（有隐式转换）
  - String + Number
  - String == Boolen
- 复合类型
  - 结构体
  - 函数签名
- 子类型
  - 逆变/协变

## 一般命令式编程语言

1. Atom
    - Identifier
    - Literal

2. Expression
    - Atom
    - Operator
    - Punctuator

3. Statement
    - Expression
    - Keyword
    - Punctuator

4. Structure

    - Function
    - Class
    - Process
    - Namespace

5. Program
    - Program
    - Module
    - Package
    - Library

## 重学JavaScript

语法 ====语义===> 运行时
# Easy Less 在VScode中的使用

## 概览

使用Easy LESS插件，可以在VS Code中轻松使用LESS文件.  
无需单独添加编译任务，它可以根据[LESS stylesheet](http://lesscss.org/)进行“保存时编译”。

## 功能特点

- 默认配置下，在你保存`.less`文件时，在同目录下自动生成`.css`文件  
eg: `style.less` --> `style.css`

- 编译时错误和语法错误都将作为错误列表输出

- 在默认设置的基础上，还可按需做如下修改：

  - 支持针对IDE，用户，单文件等不同层面的设置
  - 支持主文件设置，抽出公共样式
  - 可修改编译后输出文件的位置和名字(默认生成当前目录下同名文件)
  - 可对生成css进行压缩

## 默认设置

  - 项目里所有`.less`文件在保存时自动编译

  - 生成文件和`.less`同目录

  - Souce maps（.css.map 文件）默认不输出

  - 默认不进行文件压缩
  
  - Auto-prefixer默认关闭

## 基础用法

 1. 创建一个`.less`文件

 2. `Ctrl/Cmd` + `S`保存文件

 3. `.css`文件会自动生成

 4. 可通过底部状态栏的信息： “Less Compile in Xms” 查看编译状态

 ## 进阶用法

 ### 项目配置和全局配置

  - 通过使用标准`setting.json`文件来实现单个项目范围内的配置

  - `setting.json`必须放在和项目`.vscode`目录下

  - 除此之外，也可以在`User Setting`(Cmd+, => 搜索easy less)中修改全局设置，设置后无需每个项目重复配置，方便但缺少灵活性

  - `setting.json` 使用 `"less.compile"`作为key

  - `setting.json`示例

    ```json
      {    
          "less.compile": {
              "compress":  true,  // true => 去除空格
              "sourceMap": true,  // true => 生成soucemap
              "out":       false, // false => 不输出.css文件 可修改
          }
      }
    ```
 
 ### 单文件配置

 - 也可通过在`.less`文件的第一行添加注释来实现指定文件的设置

 - 设置以逗号分隔，不加引号。

 - demo
    ``` less
      // out: ../dist/app.css, compress: true, sourceMap: false

      body, html {
        ...
      }
    ```

 ### 具体设置

  `main: {filepath: string | string[] }`

   - 将会对filepath中指定的文件进行编译，而不是当前文件

   - 其他的设置将会被忽略

   - filepath填写当前文件的相对路径

   - 可以指定多个主文件  


  `out: { boolean | filepath: string | folderpath: string}`

  - 指定生成`.css`文件的目录路径

  - 如果文件路径中指定了文件名，会自动生成一个指定名字的`.css`的文件

  - 如文件路径中没有指定文件名，默认使用当前`.less`的文件名

  - 使用当前目录的相对路径


 `outExt: { string }`

  - 默认的后缀名是`.css`

  - 允许指定生成文件的后缀名 （例如使用`.wxss`替代`.css`）
  
  - `.map`文件也会做相应改变 (例如：.wxss.map）

`compress: { boolean }`

  - 是否在编译时去除空格

`relativeUrls: { boolean }`
  - 是否要替换通过`@import`引入的文件中的路径

  - 对 `out` 设置没有影响

  - 举例，在有如下的文件结构下，设置为`ture`:    

  `/main.less`  
  `/css/feature/feature.less`  
  `/css/feature/background.png`

 ***

  /main.less:

  ``` less
  // relativeUrls: true
  @import "css/feature/feature.less";
  ```
  /css/feature/features.less:

  ```less
  // main: ../../main.less
  .feature {
      background-image: url(background.png)
  }
  ```
  /main.css: (output)

  ```less
  .feature {
      background-image: url('css/feature/background.png')
  }
  ```

`autoprefixer: { string | string[] }`

- 添加此配置后，自动打开less的`autoprefixer`插件，**无需再次添加**

- 插件可以按照配置的规则自动添加/去除兼容前缀

- `.vscode/setting.json`配置demo
  ``` json
  {    
     "less.compile": {
          "autoprefixer": "> 5%, last 2 Chrome versions, not ie 6-9"
      }
  }
  ```
- 详情配置查看[这里](https://github.com/ai/browserslist#queries)

- *注意* 和全局配置不同，如果在单文件里使用autoprefixer, 选项要以分号';'分割，且不加引号。

 ## 设置的层级顺序

 多层设置下，将按如下顺序进行读取和应用设置

 1. 全局`User Setting`

 2. 项目层面的`setting.json`

 3. 文件中的设置
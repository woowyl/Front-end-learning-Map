## 关于CommonJs
CommonJs是在服务器端运行，通过require()语法去加载相应的文件，且文件中的变量互补影响。
### 一、require() 的基本用法
当 Node 遇到 require(X) 时，按下面的顺序处理。  
``` java
（1）如果 X 是内置模块（比如 require('http'）) 
　　a. 返回该模块。 
　　b. 不再继续执行。

（2）如果 X 以 "./" 或者 "/" 或者 "../" 开头 
　　a. 根据 X 所在的父模块，确定 X 的绝对路径。 
　　b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
        X  
        X.js
        X.json
        X.node
　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。

        X/package.json（main字段）
        X/index.js
        X/index.json
        X/index.node
（3）如果 X 不带路径 
　　a. 根据 X 所在的父模块，确定 X 可能的安装目录。 
　　b. 依次在每个目录中，将 X 当成文件名或目录名加载。

（4） 抛出 "not found"

```
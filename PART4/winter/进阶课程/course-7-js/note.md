# JS

## JS执行粒度
- JS Context => Realm
- 宏任务
- 微任务
- 函数调用
- 语句/声明
- 表达式
- 直接量/变量/this


### Realm  从上到下 依此变小
 - JS Context => Realm
 - 宏任务
 - 微任务
 - 函数调用 (Execution Context)
 - 语句/声明
 - 表达式
 - 直接量/变量/this ...

### Execution Context
 - code evaluation state
 - Function 
 - Script or Module
 - Generator
 - Realm
 - LexicalEnvironment
 - VariableEvniorment

#### LexicalEnviroment
 - this
 - new.target
 - super
 - 变量


#### VariableEnvironment
VariableEnviroment是个历史遗留包袱，仅仅用于处理var声明。



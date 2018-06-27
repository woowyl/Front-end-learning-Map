# History

## 1、添加了三个跳转的方法
- back()       向后一页
- forward()    向前一页
- go([num])    //向前num>0 或向后 num<0 跳转 |num| 页
具体用法比较直观，window.history.back() / History.back()   

## 2、添加了两个修改history的方法

- pushState(state, title, [,url]) : 往历史堆栈的顶部添加一个状态,也就是修改当前的url,但是并不做跳转,跳转需要再写语句去控制。pushState() 带有三个参数：一个状态对象，一个标题（现在被忽略了），以及一个可选的URL地址。state为一个对象或null，它会在触发window的popstate事件（window.onpopstate）时，作为参数的state属性传递过去,也可在参数指定的url页面的history对象里发现它；如果你像pushState() 方法传递了一个序列化表示大于640k 的state对象，这个方法将扔出一个异常。如果你需要更多的空间，推荐使用sessionStorage或者localStorage。title为页面的标题，但当前所有浏览器都忽略这个参数。URL为页面的URL，不写则为当前页；<span style="color:red">新URL必须和当前URL在同一个源下；</span>否则，pushState() 将丢出异常。 

- replaceState(state, title, [,url]) : 更改当前页面的历史记录值。参数同上。这种更改并不会去访问该URL。

## 3、popstate事件
window.onpopstate是popstate事件在window对象上的事件处理程序.

每当处于激活状态的历史记录条目发生变化时,popstate事件就会在对应window对象上触发. 如果当前处于激活状态的历史记录条目是由history.pushState()方法创建,或者由history.replaceState()方法修改过的, 则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝.

<span style="color:red">调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发</span>, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).

当网页加载时,各浏览器对popstate事件是否触发有不同的表现,Chrome 和 Safari会触发popstate事件, 而Firefox不会.
#  跨域的问题

为什么要写这篇博客？
> 最近在准备课件的时候，遇到了问题。为了能更好演示异步加载ajax在实际项目里的应用，我找了一些公用的api接口。但是在本地调用时发现，有跨域问题。紧接着我又试了通过ajax读取本地的json文件，仍然有这个问题。之前也遇到过跨域的问题，但是都没有认真去总结它可能出现的场景，只知道这是一个安全策略，可以通过后端接口去解决，前端也有jsonp的方案，那么他们具体有哪些不同，需要深入实践。这就是这篇博客的诞生背景。

#
## 一、什么是跨域

之所以有跨域是因为*浏览器*的同源策略。想要知道什么是跨域，就要先知道什么是浏览器的同源策略,跨域问题只会出现在浏览器里。
#### 1.1 同源策略定义
> 同源策略（Same origin policy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。
 -百度百科

简单讲，1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。

### 1.2 同源的例子
最初，它的含义是指，A网页设置的 Cookie，B网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"三个相同"。

- 协议相同
- 域名相同
- 端口相同

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80（默认端口可以省略）`。它的同源情况如下。

- http://www.example.com/dir2/other.html：同源
- http://example.com/dir/other.html：不同源（域名不同,包括二级域名）
- http://v2.www.example.com/dir/other.html：不同源（域名不同）
- http://www.example.com:81/dir/other.html：不同源（端口不同）
#
## 二、为什么要有跨域

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

设想这样一种情况：A网站是一家银行，用户登录以后，又去浏览其他网站。如果其他网站可以读取A网站的 Cookie，会发生什么？

很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

由此可见，"同源政策"是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。
#
## 三、遇到跨域我们该如何解决

先来看看，同源策略下，造成了哪些影响。
随着互联网的发展，"同源政策"越来越严格。目前，如果非同源，共有三种行为受到限制。

- Cookie、LocalStorage 和 IndexDB 无法读取。
- DOM 无法获得。
- AJAX 请求不能发送。

虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响。下面，我将详细介绍，如何规避上面三种限制。

### 3.1 cookie localStorage
Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。但是，两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置document.domain共享 Cookie。

举例来说，A网页是`http://w1.example.com/a.html`，B网页是`http://w2.example.com/b.html`，那么只要设置相同的`document.domain`，两个网页就可以共享Cookie。

``` java
document.domain = 'example.com';
```
现在，A网页通过脚本设置一个 Cookie。

``` java
document.cookie = "test1=hello";
```
B网页就可以读到这个 Cookie。

``` java
var allCookie = document.cookie;
```
注意，这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法，规避同源政策，而要使用下文介绍的PostMessage API。

另外，服务器也可以在设置Cookie的时候，指定Cookie的所属域名为一级域名，比如`.example.com。`
``` java
Set-Cookie: key=value; domain=.example.com; path=/
```
这样的话，二级域名和三级域名不用做任何设置，都可以读取这个Cookie。


### 3.2 DOM 无法获取

### 3.3 AJAX 请求

同源政策规定，AJAX请求只能发给同源的网址，否则就报错。

除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

- JSONP
- WebSocket
- CORS

##### 3.3.1 Jsonp
利用了`script`标签src,link标签href可以跨域的原理

##### 3.3.2  WebSocket

##### 3.3.3 CORS
在要访问的服务器端添加允许跨域访问Http 头
```javascript
    response.writeHead(200, {
        "Access-Control-Allow-Origin": '*'
    });
```
##### 3.3.3.1 CORS预请求
设置了`Access-Control-Allow-Origin`头只会是否所有的请求都可跨域访问？  
答案是否定的，直接允许访问的条件有：
- 允许的方法：GET、HEAD、POST
- 允许的Content-Type: text/plain、multipart/form-data、application/x-www-form-urlencoded
- [请求头限制](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)
- XMLHttpRequestUpload对象均没有注册任何事件监听器
- 请求中没有使用ReadableStream对象

如不满足上述条件，需要进行预请求：
通过向Head里添加各个参数  
```javascript
    response.writeHead( 200, {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Header": 'X-Test-Cors',
        "Access-Control-Allow-Methods": 'POST, PUT, DELETE'
        "Access-Control-Max-Age": '1000'  //预访问命中后 下次间隔允许时间
    });
```


Reference:
[浏览器同源政策及其规避方法-阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html);

[跨域资源共享 CORS 详解-阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/04/cors.html);
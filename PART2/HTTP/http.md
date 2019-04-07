## 1. URI  URN URL
 URI
 - Uniform Resource Identifier /统一资源标识符
 - 包括URL  URN

 URL
 - Uniform Resource Locator /统一资源定位器

 URN
 - 永久统一资源定位符
 - 在资源移动之后还能被找到
 - 目前还没有成熟的使用方案

## 2. HTTP报文

 - 请求报文
    - 首行 GET /test/hi-there.txt HTTP/1.0
    - 头  HEADER
 - 响应报文
    - 首行  HTTP/1.0 200 OK
    - 头 HEADER
    - 主体 body

### 2.1 HTTP 方法
- get
- post
- delete
- put
- ...
- option
- patch
- trace
- connect
- head

### 2.2 HTTP CODE

- 100-199 持续进行
   - 100 continue
   > 表示目前为止一切正常, 客户端应该继续请求, 如果已完成请求则忽略.
   - 101 switching protocol
   > 状态码表示服务器应客户端升级协议的请求（Upgrade请求头）正在进行协议切换。
     
     服务器会发送一个Upgrade响应头来表示其正在切换过去的协议。

- 200-299  成功
   - 200 OK
   - 201 created
   > 201 Created 是一个代表成功的应答状态码，表示请求已经被成功处理，并且创建了新的资源。新的资源在应答返回之前已经被创建。同时新增的资源会在应答消息体中返回，其地址或者是原始请求的路径，或者是 Location 首部的值。
   - 202 accepted
   > 表示服务器端已经收到请求消息，但是尚未进行处理。但是对于请求的处理确是无保证的，即稍后无法通过 HTTP 协议给客户端发送一个异步请求来告知其请求的处理结果。这个状态码被设计用来将请求交由另外一个进程或者服务器来进行处理，或者是对请求进行批处理的情形。
   - 203 non-authoritative Information
   > 表示请求已经成功被响应，但是获得的负载与源头服务器的状态码为 200 (OK)的响应相比，经过了拥有转换功能的 proxy （代理服务器）的修改。
   - 204 no content
   > 表示目前请求成功，但客户端不需要更新其现有页面。204 响应默认是可以被缓存的。在响应中需要包含头信息 ETag。
   - 205 reset content
   > 通知客户端重置文档视图，比如清空表单内容、重置 canvas 状态或者刷新用户界面
   - 206 partial content 
- 300-399  重定向
   - 300 multiple choices
   - 301 moved permanently
   > 说明请求的资源已经被移动到了由 Location 头部指定的url上，是固定的不会再改变。搜索引擎会根据该响应修正
   - 302 found
   > 表明请求的资源被暂时的移动到了由Location 头部指定的 URL 上。浏览器会重定向到这个URL， 但是搜索引擎不会对该资源的链接进行更新
   - 303 see other
   > 通常作为 PUT 或 POST 操作的返回结果，它表示重定向链接指向的不是新上传的资源，而是另外一个页面，比如消息确认页面或上传进度页面。而请求重定向页面的方法要总是使用 GET
   - 304 not modified
   - 307 temporary redirect
   - 308 permanent redirect
- 400-499  请求问题
   - 400 bad request
   >表示由于语法无效，服务器无法理解该请求。 客户端不应该在未经修改的情况下重复此请求。
   - 401 Unauthorized
   > 指的是由于缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。
   - 403 forbidden
   - 404 not found
   - 405 method not allowed
   - 406 not acceptable
   - 407 proxy authentication required
   - 408 request timeout
   - 409 conflict
   - 410 gone
   - 411 length required
   - 412 preconfition failed
   - 413 payload too large
   - 414 URI too long
   - 415 unsupported media type
   - 416 range not satisfiable
   - 417 expectation failed
   - 418 i'm a teepot
   - 422 unprocessable entity
   - 425 too early
   - 428 precondition required
   - 429 too many requests
   - 431 request header fields too large
   - 451 unavailable for legal reason
- 500-599  服务器端问题
   - 500 内部服务器错误
   - 501 not implemented
   > 请求的方法不被服务器支持，因此无法被处理。服务器必须支持的方法（即不会返回这个状态码的方法）只有 GET 和 HEAD。
   - 502 bad gateway
   > 它表示作为网关或代理角色的服务器，从上游服务器（如tomcat、php-fpm）中接收到的响应是无效的。
   - 503 service unavailable
   - 504 gateway timeout
   - 505 http version not support
   - 511 network authentication required

## 3. 缓存 Cache-Control

### 3.2 Cache-Control
### 3.1.1 可缓存性

 - public  表示返回的信息在返回途中的任何节点(代理节点)（DNS ）都可缓存
 - private 只有发起请求的设备可以缓存
 - no-cache 任何设备都不可以直接使用缓存,其实是已经缓存了数据(是否能拿来使用需要判断)，但要使用前必须要到服务器端上做过期判断。（和no-store做对比)

### 3.1.2 到期
- `max-age = <seconds>` 缓存信息的时间长短
- `s-maxage = <seconds>` 只在代理服务器中有效，且权重大于`max-age`
- `max-stale = <seconds>` 在发起端设置，浏览器无此设置，表示在max-age过期后，发起端仍然使用过期的缓存时间

### 3.1.3 重新验证 （浏览器使用的少）
- `must-revalidate` 设置了`max-age`的情况下，当缓存失效后必须去服务器重新获取
- `poxy-revalidate` 功能和`must-revalidate`相同，它作用在代理服务器上

### 3.1.4其他
- `no-store` 彻底不使用缓存
- `no-transform` 不许代理服务器对内容做一些操作（压缩等）

这些头信息只是一个规则规范的定义，但是没有强约束力，你可以按照规范去做，但是也可以不按照规范去做。

## 4. 验证 （基于cache-control: no-cache）
上一节里我们说明了，如果cache-control设置了`max-age`,则会根据时间直接使用缓存。当设置为`no-cache`之后，并不是不缓存，而是缓存了数据，但是是否使用需要配合几个其他的头信息。
那么当Cache-control设置为 no-cache后，如何验证客户端缓存是否可用?

### 4.1 Last-Modified 
- 上次修改时间
- 配合If-Modified-Since 或者 If-Unmodified-Since
   - If-modified-since 在request header里，是上一次respone返回的last-modified值
- 对比上次修改时间以验证资源是否需要更新

### 4.2 Etag
- 数据签名 
- 配合If-Match 或者 If-Non-Match使用
 - If-Match 在request header里，是上一次respone返回的Etag值
- 对比资源的签名判断是否使用缓存


## 5 Cookie 和 Session

### 5.1 cookie
 - 通过 Set-cookie设置
 - 下次请求 在同域下会自动带上
 - 键值对，可以设置多个


### 5.2 cookie 属性
 - max-age 和 expires设置过期时间，默认关闭浏览器关闭消失
 - secure只在https的时候发送
 - httpOnly 无法通过js(document.cookie)访问cookie提高安全性
 - domain [;domain=test.com]  a.test.com 可以拿到 test.com下的cookie
   - a.test.com 不能给 test.com 设置cookie
   - 要在test.com下给test.com设置cookie
   - X.test.com 可以拿到test.com的cookie

 ## 6、长链接
   http 链接建立之前需要创建一个tcp，如果这个tcp一定时间内没有数据交换，服务器出于并发数量的考虑，会关闭掉这个tcp链接。但是重新建立一次tcp需要三次握手，仍然是一个比较消耗时间和性能的方式，所以会考虑修改tcp的保持时长，这便是建立一个“长”链接。

 ### 链接数限制
  在chrome里，一次最多允许建立的链接数量是6个。如果同时发出的并发数在6个之内，则同时加载。大于6个之后，需要等待之前的加载完成之后进行。这就是waterfall图形里的`Stalled`时间。
 ### Connection: keep-alive / close
 默认情况下是keep-alive
 ### HTTP2 信道复用：
 一个网站（同一域名下）只需要一个TCP链接，在这个链接下进行数据的传递。


## 7、数据协商
> 客户端发送给服务端请求时，客户端会声明其希望拿到的数据格式和数据相关的一些限制。服务器会根据这些请求，返回不一样的数据。

### 7.1 分类
### 7.1.1 请求
   - Accept:          `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3`
   - Accept-Encoding : `gzip, deflate, br`
   - Accept-Language:  `zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7`
   - User-Agent:       `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`
   
### 7.1.2 返回
   - Content
   - Content-Type
   - Content-Encoding
   - Content-Language

## 8、redirect
指请求的资源地址发送改变后，客户端仍然发送了旧的资源地址，这时服务器就需要告诉客户端地址已发生改变，并返回新的地址。
nodejs的实现：

```javascript
http.createServer(function(request, response) {
   response.writeHead(302, {
      'Location': '[/new_url]'
   });

   response.end();
});
```


## 9、CSP 内容安全策略 Content-Security-Policy
### 9.1 作用
 - 限制资源获取
 - 报告资源获取越权
### 9.2 限制方式
 - default-src 限制全局
 - 指定资源类型
   - connect-src
   - img-src
   - script-src
   - font-src
   - ...
 ### 9.3使用方式
 nodejs的实现：

```javascript
http.createServer(function(request, response) {
   response.writeHead(200, {
      'Content-Security-Plicy': 'default-src http: https:'
   });

   response.end(html);
});
```
html内实现：
```html
<meta http-equiv="Content-Security-Policy" content="default-src http: https:">
```

通过这种方式可以限制html执行内部inline-js。

汇报错误： 
- Content-Security-Plicy-Report-Only : default-src http: https: report-uri /report
   仍然加载,
- Content-Security-Plicy: report-uri /report

 




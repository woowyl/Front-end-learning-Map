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

### 2.2 HTTP CODE
- 100-199
- 200-299
- 300-399
- 400-499

## 3. Cache-Control

### 3.1 可缓存性

 - public  表示返回的信息在返回途中的任何节点(代理节点)（DNS ）都可缓存
 - private 只有发起请求的设备可以缓存
 - no-cache 任何设备都不可以缓存,其实是缓存数据，但要使用前必须要到服务器端上做过期判断。和no-store做对比

### 3.2 到期
- `max-age = <seconds>` 缓存信息的时间长短
- `s-maxage = <seconds>` 只在代理服务器中有效，且权重大于`max-age`
- `max-stale = <seconds>` 在发起端设置，浏览器无此设置，表示在max-age过期后，发起端仍然使用过期的缓存时间

### 3.3 重新验证
- `must-revalidate` 设置了`max-age`的情况下，当缓存失效后必须去服务器重新获取
- `poxy-revalidate` 功能和`must-revalidate`相同，它作用在代理服务器上

### 3.4其他
- `no-store` 彻底不使用缓存
- `no-transform` 不许代理服务器对内容做一些操作（压缩等）

## 4. 验证，当Cache-control设置为 no-cache后，如何验证客户端缓存是否可用

### 4.1 Last-Modified 
- 上次修改时间
- 配合If-Modified-Since 或者 If-Unmodified-Since
- 对比上次修改时间以验证资源是否需要更新

### 4.2 Etag
- 数据签名 
- 配合If-Match 或者 If-Non-Match使用
- 对比资源的签名判断是否使用缓存


## 5 Cookie 和 Session

### 5.1 cookie
 - 通过 Set-cookie设置
 - 下次请求会自动带上
 - 键值对，可以设置多个


### 5.2 cookie 属性
 - max-age 和 expires设置过期时间，默认关闭浏览器关闭消失
 - secure只在https的时候发送
 - httpOnly 无法通过document.cookie访问

 ## 6、长链接

 ### Connection: keep-alive
 默认情况下是keep-alive



## 7、数据协商

### 7.1 分类

### 7.2 返回



 




# 浏览器工作原理

## 一个请求的过程
- URL => HTTP
- HTML parse
- DOM css computing
- DOM with CSS layout
- DOM with positon render
- Bitmap

## 网络协议
 - 四层
   - HTTP
      - 应用层
      - 表示层
      - 会话层
   - TCP
      - 传输层
   - Internet
      - 网络
   - 4G/5G/WIFI
      - 数据链路层
      - 物理层

## TCP 和 IP的一些基础知识
- TCP
   - 流
   - 端口
   - require('net')
- IP
   - 包
   - IP地址
   - libnet/libpcap     

## HTTP

1. HTTP协议 rfc2616 
[HTTP协议标准](https://tools.ietf.org/html/rfc2616)
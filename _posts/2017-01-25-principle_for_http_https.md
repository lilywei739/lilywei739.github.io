---
layout: post
title:  HTTP、HTTPS代理分析及原理 
subtitle: "HTTP、HTTPS代理分析及原理"
tags:
    - JS 
    - HTTP、HTTPS 
    - 网络  
---

曾经的一个面试题。没答下来，收录一下，文章参考《HTTP权威指南》一书。

#  HTTP、HTTPS代理分析及原理

## HTTP代理的原理 

HTTP代理服务器会自动提取请求数据包的HTTP Request数据，并且把HTTP Response的数据转发给发送请求的客户端；HTTP代理服务器使用的端口通常是8080，如下图所示：

![](https://lilywei739.github.io/img/20170125/20170125-1.jpg)

* 对于Web客户端来说，代理扮演的服务器角色，接收请求（Request），返回响应（Response）。
* 对于Web服务器来说，代理扮演的客户端角色，发送请求（Request），接收响应（Response）。


### HTTP 代理步骤

* 用户向代理发起TCP连接；
* 代理接收用户的连接，双方建立连接；
* 用户向代理发送HTTP请求，请求内容和没有HTTP代理的内容完全相同；
* 代理解析HTTP请求；
* 代理向服务器发起TCP连接；
* 服务器接收代理的连接；
* 代理向服务器发送HTTP请求（这个HTTP请求是基于用户的HTTP请求，可能会有修改）
* 服务器发送响应给代理；
* P发送响应给U；


### HTTP请求协议（不使用代理协议）报文：

```
GET / HTTP/1.1
Accept: application/x-ms-application, image/jpeg, application/xaml+xml, image/gif, image/pjpeg, application/x-ms-xbap, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
Accept-Language: zh-CN
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)
Accept-Encoding: gzip, deflate
Host: www.what21.com
Connection: Keep-Alive
Cookie: CNZZDATA1252995935=579722882-1456319452-%7C1472176395;
```


### HTTP请求协议（使用代理协议）报文：

```
GET http://www.what21.com/ HTTP/1.1
Accept: application/x-ms-application, image/jpeg, application/xaml+xml, image/gif, image/pjpeg, application/x-ms-xbap, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
Accept-Language: zh-CN
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)
Accept-Encoding: gzip, deflate
Proxy-Connection: Keep-Alive
Host: www.what21.com
Cookie: CNZZDATA1252995935=579722882-1456319452-%7C1472176395;
```

### 相关概念：

> Accept：请求报头域用于指定客户端接受哪些类型的信息。<br />
> Accept：text/html，表明客户端希望接受html文本。<br />
> Accept-Language请求报头域类似于Accept，但是它是用于指定一种自然语言。<br />
> User-Agent：请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器。如果不使用User-Agent请求报头域，服务器端就无法得知客户端的属性信息。<br />
> HTTP协议中Connection是用来对HTTP协议连接进行的说明，如果是多个说明，使用英文逗号分隔。<br />
> Proxy代表了代理。

### HTTP/1.1协议中共定义了8种方法（也叫“动作”）来以不同方式操作指定的资源：

* OPTIONS方法：这个方法可使服务器传回该资源所支持的所有HTTP请求方法。用'*'来代替资源名称，向Web服务器发送OPTIONS请求，可以测试服务器功能是否正常运作。
* HEAD方法：与GET方法一样，都是向服务器发出指定资源的请求。只不过服务器将不传回资源的本文部份。它的好处在于，使用这个方法可以在不必传输全部内容的情况下，就可以获取其中“关于该资源的信息”(元信息或称元数据)。
* GET方法：向指定的资源发出“显示”请求。使用GET方法应该只用在读取数据，而不应当被用于产生“副作用”的操作中，例如在Web Application中。其中一个原因是GET可能会被网络蜘蛛等随意访问。参见安全方法
*  POST方法：向指定资源提交数据，请求服务器进行处理(例如提交表单或者上传文件)。数据被包含在请求本文中。这个请求可能会创建新的资源或修改现有资源，或二者皆有。
* PUT方法：向指定资源位置上传其最新内容。
* DELETE方法：请求服务器删除Request-URI所标识的资源。
* TRACE方法：回显服务器收到的请求，主要用于测试或诊断。
* CONNECT方法：HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。通常用于SSL加密服务器的链接(经由非加密的HTTP代理服务器)。

connect方法的通常就是把服务器作为跳板机，让服务器直接代理客户端访问，然后把数据原原本本的返回给客户端，connect方法的原理就是TCP直连。

connect方法请求协议：

```
CONNECT http://www.what21.com:80/ HTTP/1.1
Accept: application/x-ms-application, image/jpeg, application/xaml+xml, image/gif, image/pjpeg, application/x-ms-xbap, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, */*
Accept-Language: zh-CN
User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)
Accept-Encoding: gzip, deflate
Proxy-Connection: Keep-Alive
Host: www.what21.com
```


### HTTP代理功能上名称的区别：
* 全匿名代理，不改变客户端的request fields（请求信息），使服务器端看来就像有个真正的客户浏览器在访问。客户端的真实IP是隐藏起来的。 
* 普通匿名代理，能隐藏客户端的真实IP，但会更改客户端的request fields（请求信息），服务器端有可能会被认为使用了代理。 
* 透明代理（简单代理），改变客户端的request fields（请求信息），并会传送真实IP地址。



### HTTPS代理

HTTPS代理有多种做法，通常使用CONNECT method，通过proxy建立一条隧道(隧道代理)，这样，proxy无法解密数据；此外，还有一种类似于中间人攻击的代理手法。

### HTTPS代理中CONNECT方法代理步骤


* 用户向代理发起CONNECT请求；
* 代理向Targe发起TCP连接请求；
* 代理向用户返回”HTTP/1.0 OK\r\n\r\n”，隧道建立完成；
* 代理转发用户的数据给Target，转发Target的数据给用户，直到任何一方连接结束；

如下图所示：

![](https://lilywei739.github.io/img/20170125/20170125-2.jpg)



详细的解释参考博文：

[HTTP 代理原理及实现（一）](https://imququ.com/post/web-proxy.html) <br />
[HTTP 代理原理及实现（二）](https://imququ.com/post/web-proxy-2.html)




---
layout: post
title: TypeScript (一) 
tags:
    - JS 
    - 前端  
---


## 什么是 TypeScript 

> TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。


## TypeScript 优势

TypeScript 增加了代码的可读性和可维护性

* 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
* 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
* 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等


## TypeScript 包容性强

* TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
* 即使不显式的定义类型，也能够自动做出类型推论
* 可以定义从简单到复杂的一切类型
* 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
* 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

## TypeScript 的缺点

* 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的东西。而且它的中文资料也不多
* 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
* 集成到构建流程需要一些工作量
* 可能和一些库结合的不是很完美


## 安装 TypeScript

* TypeScript 的命令行工具安装方法如下：

```
npm install -g typescript
```

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。


* 编译一个 TypeScript 文件：

```
tsc hello.ts
```


使用 TypeScript 编写的文件以 .ts 为后缀


## 一个完整的例子

一个hello.ts命名的TypeScript文件，代码如下

```
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));

```


然后执行

```
tsc hello.ts
```

会生成一个编译好的文件 hello.js

```
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```



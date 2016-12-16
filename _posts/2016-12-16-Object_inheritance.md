---
layout: post
title: js面向对象浅析之----继承  
---

# js面向对象浅析之----继承

Javascript里的继承是指子类能够继承父类的方法，可以重复使用，减少代码量。

当几个类都需要一个相似的方法时，使用继承可以从同一个类中继承相同的方法，而不用对每个类重复地复制粘贴了。



**Javascript中常用的两种继承方式：**

> 原型链继承（简称原型式的继承--对象间的继承） <br />
> 类式继承（构造函数间的继承）


## 类式继承

类式继承的特点就是使用函数声明类，通过new关键字创建实例。

```
function Blog(address) {
  this.address = address;
}

Blog.prototype.getAddress = function() {
  return this.address;
}

//new一个实例
var blog = new Blog('lilywei739.github.io');
blog.getAddress(); // 'lilywei739.github.io'

``` 


## 原型链继承


继承的结果有两个：一、获得父类的属性和方法；二、正确通过 instanceof 的测试。












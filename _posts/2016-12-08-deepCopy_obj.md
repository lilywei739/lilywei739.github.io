---
layout: post
title: 对象的克隆  
---



# 对象的克隆

之前同事问过我这个问题，但是当时没有回答出来，今天有时间梳理记录一下；

## 什么是对象？
> from W3School <br /> 
> JavaScript 中的所有事物都是对象：字符串、数值、数组、函数...

先看下面几种对象的克隆是什么情况：

```
//字符型
var a="abc";
var b=a;
b="def";
 
alert(a);   // "abc"
alert(b);   // "def"


//数值型
var a=1;
var b=a;
b=2;
 
alert(a);   // 1 
alert(b);   // 2 


//布尔型
var a=true;
var b=a;
b=false;
 
alert(a);   // true 
alert(b);   // flase 
```

你会发现上面几种，直接用“=”就能达到克隆的效果，再往下看。


```
// 数组类型的浅拷贝
var a=[1,2];
var b=a;
b.push(3);

alert(a);   // 1,2,3
alert(b);   // 1,2,3

```

数组这种引用类型的对象，用“=”来克隆时，只是多建立了一个指针，其实指向的是同一个对象。修改其中任何一个数组，另一个都会受到影响，这就是引用对象的特点。

那如何才能完整的克隆互不干扰呢？上代码


```
// 数组类型的克隆
var a=[1,2,[1,5]],
    b=[];
for(var i = 0; i < a.length; i = i + 1){
    b[i]=a[i];
}
b.push(3);

console.log(a);   // [1,2,[1,5]] 
console.log(b);   // [1,2,[1,5],3]
```

看似已经达到想要的效果了，但如果代码改一下的话，会发现这种写法还不可以，它只实现了一层的克隆：

```
var a=[1,2,[1,5]],
    b=[];
for(var i = 0; i < a.length; i = i + 1){
    b[i]=a[i];
}
b.push('str');
b[2][0] = 100;

console.log(a);   
console.log(b);  
```

![网页请求过程](https://lilywei739.github.io/img/20161209/20161209-1.jpg)

再换种写法：

```
function clone(obj){
    var o=[];
    for(var i = 0;i < obj.length; i = i + 1){
        if(typeof(obj[i])==="object"){
            o[i]=clone(obj[i]);
        }else{
            o[i]=obj[i];
        }
    }
    return o;
}

var a=a=[1,2,[1,5]],
    b=clone(a);
b[2][0] = 100;
console.log(a);
console.log(b);
```

![网页请求过程](https://lilywei739.github.io/img/20161209/20161209-2.jpg)

这回确实是达到了我们要的效果，但如果再改去一下代码，数组中加入对象类型再看下结果：


```
function clone(obj){
    var o=[];
    for(var i = 0;i < obj.length; i = i + 1){
        if(typeof(obj[i])==="object"){
            o[i]=clone(obj[i]);
        }else{
            o[i]=obj[i];
        }
    }
    return o;
}

var a=a=[1,2,{a: 1, b: 2}],
    b=clone(a);
b[2][0] = 100;
console.log(a);
console.log(b);
```

![网页请求过程](https://lilywei739.github.io/img/20161209/20161209-3.jpg)

结果改变了它的原有对象类型，不完美，再换种写法。

```
function clone(obj) {
    var result = (Object.prototype.toString.call(obj)==="[object Array]")? [] : {};
    for (var i in obj){
        if (typeof obj[i] === "object") {
            result[i] = clone(obj[i]); //递归赋值
        } else {
            result[i] = obj[i]; //直接赋值
        }
    }

    return result;
}


var a=[1,2,{'a':1},{1:'b',2:'c'}],
    b=clone(a);
b[2][0] = 100;
console.log(a);
console.log(b);
```

![网页请求过程](https://lilywei739.github.io/img/20161209/20161209-4.jpg)


这回看似完美了。


文章中只例举了Array，{}也是引用型对象，结果和Array一样。


最终整理如下：


```
function clone(obj) {
    var result;
    if (typeof(obj) === 'object') {
        var result = (Object.prototype.toString.call(obj)==="[object Array]")? [] : {};
        for (var i in obj){
            if (typeof obj[i] === "object") {
                result[i] = clone(obj[i]); //递归赋值
            } else {
                result[i] = obj[i]; //直接赋值
            }
        }
    } else {
	result = obj;
    }

    return result;
}
```









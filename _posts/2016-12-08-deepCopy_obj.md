---
layout: post
title: 对象的克隆  
---



# 对象的克隆

之前同事问过我这个问题，但是当时没有回答出来，今天有时间梳理记录一下；

## 什么是对象？
> from W3School <br /> 
> JavaScript 中的所有事物都是对象：字符串、数值、数组、函数...

## 对象的克隆又分哪几种？
> 浅克隆<br />
> 深克隆



## 对象的类型
javascript中一切实例都是对象，对象的类型又可以分为原始类型和引用类型两种。

**原始类型**

> Number<br />
> String<br />
> Boolean<br />
> underfined<br />
> null

**引用类型**

> Array<br />
> Object<br />
> Function

## 不同对象类型的克隆区别
1）原始对象的克隆，就相当于新建了一个新的对象，新的存储单元，两者互不干扰。

```
//字符型
var a="abc";
var b=a;
b="def";
 
alert(a);   // "abc"
alert(b);   // "def"
```

```
//数值型
var a=1;
var b=a;
b=2;
 
alert(a);   // 1 
alert(b);   // 2 
```

```
//布尔型
var a=true;
var b=a;
b=false;
 
alert(a);   // true 
alert(b);   // flase 
```

2）引用对象的拷贝，就相当于新建了一个指针，新老对象都指向了同一个对象，其中任何一个有修改，另一个必会受到影响。


```
// 数组类型的浅拷贝
var a=[1,2];
var b=a;
b.push(3);

alert(a);   // 1,2,3
alert(b);   // 1,2,3
```

由上可知，原始数组a，克隆数组b，修改了克隆数组b，但也同时修改了原始数组a，这就是引用对象的特点。

那上面的例子怎样才能完整的拷贝呢？就是上文提到的----**深拷贝**。

```
// 数组类型的深拷贝
var a=[1,2],
    b=[];
for(var i = 0; i < a.length; i = i + 1){
    b[i]=a[i];
}
b.push(3);
 
console.log(a);   // [1,2]
console.log(b);   // [1,2,3]
```


```
// 对象类型的深拷贝
var x={a:2,b:4},
    y={},
    i;
for(i in x){
    y[i]=x[i];
}
y.c=6;
 
console.log(x);   // Object {a: 2, b: 4} 
console.log(y);   // Object {a: 2, b: 4, c: 6}
```


### 思路

通过上面的例子可以看出，要克隆引用型对象必须采用深克隆，包括对象的值也是一个对象的话，也要进行深克隆；原始类型对象直接用“=”就能拷贝。

思路如下：

> 1、首先遍历所有该对象的属性<br />
> 2、如是该属性是object，则特殊处理<br />
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) 如是该对象是个数组，就创建一个新的数组并深克隆数组里的元素<br />
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) 如果是非数组对象，就对它递归调用深克隆方法<br />
> 3、如果不是object,就直接“=”克隆


### 实现：

```
function cloneObject(src) {
    var result ;//返回的复制后的结果。
    if (typeof(src)==="object"){
        //对象为日期对象时也直接赋值。
        if(Object.prototype.toString.call(src)==="[object Date]"){
            result = src;
        }else{
            //判断对象的类型是Array还是Object，结果类型更改。
            result = (Object.prototype.toString.call(src)==="[object Array]")? [] : {};
            for (var i in src){
                if (src.hasOwnProperty(i)) { //排除继承属性
                    if (typeof src[i] === "object") {
                        result[i] = cloneObject(src[i]); //递归赋值
                    } else {
                        result[i] = src[i]; //直接赋值
                    }
                }
            }
        }
    }else{
        //对于原始类型直接赋值。
        result = src;
    }
    return result;
}
```








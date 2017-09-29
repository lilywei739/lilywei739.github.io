---
layout: post
title: JS基础--高阶函数（一） 
category: ['JS'] 
---



# JS基础--高阶函数（一） 

有一种函数，它可以接受另一个函数作为参数，这种函数，我为称之为高阶函数（Higher-order function）。
经常在写的带callback的函数，就是属于高阶函数；如常见的setTimeOut、setInterval、Array.sort都是高阶函数；

### 使用场景 

在很多程序中，有一些基本的算法会被编写多次，但是可能每次稍有不同。这就是发挥使用函数作为参数所长的地方。

可以做的事情是将算法的基本结构编写到一个函数中。然后，对少许部分进行修改，并将其作为函数参数补充回来。这样可以在一个函数中增加很多可定制的因素。

还可以添加其他函数参数为将来进行扩展。这种组合函数可以减少编程的冗余，通过扩展，还可以减少在一个程序中反复编写相同的算法所引起的错误。


如果在代码中出现大量重复或者相似的地方，那么就很有可能可以用高阶函数来代替。

举个例子：

1、程序一：使用英文字母构造一个字符串：

```
var aIndex = 'a'.charCodeAt(0); //97

var alphabet = "";
for(var i = 0; i < 26; i++){
    alphabet += String.fromCharCode(aIndex + i)
}
alphabet; // "abcdefghijklmnopqrstuvwxyz"
```

2、程序二：生成一个包含数字的字符串:

```
var digits = "";
for(var i = 0; i < 10; i++){
    digits += i;
}
digits; //"0123456789"
```

3、程序三：再创建一个随机的字符串：

```
var random = "";

for(var i = 0; i < 8; i++){
    random += String.fromCharCode(Math.floor(Math.random()*26) + aIndex);
}
random; //"qejkoitv"
```


上面三段代码都用共同的逻辑。每个循环都是通过连接每个独立部分的积算结果来创建一个字符串。可以提取出共用的部分，将它们移到单个工具函数里：


```
function buildString(n, callback){
    var result = "";
    for(var i = 0; i < n; i++){
        result += callback(i);
    }
    return result;
}
```

buildString函数的实现包含了每个循环的所有共用部分，并使用参数来替代变化的部分。循环迭代的次数由变量n来替代，每个字符串片段的构造由callback函数替代。那么以上三个例子就可以简化如下：


```
var alphabet = buildString(26, function(i){
    return String.fromCharCode(aIndex + i);
});

var digits = buildString(10, function(i){
    return i;
});

var random = buildString(8, function(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + aIndex);
});
```


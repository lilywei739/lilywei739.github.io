---
layout: post
title: JS基础--字典 
category: ['JS'] 
---




# 字典 


##### 什么是字典？

> 字典是一种以键 - 值对形式存储数据的数据结构，就像电话号码簿里的名字和电话号码一样,要找一个电话时，先找名字，名字找到了，紧挨着它的电话号码也就找到了。这里的 键是指你用来查找的东西，值是查找得到的结果。


Dictionay 类的基础是 Array 类，而不是 Object 类，所以某些方法是不能执行的，这里只注重思想

```
function Dictionary() {
    this.datastore = new Array();
    this.add = add; 
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
}
```

* 向列表添加元素

```
function append(ele) {
    this.store[this.listSize++] = ele;
}
```

* add方法--两个参数:键和值

```
function add(key, value) {
    this.datastore[key] = value;
}
```

* find 方法

该方法以键作为参数，返回和其关联的值

```
function find(key) {
    return this.datastore[key];
}
```


* remove 方法

从字典中删除键 - 值对需要使用 JavaScript 中的一个内置函数:delete。该函数是 Object 类的一部分，使用对键的引用作为参数。该函数同时删掉键和与其关联的值。

在这里要新建一个remove方法，delete掉索引所对应的值 

```
function remove(key) {
    delete this.datastore[key];
}
```


* showAll 方法

显示字典中所有的键 - 值对

调用 Object 类的 keys() 方法可以返回传入参数中存储的所有键

```
function showAll() {
    for(var key in Object.keys(this.datastore)) {
       print(key + " -> " + this.datastore[key]);
    }
}
```

* count 方法

能知道字典中的元素个数

```
function count() {
    var n = 0;
    for(var key in Object.keys(this.datastore)) {
       ++n;
    }
    return n; 
}
```

* clear 方法

```
function clear() {
    for each (var key in Object.keys(this.datastore)) {
       delete this.datastore[key];
    }
}
```

* 添加排序功能


字典的主要用途是通过键取值，无须太关心数据在字典中的实际存储顺序。但如果要做到一个有序的字典，该如何规划？我们都知道数组是可以排序的。

```
var a = new Array();
a[0] = "Mike";
a[1] = "David";
console.log(a); //显示Mike,David a.sort();
console.log(a); //显示David,Mike
```

但是上面这种做法对以字符串作为键的字典是无效的，程序会没有任何输出。这和前面定义 count() 方法时碰到的情况一样，不过，这也不是大问题。用户关心的是显示字典的内容时，结果是有序的。可以使用Object.keys() 函数解决这个问题


```
function showAll() {
    for(var key in Object.keys(this.datastore).sort()) {
       console.log(key + " -> " + this.datastore[key]);
    }
}
```

巧妙之处就是从数组 datastore 拿到键后，调用 sort() 方法对键重新排了序，以达到排序的功能。









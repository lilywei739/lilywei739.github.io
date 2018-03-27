---
layout: post
title: basic-knowledge(一).md 
category: ['JS'] 
---


# 项目小知识点


项目中用到的一些小知识点，用于记录一下：

1、 数组去重 

```
var arr = [1,10,4,6,10,9,8,6,10]

    // 从前向后逐个比较，相同的删除
    Array.prototype.distinct1 = function () {
        var arr = this;
        for(var i=0; i<arr.length; i++) {
            for(var j=i+1; j<arr.length; j++) {
                if(arr[i] === arr[j]) {
                    arr.splice(j,1)
                    j = ++i;
                }
            }
        }
        return arr
    }

    // 从前向后比较，不相同的push到新数组
    Array.prototype.distinct2 = function () {
        var arr = this;
        var temp = [];
        for(var i=0; i<arr.length; i++) {
            for(var j=i+1; j<arr.length; j++) {
                if(arr[i] === arr[j]) {
                    j = ++i;
                }
            }
            temp.push(arr[i])
        }
        return temp
    }

    // 利用对象属性名不能重复的特性
    Array.prototype.distinct3 = function () {
        var obj = {};
        var arr =this;
        var temp = [];
        for(var i=0; i<arr.length; i++) {
            if(!obj[arr[i]]) {
                temp.push(arr[i])
                obj[arr[i]] = 1;
            }
        }
        return temp
    }

    // 利用indexOf 如果无法匹配到相同的，push进新数组
    Array.prototype.distinct4 = function () {
        var arr = this;
        var temp = [];
        arr.forEach(function (item, i) {
            var num = arr.indexOf(item, i+1)
            if(num === -1) {
                temp.push(item)
            }
        })
        return temp
    }
```

 


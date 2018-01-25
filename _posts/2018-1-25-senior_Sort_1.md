---
layout: post
title: JS基础--高级排序(一) 
category: ['JS'] 
---


# 高级排序--- 希尔排序

本章讲解的高级排序算法，通常被认为是处理大型数据集的最高效排序算法，它们处理的数据集可以达到上百万个元素，而不仅仅是几百个或者几千个。

### 希尔排序 

这个算法在插入排序的基础上做了很大的改善。希尔排序的核心理念与插入排序 不同，它会首先比较距离较远的元素，而非相邻的元素。和简单地比较相邻元素相比，使 用这种方案可以使离正确位置很远的元素更快地回到合适的位置。当开始用这个算法遍历 数据集时，所有元素之间的距离会不断减小，直到处理到数据集的末尾，这时算法比较的 就是相邻元素了。


```
//希尔排序
function shellsort() {
    for (var g = 0; g < this.gaps.length; ++g) {
       for (var i = this.gaps[g]; i < this.dataStore.length; ++i) {
          var temp = this.dataStore[i];
          for (var j = i; j >= this.gaps[g] &&
                this.dataStore[j-this.gaps[g]] > temp;
               j -= this.gaps[g]) {
             this.dataStore[j] = this.dataStore[j - this.gaps[g]];
          }
          this.dataStore[j] = temp;
       }
        document.write('<br />');
        document.write(this.toString());
        document.write('<br />');
    } 
}

function setGaps(arr) {
    this.gaps = arr;
}

```

为了能让这个程序在 CArray 类测试平台中运行，我们需要在这个类的定义里增加一个对间 隔序列的定义。请将下面代码添加到 CArray 的构造函数中

```
this.gaps = [5,3,1];
```


外循环控制间隔序列的移动。也就是说，算法在第一次处理数据集时，会检查所有间隔为 5 的元素。下一次遍历会检查所有间隔为 3 的元素。最后一次则会对间隔为 1 的元素，也 就是相邻元素执行标准插入排序。在开始做最后一次处理时，大部分元素都将在正确的位 置，算法就不必对很多元素进行交换。这就是希尔排序比插入排序更高效的地方。下图演示了如何使用间隔序列为5, 3, 1的希尔排序算法。


**希尔排序原理图：**

![](https://lilywei739.github.io/img/20180125/20180125-1.jpg)



初始化一个例子，对10个数字进行希尔排序，跟踪这个算法的执行过程


```
    var nums = new CArray(100);
    nums.setData();
    document.write("希尔排序前:<br />"); 
    document.write(nums.toString()); 
    document.write("<br />希尔排序中:<br />"); 
    nums.shellsort();
    document.write("<br />希尔排序后:<br />"); 
    document.write(nums.toString());
```

![](https://lilywei739.github.io/img/20180125/20180125-2.jpg)

要理解希尔排序是如何运行的，可以对比数组的初始状态和执行完间隔序列为 5 的排序后的状态。初始状态时的第一个元素 6，和它后面的第 5 个元素 5，进行了互换，因为 5 < 6。

再来比较 gap 5 和 gap 3 这两行。在 gap 5 这行中的数字 3 和数字 2 进行了互换， 因为 2 < 3，并且 2 是 3 后面的第 3 个元素。从循环中当前元素所在位置往后数，简单地数到第 gap 个数的位置，然后比较这个位置和当前元素所在位置上的两个数字，就可以对希 尔排序过程中的任何步骤进行跟踪。

### 动态计算间隔序列的希尔排序


《算法(第4版)》(人民邮电出版社)的合著者Robert Sedgewick定义了一个shellsort() 函数，在这个函数中可以通过一个公式来对希尔排序用到的间隔序列进行动态计算。 Sedgewick 的算法是通过下面的代码片段来决定初始间隔值的:

```
    var N = this.dataStore.length;
    var h = 1;
    while (h < N/3) {
        h = 3 * h + 1; 
    }
```

间隔值确定好后，这个函数就可以像之前定义的 shellsort() 函数一样运行了，唯一的区 别是，回到外循环之前的最后一条语句会计算一个新的间隔值:

> h = (h-1)/3;


修改后的shellsort1函数如下：

```
function shellsort1() {
    var N = this.dataStore.length;
    var h = 1;
    while (h < N/3) {
      h = 3 * h + 1; 
    }
    while (h >= 1) {
       for (var i = h; i < N; i++) {
          for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h];
               j -= h) {
             swap(this.dataStore, j, j-h);
          }
      }
      h = (h-1)/3; 
    }
}
```

同样初始化10个数，shellsort1后的结果：


![](https://lilywei739.github.io/img/20180125/20180125-3.jpg)


### 比较 shellsort() 算法

```
    var nums = new CArray(100000);
    nums.setData();
    var start = new Date().getTime();
    nums.shellsort();
    var stop = new Date().getTime();
    var elapsed = stop - start;
    document.write(" 硬编码间隔序列的希尔排序消耗的时间为:" + elapsed + " 毫秒。"); 
    nums.clear();

    nums.setData();
    start = new Date().getTime();
    nums.shellsort1();
    stop = new Date().getTime();
    document.write(" 动态间隔序列的希尔排序消耗的时间为:" + elapsed + " 毫秒。");
```



![](https://lilywei739.github.io/img/20180125/20180125-4.jpg)

很明显，这两个希尔排序算法的效率是一样的，因此你可以根据需要随意使用

---
layout: post
title: JS基础--高级算法--动态规划 
category: ['JS'] 
---


# 高级算法--动态规划 

## 动态规则与递归的关系与区别

* 动态规划有时被认为是一种与递归相反的技术。

* 递归是从顶部开始将问题分解，通过解决掉所有分解出小问题的方式，来解决整 个问题。

* 动态规划解决方案从底部开始解决问题，将所有小问题解决掉，然后合并成一个 整体解决方案，从而解决掉整个大问题。

* 递归去解决问题虽然简洁，但效率不高,许多使用递归去解决的编程问题，可以重写为使用动态规划的技巧去解决 


## 动态规划方案

动态规划方案通常会使用一个数组来建立一张表，用于存放被分解成众多子问题的解。当算法执行完 毕，最终的解将会在这个表中很明显的地方被找到


## 使用动态规划方案能做点什么？ 

### 计算斐波那契数列

斐波那契数列可以定义为以下序列:

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

该序列是由前两项数值相加而成的


递归的实现方式：

```
function recurFib(n) {
    if (n < 2) {
        return n; 
    } else {
        
        return recurFib(n-1) + recurFib(n-2);
    } 
}
document.write(recurFib(10)); // 显示 55
```

在这个计算过程当中，有太多值在递归调用中被重新计算,这也是递归方法效率低下的原因。


再看下动态规则的实现方法：

```
function dynFib(n) {
    var val = [];
    for (var i = 0; i <= n; ++i) {
        val[i] = 0; 
    }
    if (n == 1 || n == 2) {
        return 1;
    } else {
        val[1] = 1;
        val[2] = 2;
        for (var i = 3; i <= n; ++i) {
            val[i] = val[i-1] + val[i-2];
        }
        return val[n-1];
    }
}
```

在这个数组 val 中保存了中间结果。如果要计算的斐波那契数是 1 或者 2，那么 if 语 句会返回 1。否则，数值 1 和 2 将被保存在 val 数组中 1 和 2 的位置。循环将会从 3 到输 入的参数之间进行遍历，将数组的每个元素赋值为前两个元素之和，循环结束，数组的最 后一个元素值即为最终计算得到的斐波那契数值，这个数值也将作为函数的返回值。

斐波那契数列在数组 val 中的排列顺序如下:

val[0] = 0 val[1] = 1 val[2] = 2 val[3] = 3 val[4] = 5 val[5] = 8 val[6] = 13


### 寻找最长公共子串

用动态规划去寻找两个字符串的最长公共子串。例如，在单词 “raven”和“havoc”中，最长的公共子串是“av”。

原理：

使用一个二维数组存储两个字符串相同 位置的字符比较结果。初始化时，该数组的每一个元素被设置为 0。每次在这两个数组的 相同位置发现了匹配，就将数组对应行和列的元素加 1，否则保持为 0。按照这种方式，一个变量会持续记录下找到了多少个匹配项。当算法执行完毕时，这个变 量会结合一个索引变量来获得最长公共子串。

```
function lcs(word1, word2) {
     var max = 0;
     var index = 0;
     var lcsarr = new Array(word1.length + 1);
     for (var i = 0; i <= word1.length + 1; ++i) {
         lcsarr[i] = new Array(word2.length + 1);
         for (var j = 0; j <= word2.length + 1; ++j) {
            lcsarr[i][j] = 0;
        }
    }

    //上面这一部分初始化了两个变量以及一个二维数组。多数语言对二维数组的声明都很 简单，但在 JavaScript 中需要很费劲地在一个数组中定义另一个数组，这样才能声明一个 二维数组。以下代码片段中的最后一个 for 循环会对这个数组进行初始化，


    for (var i = 0; i <= word1.length; ++i) {
       for (var j = 0; j <= word2.length; ++j) {
          if (i == 0 || j == 0) {
             lcsarr[i][j] = 0;
          } else {
              if (word1[i - 1] == word2[j - 1]) {
                lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
              } else {
                lcsarr[i][j] = 0;
              } 
          }
          if (max < lcsarr[i][j]) {
             max = lcsarr[i][j];
             index = i;
          } 
        }
    }

    //这一部分构建了用于保存字符匹配记录的表。数组的第一个元素总是被设置为 0。如果两 个字符串相应位置的字符进行了匹配，当前数组元素的值将被设置为前一次循环中数组元 素保存的值加 1。比如，如果两个字符串 "back" 和 "cace"，当算法运行到第二个字符处 时，那么数值 1 将被保存到当前元素中，因为前一个元素并不匹配，0 被保存在那个元素 中(0+1)。接下来算法移动到下一个位置，由于此时两个字符仍被匹配，当前数组元素将 被设置为 2(1+1)。由于两个字符串的最后一个字符不匹配，所以最长公共子串的长度是 2。最后，如果变量 max 的值比现在存储在数组中的当前元素要小，max 的值将被赋值给这 个元素，变量 index 的值将被设置为 i 的当前值。这两个变量将在函数的最后一部分用于 确定从哪里开始获取最长公共子串。

    var str = "";
    if (max == 0) {
       return "";
    } else {
        for (var i = index - max; i <= max; ++i) {
          str += word2[i];
        }
        return str; 
    }

    //这一部分代码用于确认从哪里开始构建这个最长公共子串。以变量 index 减去变量 max 的差值作为起始点，以变量 max 的值作为终点:
}

```


### 背包问题:递归解决方案

```
function max(a, b) {
    return (a > b) ? a : b;
}

function knapsack(capacity, size, value, n) {
    if (n == 0 || capacity == 0) {
        return 0; 
    }
    if (size[n - 1] > capacity) {
       return knapsack(capacity, size, value, n - 1);
    } else {
       return max(value[n - 1] +
          knapsack(capacity - size[n - 1], size, value, n - 1),
          knapsack(capacity, size, value, n - 1));
    } 
}

var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
document.write(knapsack(capacity, size, value, n));

//结果：23
```

### 背包问题:动态规划方案

```
function max(a, b) {
    return (a > b) ? a : b;
}
function dKnapsack(capacity, size, value, n) {
  var K = [];
  for (var i = 0; i <= capacity + 1; i++) {
      K[i] = [];
  }
  for (var i = 0; i <= n; i++) {
     for (var w = 0; w <= capacity; w++) {
        if (i == 0 || w == 0) {
            K[i][w] = 0; 
        } else if (size[i - 1] <= w) {
           K[i][w] = max(value[i - 1] + K[i-1][w-size[i-1]], K[i-1][w]);
        } else {
           K[i][w] = K[i - 1][w];
        }
        document.write(K[i][w] + " ");
     }
  }
  return K[n][capacity];
}
var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
document.write(dKnapsack(capacity, size, value, n));

结果：

0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
0 0 0 4 5 5 5 9 9 9 9 9 9 9 9 9 9
0 0 0 4 5 5 5 10 10 10 14 15 15 15 19 19 19 
0 0 0 4 5 5 5 10 11 11 14 15 16 16 19 21 21 
0 0 0 4 5 5 5 10 11 13 14 15 17 18 19 21 23 
23
```

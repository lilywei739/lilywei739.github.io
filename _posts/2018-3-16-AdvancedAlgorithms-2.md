---
layout: post
title: JS基础--高级算法--贪心算法 
category: ['JS'] 
---


# 高级算法--贪心算法 

贪心算法总是会选择当下的最优解，而不去考虑这一次的选择会不会对未来的选择造成影响，目的是得到当前最优解。


## 使用贪心算法的经典案例 

### 找零问题 

从商店购买了一些商品，找零 63 美分，店员要 怎样给你这些零钱呢?如果店员根据贪心算法来找零的话，他会给你两个 25 美分、一个 10 美分和三个 1 美分。在没有使用 50 美分的情况下这是最少的硬币数量。


```
function makeChange(origAmt, coins) {
    var remainAmt = 0;

    if (origAmt % .25 < origAmt) {
       coins[3] = parseInt(origAmt / .25);
       remainAmt = origAmt % .25;
       origAmt = remainAmt;
    }

    if (origAmt % .1 < origAmt) {
       coins[2] = parseInt(origAmt / .1);
       remainAmt = origAmt % .1;
       origAmt = remainAmt;
    }

    if (origAmt % .05 < origAmt) {
       coins[1] = parseInt(origAmt / .05);
       remainAmt = origAmt % .05;
       origAmt = remainAmt;
    }

    coins[0] = parseInt(origAmt / .01);
}


function showChange(coins) {
    if (coins[3] > 0) {
        document.write("25 美分的数量 - " + coins[3] + " - " + coins[3] * .25); 
    }

    if (coins[2] > 0) {
        document.write("10 美分的数量 - " + coins[2] + " - " + coins[2] * .10);
    }

    if (coins[1] > 0) {
        document.write("5 美分的数量 - " + coins[1] + " - " + coins[1] * .05);
    }

    if (coins[0] > 0) {
        document.write("1 美分的数量 - " + coins[0] + " - " + coins[0] * .01);
    } 
}

var origAmt = .63;
var coins = [];
makeChange(origAmt, coins);
showChange(coins);

========================
结果如下：

25美分的数量 - 2 - 0.5 
10美分的数量 - 1 - 0.1 
1美分的数量 - 3 - 0.03
```


makeChange() 函数从面值最高的 25 美分硬币开始，一直尝试使用这个面值去找零。总共 用到的 25 美分硬币数量会存储在 coins 数组中。如果剩余金额不到 25 美分，算法将会尝 试使用 10 美分硬币去找零，用到的 10 美分硬币总总数也会存储在 coins 数组里。接下来 算法会以相同的方式使用 5 美分和 1 美分来找零。

在所有面额都可用且数量不限的情况下，这种方案总能找到最优解。如果某种面额不可用，比如 5 美分，则会得到一个次优解。

### 背包问题之贪心算法解决方案


如果用贪心算法处理背包问题，它有一个前提放入背包的物品从本质上说是连续的，那 么可以简单地通过物品的单价除以单位体积来确定物品的价值，先装价值最高的物品直到该物品装完或者将背包装满，接着装价值次高的物品，直到 这种物品也装完或将背包装满，以此类推。

思路是

* (1) 背包的容量为 W，物品的价格为 v，重量为 w。 
* (2) 根据 v/w 的比率对物品排序。
* (3) 按比率的降序方式来考虑物品。
* (4) 尽可能多地放入每个物品。



如给出了四个物品的重量、价格和比率

| 物品   | A |  B | C | D |
|----------|:-------:|------:|
| 价格 |  50 | 140 | 60 | 60 |
| 尺寸 |   5 | 20  | 10 | 12  |
| 比率 |  10 | 7   | 6  | 5   |

```
function ksack(values, weights, capacity) {
    var load = 0;
    var i = 0;
    var w = 0;
    while (load < capacity && i < 4) {
       if (weights[i] <= (capacity-load)) {
          w += values[i];
          load += weights[i];
       } else {
       
          var r = (capacity-load)/weights[i];
          w += r * values[i];
          load += weights[i];
       } 
       ++i;
    }
    return w;
}

var items = ["A", "B", "C", "D"];
var values = [50, 140, 60, 60];
var weights = [5, 20, 10, 12];
var capacity = 30;

document.write(ksack(values, weights, capacity)); // 显示 220
```

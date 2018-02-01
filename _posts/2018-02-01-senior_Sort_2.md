---
layout: post
title: JS基础--高级排序(二) 
category: ['JS'] 
---


# 高级排序---归并排序 

实现原理:把一系列排好序的子序列合并成一个大的完整有序序列。

### 归并排序 

从理论上讲，这个算法很容易实现。我们需要两个排好序的子数组，然后通过比较数据大小，先从最小的数据开始插入，最后合并得到第三个数组。

然而，在实际情况中，归并排序还有一些问题，当用这个算法对一个很大的数据集进行排序时，需要相当大的空间来合并存储两个子数组。就现在来讲，内存不那么昂贵，空间不是问题，因此值得我们去实现一下归并排序，比较它和其他排序算法的执行效率。


#### 自底向上的归并排序

采用非递归或者迭代版本的归并排序是一个自底向上的过程。这个算法首先将数据集分解 为一组只有一个元素的数组。然后通过创建一组左右子数组将它们慢慢合并起来，每次合 并都保存一部分排好序的数据，直到最后剩下的这个数组所有的数据都已完美排序。


下图演示了自底向上的归并排序算法是如何运行的

![图](http://0.0.0.0:4000/img/20180201/20180201-1.jpg)



JavaScript 实现的自底向上归并排序算法:

```
function mergeSort() {
    if (this.dataStore.length < 2) {
        return; 
    }
    var step = 1;
    var left, right;
    while (step < this.dataStore.length) {
       left = 0;
       right = step;
       while (right + step <= this.dataStore.length) {
          mergeArrays(this.dataStore, left, left+step, right, right+step);
          left = right + step;
          right = left + step;
       }
       if (right < this.dataStore.length) {
            mergeArrays(this.dataStore, left, left+step, right, this.dataStore.length); 
        }
        step *= 2;
    }
}

function mergeArrays(arr,startLeft, stopLeft, startRight, stopRight) {
   var rightArr = new Array(stopRight - startRight + 1);
   var leftArr = new Array(stopLeft - startLeft + 1);
   k = startRight;
   for (var i = 0; i < (rightArr.length-1); ++i) {
      rightArr[i] = arr[k];
      ++k;
   } 
   k = startLeft;
   for (var i = 0; i < (leftArr.length-1); ++i) {
        leftArr[i] = arr[k];
        ++k; 
   }

    rightArr[rightArr.length-1] = Infinity; // 哨兵值 
    leftArr[leftArr.length-1] = Infinity; // 哨兵值 
    var m = 0;
    var n = 0;
   for (var k = startLeft; k < stopRight; ++k) {
        if (leftArr[m] <= rightArr[n]) {
            arr[k] = leftArr[m];
            m++; 
        } else {
            arr[k] = rightArr[n];
            n++;
        } 
    }
    document.write("left array - ", leftArr + '<br />');
    document.write("right array - ", rightArr + '<br />');
}
```

mergeSort() 函数中的关键点就是 step 这个变量，它用来控制 mergeArrays() 函数生成的 leftArr 和 rightArr 这两个子序列的大小。通过控制子序列的大小，处理排序是比较高效 的，因为它在对小数组进行排序时不需要花费太多时间。合并之所以高效，还有一个原 因，由于未合并的数据已经是排好序的，将它们合并到一个有序数组的过程非常容易。


初始化10数的结果：

```
var nums = new CArray(10);
nums.setData();
document.write(nums.toString() + '<br />');
nums.mergeSort();
document.write(nums.toString() + '<br />');
```

![图](http://0.0.0.0:4000/img/20180201/20180201-2.jpg)


一开始每个元素都在左子序列或右子序列中。然后将左右子序列合并，首先每次合并成两 个元素的子序列，然后合并成四个元素的子序列，3 和 5 除外，它们会一直保留到最后一次 迭代，那时会把它们合并成右子序列，然后再与最后的左子序列合并成最终的有序数组。

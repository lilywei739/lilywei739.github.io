---
layout: post
title: JS基础--高级排序(三) 
category: ['JS'] 
---


# 高级排序---快速排序 

快速排序是处理大数据集最快的排序算法之一。

它是一种分而治之的算法，通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列。该算法不断重复这个步骤直到所有数据都是有序的。


### 快速排序 

这个算法首先要在列表中选择一个元素作为基准值(pivot)。数据排序围绕基准值进行， 将列表中小于基准值的元素移到数组的底部，将大于基准值的元素移到数组的顶部。


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

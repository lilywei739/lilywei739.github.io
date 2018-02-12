---
layout: post
title: requestAnimationFrame 
category: ['JS'] 
---




# requestAnimationFrame 


在一个react项目中要做一个抢红包的游戏，红包雨的效果，用到了动画，但是由于在wap端，尤其对于性能方面要更加注意，这里就用到了requestAnimationFrame，在此记录一下。


先来了解几个概念：

##### 屏幕刷新频率

即图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹(Hz)。 对于一般笔记本电脑，这个频率大概是60Hz， 可以在桌面上右键->屏幕分辨率->高级设置->监视器 中查看和设置。这个值的设定受屏幕分辨率、屏幕尺寸和显卡的影响，原则上设置成让眼睛看着舒适的值都行。

当你对着电脑屏幕什么也不做的情况下，显示器也会以每秒60次的频率正在不断的更新屏幕上的图像。为什么你感觉不到这个变化？ 那是因为人的眼睛有视觉停留效应，即前一副画面留在大脑的印象还没消失，紧接着后一副画面就跟上来了，这中间只间隔了16.7ms(1000/60≈16.7)， 所以会让你误以为屏幕上的图像是静止不动的。而屏幕给你的这种感觉是对的，试想一下，如果刷新频率变成1次/秒，屏幕上的图像就会出现严重的闪烁，这样就很容易引起眼睛疲劳、酸痛和头晕目眩等症状。


##### 动画原理

根据上面的原理知道，眼前所看到图像正在以每秒60次的频率刷新，由于刷新频率很高，因此你感觉不到它在刷新。而动画本质就是要让人眼看到图像被刷新而引起变化的视觉效果，这个变化要以连贯的、平滑的方式进行过渡。 那怎么样才能做到这种效果呢？

刷新频率为60Hz的屏幕每16.7ms刷新一次，我们在屏幕每次刷新前，将图像的位置向左移动一个像素，即1px。这样一来，屏幕每次刷出来的图像位置都比前一个要差1px，因此你会看到图像在移动；由于我们人眼的视觉停留效应，当前位置的图像停留在大脑的印象还没消失，紧接着图像又被移到了下一个位置，因此你才会看到图像在流畅的移动，这就是视觉效果上形成的动画。




##### setTimeout 

setTimeout 其实就是通过设置一个间隔时间来不断的改变图像的位置，从而达到动画效果的。但我们会发现，利用seTimeout实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：

* setTimeout的执行时间并不是确定的。在Javascript中， setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此 setTimeout 的实际执行时间一般要比其设定的时间晚一些。

* 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，而 setTimeout只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

以上两种情况都会导致setTimeout的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。 那为什么步调不一致就会引起丢帧呢？


首先要明白，setTimeout的执行只是在内存中对图像属性进行改变，这个变化必须要等到屏幕下次刷新时才会被更新到屏幕上。如果两者的步调不一致，就可能会导致中间某一帧的操作被跨越过去，而直接更新下一帧的图像。假设屏幕每隔16.7ms刷新一次，而setTimeout每隔10ms设置图像向左移动1px， 就会出现如下绘制过程：

* 第0ms: 屏幕未刷新，等待中，setTimeout也未执行，等待中；
* 第10ms: 屏幕未刷新，等待中，setTimeout开始执行并设置图像属性left=1px；
* 第16.7ms: 屏幕开始刷新，屏幕上的图像向左移动了1px， setTimeout 未执行，继续等待中；
* 第20ms: 屏幕未刷新，等待中，setTimeout开始执行并设置left=2px;
* 第30ms: 屏幕未刷新，等待中，setTimeout开始执行并设置left=3px;
* 第33.4ms:屏幕开始刷新，屏幕上的图像向左移动了3px， setTimeout未执行，继续等待中；
* …

从上面的绘制过程中可以看出，屏幕没有更新left=2px的那一帧画面，图像直接从1px的位置跳到了3px的的位置，这就是丢帧现象，这种现象就会引起动画卡顿。



##### requestAnimationFrame 

与setTimeout相比，requestAnimationFrame最大的优势是**由系统来决定回调函数的执行时机**。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。**它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次**，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。


```
var progress = 0;
//回调函数
function render() {
    progress += 1; //修改图像的位置
 
    if (progress < 100) {
           //在动画没有结束前，递归渲染
           window.requestAnimationFrame(render);
    }
}
 
//第一帧渲染
window.requestAnimationFrame(render);

这个方法一旦启动，它就会递归的调用自己。
````

requestAnimationFrame还有以下两个优势：

* **CPU节能**：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。

* **函数节流**：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。


兼容性：

![image01](https://lilywei739.github.io/img/20171215/2017-12-15-1.jpg)



启动和停止一个动画

requestAnimationFrame 函数能返回一个ID，根据这个ID，你可以停止它的允许，这就像 setTimeout 和 setInterval 的用法一样。下面是一个实际可运行的例子：

````
var globalID;

function repeatOften() {
  document.getElementsByTagName("body").appendChild('#');;
  globalID = requestAnimationFrame(repeatOften);
}

$("#start").on("click", function() {
  globalID = requestAnimationFrame(repeatOften);
});

$("#stop").on("click", function() {
  cancelAnimationFrame(globalID);
});
````


##### requestAnimationFrame回调函数中的时间 

> from MDN
> 调函数具有一个传入 time 参数，该参数表示调用回调函数的时间。它是一个 DOMHighResTimeStamp，是从页面导航开始时测量的高精确度时间。DOMHighResTimeStamp 以毫秒为单位，精确到千分之一毫秒。此时间值不直接与 Date.now() 进行比较，后者测量自 1970 年 1 月 1 日至今以毫秒为单位的时间。如果你希望将 time 参数与当前时间进行比较，请使用当前时间的 window.performance.now。将时间值从 DOMTimeStamp 更改为 DOMHighResTimeStamp 是 W3C 针对基于脚本动画计时控制规范的最新编辑草案中的最新更改，并且某些供应商仍将其作为 DOMTimeStamp 实现。较早版本的 W3C 规范使用 DOMTimeStamp，允许你将 Date.now 用于当前时间。

````
let t0 = window.performance.now();
doSomething();
let t1 = window.performance.now();
console.log("doSomething函数执行了" + (t1 - t0) + "毫秒.")
````

和JavaScript中其他可用的时间类函数(比如Date.now)不同的是,window.performance.now()返回的时间戳没有被限制在一毫秒的精确度内,而它使用了一个浮点数来达到微秒级别的精确度.

另外一个不同点是,window.performance.now()是以一个恒定的速率慢慢增加的,它不会受到系统时间的影响(可能被其他软件调整)。另外，performance.timing.navigationStart + performance.now() 约等于 Date.now()。


看下面的例子：

```
<!DOCTYPE html>
<html>
<head>
<title>Script-based animation using requestAnimationFrame</title>
<style type="text/css">
div { position: absolute; left: 10px; top:100px; padding: 50px;
  background: crimson; color: white; }
</style>
<script type="text/javascript">
    var requestId = 0;
    var startime = 0;
    var lpos = 0;
    var elm;

    function init() {
        elm = document.getElementById("animated");
    }
    
    function render() {
        elm.style.left = ((lpos += 3) % 600) + "px";
        requestId = window.requestAFrame(render);
    }

    function start() {
        if (window.performance.now) {
            startime = window.performance.now();
        } else {
            startime = Date.now();
        }
        requestId = window.requestAFrame(render);
    }
    function stop() {
        if (requestId)
            window.cancelAFrame(requestId);        
    }


    // handle multiple browsers for requestAnimationFrame()
    window.requestAFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                // if all else fails, use setTimeout
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
                };
    })();

    // handle multiple browsers for cancelAnimationFrame()
    window.cancelAFrame = (function () {
        return window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                function (id) {
                    window.clearTimeout(id);
                };
    })();

   
</script>
</head>
<body onload="init();">

<div id="animated">Hello there.</div>
<button onclick="start()">Start</button>
<button onclick="stop()">Stop</button>
</body>
</html>
```

##### 参考文章

* [microsoft requestAnimationFrame](https://technet.microsoft.com/zh-cn/library/hh920765.aspx)
* [张鑫旭,CSS3动画那么强，requestAnimationFrame还有毛线用？](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)
* [W3C CR, Timing control for script-based animations](https://www.w3.org/TR/animation-timing/)
* [朱永盛, 理解WebKit和Chromium: 渲染主循环（main loop)和requestAnimationFrame](http://blog.csdn.net/milado_nju/article/details/8101188)








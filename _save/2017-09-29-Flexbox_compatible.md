---
layout: post
title: Flexbox--版本历史 
category: ['CSS3'] 
---



# Flexbox--版本历史 

在wap端的前端开发中，flex布局让前端工程师们为之一振，通过几行简单的代码就能实现原来只能用各种hack来实现的布局效果，今天在测试ios8时出现flex的兼容性问题，顺便做个简单的记录。

flex布局早在2009年就有了，通过最初几个版本的迭代，使用flex语法会发现支持程度并不好，即使是在“高端”浏览器上也是如此，比如Chrome、Firefox、Safari、Android、IOS Safari下支持程度各不相同。

主要是历史原因，从2009年到2015年，期间W3C规范有了多次更新，浏览器支持程度也就有了差异。


### W3C各个版本的flex（大的语法修改）

* 2009 version

> 标志：display: box; or a property that is box-{*} (eg. box-pack)


* 2011 version

> 标志：display: flexbox; or the flex() function or flex-pack property

* 2012 version

> 标志：display: flex/inline-flex; and flex-{*} properties



#### flex 属性

```
 父容器属性

1.flex-direction（主轴）row | row-reverse | column | column-reverse

2.flex-wrap（侧轴）nowrap | wrap | wrap-reverse

3.flex-flow（双轴）设置“flex-direction”和“flex-wrap”的简写，同时定义主轴和侧轴

4.justify-content（主轴）flex-start | flex-end | center | space-between | space-around

5. align-items(侧轴， 行中的项目 ) flex-start | flex-end | center | baseline | stretch

6. align-content(侧轴，  行自身) flex-start | flex-end | center | space-between | space-around | stretch

子容器属性

1. flex-grow(主轴) 增长因数， 不接受负值(0)

2. flex-shrink(主轴) 收缩因数， 不接受负值(1)

3. flex-basis(主轴) 伸缩的基准值， 不接受负值(auto，content，`width`)

4. flex(主轴) 增长因数、收缩因数和伸缩基准值(auto(1 1 auto)，initial(0 1 auto))，
none(0 0 auto))

5. align-self(侧轴) auto | flex-start | flex-end | center | baseline | stretch

6. order(主轴) 分配到序数分组，0，

```

#### 兼容代码

```
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
}

//水平居中

  /* 09版 */
  -webkit-box-pack: center;
  /* 12版 */
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;

//垂直居中

  -webkit-box-align: center;
  /* 12版 */
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  -o-align-items: center;
  align-items: center;

```




#### flex兼容性总结：

* IE10部分支持2012，需要-ms-前缀
* Android4.1/4.2-4.3部分支持2009 ，需要-webkit-前缀
* Safari7/7.1/8部分支持2012， 需要-webkit-前缀
* IOS Safari7.0-7.1/8.1-8.3部分支持2012，需要-webkit-前缀

#### 参考文档：

* [W3C规范--官方说明文档](https://www.w3.org/TR/css-flexbox/)
* [浏览器兼容性可以参考CanIUse](https://caniuse.com/#feat=flexbox) 
* [MDN--flex属性介绍](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)













---
layout: post
title: HTML5_Video视频WebVTT字幕
category: ['video']
---


## HTML5 Video视频与WebVTT字幕

HTML5 Videov字幕通用是WebVTT（后缀.vtt），这个各个浏览器厂商都支持的比较好。

### track??

完整写法:

```
<video controls width="400" height="300">
    <source src="../test.mp4" type="video/mp4">
    <track src="test.vtt" srclang="zh" kind="subtitles" label="中文" default>
    <track src="test_en.vtt" srclang="en" kind="subtitles" label="English">
</video>
```

* 如果有多个语言字幕可以添加多条<track>，供用户切换选择
* 标注为default的<track>表示默认使用的字幕。
* 只要src属性地址OK，同时有default属性，字幕就会生效。

<track> 元素的属性如下:

|名称|	值|	说明|
|----------|:-------------:|------:|
|kind|	subtitles	|字幕，详见表格后|
| 	|captions|   	字幕，详见表格后|
| 	|descriptions|	描述，视频的文本描述|
| 	|chapters|	章节导航|
| 	|metadata|	元数据|
|src|	URL|	指定资源URL|
|srclang	|Language code	|在 src 资源的语言,VTT文本信息使用的语言。例如，中文zh，英文en|
|label	|Free text	|点击CC按钮选择字幕时候出现的文字|
|default	|n/a|	default指的是默认会显示的字幕。例如两个<track>元素，如果都没有default属性，那都不显示，需要用户手动调出。另外，default只能出现在一个<track>元素上|



1) kind:   可选值 subtitles | captions

* subtitles: 平常看电影看动漫时候下面出现的字幕，一般是翻译，或者采访时候口音不清的字幕显示。有时候还会标注一些说明，例如，显示人物姓名身份，当前场景地或者标注之前语言的梗在哪里等
* 这里captions专指隐藏式字幕（Closed Captions），简称CC
```
隐藏字幕（Closed Captioning，简称CC)是电视节目或影碟中为有特殊情况或者需要的观众而准备的宇幕，例如观众在听力上有障碍，或者需要无音条件下观赏节目。此时字幕中可使用一些解释性的语言来描述节目内容。
```
* subtitles主要就是对人说话进行翻译或确认；而captions不仅需要人对话的内容提示，紧张的背景音乐，或者汽车吱吱作响的刹车声都需要在字幕中描述出来。这样，即使用户静音也能知道视频里到底在玩些什么。我想，如果是经常看国外影视作品的小伙伴肯定会有类似的字幕体验，有的就对话字幕，有的事无巨细，就是subtitles和captions的区别


### .vtt文件

格式如下：

```
WEBVTT

00:11.000 --> 00:13.000
<v Roger Bingham>We are in New York City

00:13.000 --> 00:16.000
<v Roger Bingham>We’re actually at the Lucern Hotel, just down the street

00:16.000 --> 00:18.000
<v Roger Bingham>from the American Museum of Natural History

00:18.000 --> 00:20.000
<v Roger Bingham>And with me is Neil deGrasse Tyson

00:20.000 --> 00:22.000
<v Roger Bingham>Astrophysicist, Director of the Hayden Planetarium
```

就是个文本文件，格式很简单，一开始声明下WebVTT，然后下面就是视频时间范围，下一行就是字幕内容，时间可以精确到毫秒，但通常0.5秒足矣。

更多规则解释详见[官网文档](https://w3c.github.io/webvtt/)


## HTML5 Video视频字幕的样式控制

CSS中有专门的伪元素::cue可以控制字幕的样式。

可以控制的CSS属性包括：

```
color
opacity
visibility
text-decoration及相关属性
text-shadow
background及相关属性
outline及相关属性
font及相关属性，包括line-height
white-space
text-combine-upright
ruby-position
```


WebVTT还支持一些内联样式控制，常见的




|值|说明|
|----------|:-------------:|
|c	|用 c 定义 （CSS）类, 例如， <c.className>Cue text</c>
|i	|斜体字
|b	|粗体字
|u	|添加下划线
|ruby|定义类似于 HTML5 的 <ruby> 元素。在这样的内联样式中，允许出现一个或多个 <rt> 元素。（<ruby> 元素用于标注汉字等东亚字符的发音）
|v	|如有提供，则用来指定声音标签。例如， <v Ian>This is useful for adding subtitles</v>。注意此声音标签不会显示，它只是作为一个样式标记。

使用方法如下所示：

```
00:00:52.000 --> 00:00:54.000 align:start size:15%
<v Emo>I don’t think so. <c.question>You?</c></v>
```

给 Cue 文本添加两种不同的声音标签： Emo 和 Proog（自定义的） 。另外，一个 question（自定义的） 的 CSS 类被指定，可以按惯常方法在 CSS 链接文件 或 HTML 页面里为其指定样式。

注意要给 Cue 文本添加 CSS 样式，你需要用一个特定的伪选择元素，例子如下:

```
video::cue(v[voice="Emo"]) { color:lime }
```

### 更全面的样式控制

原生的字幕样式控制，有CSS属性和字幕HTML标签双重限制，不是很灵活

可以使用开源的HTML5视频项目：[accessible-html5-video-player](https://github.com/paypal/accessible-html5-video-player)，paypal的开源项目，可以对原生的video进行UI重定值，JS很小，未压缩版本就几十K，其会把VTT文件中HTML片段直接完整输出到页面中，于是乎，所有的CSS属性我们都可以使用了，例如可以把字幕在视频上方直接一个绝对定位上去就好了。

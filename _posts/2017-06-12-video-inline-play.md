---
layout: post
title: H5 video 视频在QQ、微信中播放视频不全屏 
subtitle: ""
tags:
    - JS 
    - video
    - 前端  
---



# H5 video 视频在QQ、微信中播放视频不全屏


HTML5下的音视频播放是通过\<video\>标签的方式进行，通常，浏览器内核不会对页面\<video\>标签指定的播放器进行劫持，但在一些应用中，如UC浏览器、QQ浏览器提供了自己的内核（手机淘宝等APP使用了UC内核，QQ、微信等APP的内置浏览器使用了QQ浏览器内核），这些APP中进行视频播放时，会将\<video\>标签解析替换成自己的播放器，进行播放器劫持。外在的表现是点击播放视频时，新打开一个页面全屏播放视频。

现在需求来了，要做一个直播，并且希望视频在当前页面内直接播放，而不是跳转页面，如花椒直播的分享页。

**实现方法：**

在\<video\>标签中增加属性playsinline 、webkit-playsinline（这个属性是iOS 10中设置可以让视频在小窗内播放）。
另外，在微信、QQ等使用X5内核浏览器中，还可以使用x5-playsinline（适应微信等X5内核）、x5-video-player-type、x5-video-player-fullscreen、x5-video-orientation等属性来控制全屏，示例如下：


```
<video
  id="my-video" 
  src="test.mp4" 
  controls = ""    /*禁掉默认控制条-- 必要*/
  poster="poster.jpg"  /*视频封面*/
  preload="auto"  /*预加载*/
  webkit-playsinline="true"  /*iOS 10中设置可以让视频在小窗内播放*/
  playsinline="true"
  x-webkit-airplay="allow"  /*启用AirPlay支持*/
  x5-video-player-type="h5"  /*对于x5内核声明启用同层H5播放器*/
  x5-video-player-fullscreen="true"   /*全屏设置设置为 true 是防止横屏*/
  x5-video-orientation="portraint"  /*播放器的方向，默认为竖屏*/>
 </video>
```

隐藏控制条的实现（播放器非劫持状态） 

由于iOS及Android会对未标记controls属性的\<video\>标签启用系统默认的控件，由此，还需要使用CSS来对这些默认控件进行隐藏，如下：

```
*::-webkit-media-controls-enclosure {
  display:none !important;
  -webkit-appearance: none;
}
*::-webkit-media-controls-panel {
  display: none!important;
  -webkit-appearance: none;
}
*::-webkit-media-controls-panel-container {
  display: none!important;
  -webkit-appearance: none;
}
*::--webkit-media-controls-play-button {
  display: none!important;
  -webkit-appearance: none;
}
*::-webkit-media-controls-start-playback-button {
  display: none!important;
  -webkit-appearance: none;
}
*::-webkit-media-controls {
display: none!important;
-webkit-appearance: none;
}
```




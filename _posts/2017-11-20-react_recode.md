---
layout: post
title: react基础--知识点小记 
category: ['JS'] 
---

# react 随手笔记  

项目中遇到的小问题，好记性不如烂笔头，用于记录一下


1、触发事件

当触发某个事件时，请求一个ajax，改变一个state值，根据这个state值更改后续的状态。

场景：一个入口，根据请求接口返回的数据，非成功的状态会出现弹框，成功的状态是一个路由，然后直接跳转

实现思路：

```
js:

handleClick = () => {
    fetch ...
     当请求成功后setState
	setState({
	    ...
	    newState: ,
        })

	
        !success{
	    出弹框
        }
}

<p onClick={this.handleClick}>
    newState === 'success' ?
        <Link to='' />
    :
        <span></span> 
</p>

```

问题：显然是有问题的，因为是异步的，所以当请求了接口为成功时，入口不会即时的变为路由，而是需点击两下才能路由走

解决一：请求前置

```
componentDidMount = () => {
    fetch ....
}

handleClick = () => {
    if (this.state.newState !== 'success') {
	出弹框
    }
}

<p onClick={this.handleClick}>
    newState === 'success' ?
        <Link to='' />
    :
        <span></span> 
</p>
```

在用户点击之前就请求接口，早些改变newState的值，虽然功能上是实现了，但这种情况会有限制性，逻辑不允许的时候，这种方法行不通


解决二：在触发事件时就做跳转

```
handleClick = () => {
	fetch ... 
	.then((data) => {
	    this.setState({
		newState: data.status
	    });

	    if (data.status !== 'success') {  //注意这里，不是用newState，而是用返回值直接处理
		出弹框
	    } else {
		window.location.hash = `/pull/${this.props.hasmoney}`;  //注意这里的写法，用于实现跳转
	    }
	});
}


<p onClick={this.handleClick}></p>
```

其实不用react，原生的js请求返回的结果去处理页面中的元素就是这样控制的，但是当时脑袋秀逗了，没这样做，以后会不断的更新记录工作中遇到的小问题。






 









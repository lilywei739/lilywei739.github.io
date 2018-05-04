---
layout: post
title: Promise 对象
subtitle: ""
tags:
    - JS 
    - Promise
    - 前端  
---



# Promise 对象

ES6中，新增了Promise对象，它主要用于处理异步回调代码，让代码不至于陷入回调嵌套的死路中。


## Promise本质

Promise本质上是一个构造器 ，专门用来构造对象的。自己身上有all、reject、resolve等方法，原型上有then、catch等的方法，它接受一个函数作为参数

## Promise的几个重要方法

```
promise Promise.prototype.then( resolveFn, [rejectFn] )

  @param resolveFn( ...args )  
    函数，当Promise实例状态变为“完成”状态时会被执行，  
    用于将从当前promise中取出reresolve( ...args )中得到的参数（...args），  
    并进行相应的操作，比如将（args）传入另一个封装了promise构造器的函数，  
    并将该函数执行完成后返回的promise实例返回  
    @param ...args  
      参数列表，当前promise实例处于“完成”状态时，通过resolve(...args)得到的值。  
  @param [rejectFn( ...args )]  
    函数，可选，当Promise实例状态变为“失败”状态时会被执行，  
    用于将从当前promise中取出reject( ...args )中得到的参数（...args），  
    并进行相应的操作，比如将（args）传入另一个封装了promise构造器的函数，  
    并将该函数执行完成后返回的promise实例返回  
    @param ...args  
      参数列表，当前promise处于“完成”状态时，通过resolve(...args)得到的值。  
  @return promise  
    promise对象，resolveFn或rejectFn执行后的返回值，  
    我们一般会在fn中调用另一个封装了promise构造器的函数，  
    然后将其返回给then()方法，then()方法再将其作为then的返回值返回给当前链式调用处，  
    如果fn()返回的不是一个promise对象，then()会帮我们将fn()返回值封装成promise对象，  
    这样，我们就可以确保能够链式调用then()方法，并取得当前promise中获得的函数运行结果。  

```

then()方法定义在Promise.prototype上，用于为Promise实例添加状态更改时的回调函数，相当于监听一样。
当当前promise实例状态变为“完成”状态时，resolveFn函数自动执行。
当当前promise实例状态变为“失败”状态时，rejectFn函数自动执行。


```
promise Promise.prototype.catch( rejectFn )

  @param rejectFn( ...args )  
    函数，当Promise实例状态变为“失败”状态时会被执行，  
    用于将从当前promise中取出reject( ...args )中得到的参数（...args），  
    并进行相应的操作，比如将（args）传入另一个封装了promise构造器的函数，  
    并将该函数执行完成后返回的promise实例返回  
    @param ...args  
      参数列表，当前promise处于“完成”状态时，通过resolve(...args)得到的值。  
  @return promise  
    promise对象，rejectFn执行后的返回值，  
    如果fn()返回的不是一个promise对象，catch()会帮我们将fn()返回值封装成promise对象，  
    并将其返回，以确保promise能够被继续链式调用下去。  
```

该方法其实是“.then(null, rejectFn)”的别名，用于指定状态转为“失败”时的回调函数。
建议不要在then()方法中定义第二个参数，而应该使用catch()，结构层次会更好一些。
如果没有使用catch()方法指定错误错误处理的回调函数，promise实例抛出的错误不会传递到外层代码。
如果promise状态已经变为了resolved（“失败”状态），再抛出任何错误，都是无效的。
promise实例中抛出的错误具有冒泡的特性，它会一直向后传递，直到被捕获为止。

```
Promise.all( [promise1, promise2, …, promisen] )

  @param [promise1, promise2, ..., promisen]
    可遍历对象，一个由promise对象构成的可遍历对象，常用数组表示
  @return promise
    promise对象
```

Promise.all()用于将多个Promise实例包装成一个新的Promise实例，并返回。
Promise.all()方法接受一个由Promise实例组成的可遍历对象。如果可遍历对象中存在有不是Promise实例的元素，就会调用Promise.resolve()方法，将其转为Promise实例。
本文的可遍历对象，指的是那些具有Iterator接口的对象，如Array、WeakSet、Map、Set、WeakMap等函数的实例。

Promise.all()方法返回的Promise实例的状态分成两种情况：

* 可遍历对象中的Promise实例状态全变为 完成 状态时，该实例的状态才会转变为 完成 状态，此时，可遍历对象中的Promise实例的返回值会组成一个数组，传给该实例的回调。
* 可遍历对象只要存在Promise实例状态转为 失败 状态时，该实例的状态就会转变为 失败 状态，此时，第一个转为 失败 状态的Promise实例的返回值会传给该实例的回调。

```
Promise.race( [promise1, promise2, …, promisen] )
  @param [promise1, promise2, ..., promisen]
    可遍历对象，一个由promise对象构成的可遍历对象，常用数组表示
  @return promise
    promise对象
```

Promise.race()与Promise.all()用法基本上一致，功能上也几乎相同，唯一的差异就是： 
Promise.race()方法返回的Promise实例的状态分成两种情况：

* 可遍历对象只要存在Promise实例状态转为 完成 状态时，该实例的状态才会转变为 完成 状态，此时，第一个转为 完成 状态的Promise实例的返回值，会作为该实例的then()方法的回调函数的参数。
* 可遍历对象只要存在Promise实例状态转为 失败 状态时，该实例的状态就会转变为 失败 状态，此时，第一个转为 失败 状态的Promise实例的返回值，会作为该实例的then()方法的回调函数的参数。

```
promise Promise.resolve( notHaveThenMethodObject )
  @param notHaveThenMethodObject
    对象，一个原型链上不具有then()方法的对象
  @return promise
    promise对象
```

如果Promise.resolve()的参数的原型链上不具有then方法，则返回一个新的Promise实例，且其状态为 完成 状态，并且会将它的参数作为该实例的then()方法的回调函数的参数。

如果Promise.resolve()的参数是一个Promise实例（原型链上具有then方法），则将其原封不动地返回。

Promise.resolve()方法允许调用时不使用任何参数。

```
promise Promise.reject( something )
  @param something
    任意值，用于传递给返回值的then()方法的回调函数参数的值
  @return promise
    promise对象
```

Promise.reject方法的用法和resolve方法基本一样，只是它返回的Promise实例，状态都是 失败 状态。
Promise.reject方法的参数会被作为该实例的then()方法的回调函数的参数。
Promise.resolve()方法允许调用时不使用任何参数。

Promise构造器回调函数参数中的 resolve 和 reject 和Promise构造器方法中的 reject() 和 resolve() 效果是不一样的。
Promise构造器回调函数参数中的 resolve 和 reject 用于更改当前Promise的状态，并将其值返回给当前Promise的then()方法的参数。 Promise构造器方法中的 reject() 和 resolve() 可以直接返回一个已经改变状态的新的Promise对象。

* Promise.reject() Promise.resolve()
* new Promise((resolve, reject)=>{ resolve(…) 或 reject(…) })

```
Promise.prototype.done( [resolveFn], [rejectFn] )
  @param [resolveFn( ...args )]  
    函数，可选，当Promise实例状态变为“完成”状态时会被执行，  
    用于将从当前promise中取出reresolve( ...args )中得到的参数（...args），  
    并进行相应的操作，比如将（args）传入另一个封装了promise构造器的函数，  
    并将该函数执行完成后返回的promise实例返回  
    @param ...args  
      参数列表，当前promise实例处于“完成”状态时，通过resolve(...args)得到的值。  
  @param [rejectFn( ...args )]  
    函数，可选，当Promise实例状态变为“失败”状态时会被执行，  
    用于将从当前promise中取出reject( ...args )中得到的参数（...args），  
    并进行相应的操作，比如将（args）传入另一个封装了promise构造器的函数，  
    并将该函数执行完成后返回的promise实例返回  
    @param ...args  
      参数列表，当前promise处于“完成”状态时，通过resolve(...args)得到的值。
```

不管以then()或catch()方法结尾，若最后一个方法抛出错误，则在内部可能无法捕捉到该错误，外界也无法获得，为了避免这种情况发生，Promise构造器的原型链上提供了done()方法。

promise.done()方法总是处于会调链的低端，它可以捕捉到任何在回调链上抛出的错误，并将其抛出。

```
Promise.prototype.finally( simpleFn )
  @param simpleFn  
```

一个普通函数，这个普通函数无论如何都会被执行。  
finally方法指定，不管Promise对象最后状态如何，都会执行的操作。



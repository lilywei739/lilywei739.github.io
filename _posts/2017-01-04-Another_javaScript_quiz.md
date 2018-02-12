---
layout: post
title: Another JavaScript quiz试题解析  
---



# Another JavaScript quiz试题解析

**转载于 [鑫空间，鑫生活](http://www.zhangxinxu.com/wordpress/2013/05/%E7%90%86%E8%A7%A3another-javascript-quiz-%E9%A2%98%E7%9B%AE/)**

这里要介绍的”[Another JavaScript quiz“](http://james.padolsey.com/javascript/another-javascript-quiz/)(by james)中的题目不是属于变态题目，而是确实属于变态题目，不过是表面上的，很多内容确实可能会遇到的。综合评价下就是：面试价值不及格，学习价值是很赞的，因此，探讨分享很有意义。

## 1、1 && 3

结果是3


从左往右，如果"1"通过，继续“3”；否则直接返回“1”。因为“3”后面没有其他值了，因此直接返回“3”。

因此，实际上，平时的if (1 && 3) {} 等同于 if (3) {}.



再看看   

```
0 && 3  //==> 0
```


因为0 == false, 因此走不到“3”这一关，直接返回了0。

也就是if (0 && 3) {} 等同于 if (0) { /* 不会执行 */ }.

**应用场景：**

可以避免if嵌套。例如，要问页面上某个dom绑定点击事件，我们需要先判断这个dom元素存不存在，会这样做：

```
var dom = document.querySelector("#dom");
if (dom) { dom.addEventListener("click", function() {});  }
```

实际上，可以使用&&做一些简化：

```
var dom = document.querySelector("#dom");
dom && dom.addEventListener("click", function() {});
```




## 2、1 && "foo" || 0 

结果是 foo

```
1 && 'foo' ==> 'foo', 'foo' || 0, 因为'foo' 弱等于true，最后返回foo
```

> && 和 \|\|，在 JS 运算过程中，都会将它们两边的值转为布尔值，然后再算值，&& 运算如果返回true，则取后面的值，如果\|\| 返回true,则取前面的值 




**应用场景：**

\|\| 可以让我们使用一种更快捷简易的方式为参数添加默认值。例如，写jQuery插件的时候，可选参数是可以缺省的，此时实际上值为undefined，会让后面的参数extend产生困扰。因此，我们会经常见到类似这样的代码：

```
$.fn.plugin = function(options) {
    options = options || {};
    // ...
};
```


## 3、1 || "foo" && 0

结果是1

> 逻辑与运算符(&&)优先级要大于逻辑或(\|\|)。 



## 4、(1, 2, 3)

结果是3

> 逗号表达式的一般形式是：表达式1，表达式2，表达式3……表达式n <br /> 
> 逗号表达式的求解过程是：先计算表达式1的值，再计算表达式2的值，……一直计算到表达式n的值。最后**整个逗号表达式的值**是**表达式n的值**。 

延伸一下：

```
alert(1,2,3) 结果会是多少？
```

结果会返回1

因为alert()后面的这个括号是一个函数执行，所以会返回传入的第一个参数1。

如果这样写 

```
alert((1,2,3))
```

它的返回值就是3。


## 5、 shift

```
x = { shift: [].shift };
x.shift();
x.length;	//返回的是？
```

返回0


额外补充一下数组中的几个方法

```
pop 和 push：一个是尾部移除，一个是尾部添加
shift 和 unshift：一个是头部移除，一个是头部添加

pop 和 shift 都是做删除工作的  //字母少的都是做删除工作的，不要记混了
```

> from MDN <br />
> 1. shift 方法移除索引为 0 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 1。如果 length 属性的值为 0 (长度为 0)，则返回 undefined。 <br />
> 2. shift 方法并不局限于数组：该方法亦可通过**call或apply**作用于对象上。**对于不包含length属性的对象，将添加一个值为0的length属性。**

因为shift 删除第一个元素后，也会改变使其它元素的索引值，所以比pop方法要慢。

现在来看一下这道题

根据上面查到的资料，x 本来没有 length，在被数组方法call后，添加了一个值为0的length属性。此为数组shift方法的泛化性，专业术语为泛型(generic)。其基友方法，例如pop, push等都是如此。

x.shift() 就等同于[].shift.call(x)，一步步来解析一下：


```
var x = {
    shift: function() {
        console.log(this === x); // true
    }
};
x.shift();
```

因此，x.shift()就等同于[].shift 的执行，只不过，[].shift()函数中的this上下文就是x(因为this===x)，就等同于直接的[].shift.call(x)调用。

这条题目中x对象的shift属性名实际上是用来干扰，提高解答难度的刻意命名。我们使用其他命名，结果也是一样的。


## 6、{foo:1}[0]

结果是[0], 或者这种表现形式0 { 0 : 0 } – 来自IE控制台.

不要试图使用alert或者控制台console.log输出，这只会返回不一样的结果undefined，哦？为何会有这等差异？

出题者james在”Labelled blocks, useful?“中有这样的解释：

> Since JavaScript doesn’t have block scope, using a block anywhere other than in the conventional places (if/while etc.) is almost totally pointless. However, as I mentioned, we could use them to annotate and contain logically related pieces of code…

意思是说：

> 因为JavaScript没有块作用域，所以，如果语句块不是常规使用，如if/while等，其几乎就是打酱油的。甚至，我们可以利用这个特性注释或者包含相关的逻辑片段代码…

我们有必要好好理解这里“打酱油的”意思，这里的“打酱油”并不是指{}块中语句是打酱油，而是其本身就是个酱油。嘛意思，实例说明一切：

```
2 // 返回值为2
{2} // 返回值为2
str = "string" // 返回值为string
{ str = "string" } // 返回值为string
foo: 1 // 返回值为1
{ foo: 1 } // 返回值为1
```

因此，这里的答案就不难理解了，{foo:1}[0]实际上就是foo:1; [0]. 返回的就是[0]本身。


## 7、[true, false][+true, +false]

结果是true

true == 1, false == 0，[+true, +false] == [+1, +0]

[true, false]为数组，后面的[+true, +false]实际为索引，然而索引只需要一个值，因此，[+true, +false]返回的实际是我们上面提到的逗号运算——返回最后一个值，也就是+0, 也就是0，所以答案为 true。


## 8、++'52'.split('')[0]

结果是6

此题难点在于运算符的优先级

![image01](https://lilywei739.github.io/img/20170105/20170105-1.jpg)



## 9、a: b: c: d: e: f: g: 1, 2, 3, 4, 5;

结果是：5

根据规范，a: b: c: ... g:在语句执行之前会归到一个标签集中，为一个集合。因此，走个极端的话，我们可以这么理解：
abcdefg: 1, 2, 3, 4, 5. 1, 2, 3, 4, 5一开始有说明的逗号多重运算啦——返回最后一个值，因此，本题就类似于提问：

```
abcdefg: 5
```


## 9、{a: 1, b: 2}[["b"]]

第6题中，我们已经讲过，JavaScript没有块作用域，块本身几乎是个酱油，因此这里的测试题实际等同于：

```
a: 1, b: 2;[["b"]]
```

但是竟然报错,

现在的疑问是，为何a: 1, b: 2会报错？微博提问……

30分钟后，@紫云妃给出了这样的解释：


> 逗号运算符右侧必须是个表达式,不能是非表达式的语句,这个例子中a: 1, b: 2的右侧的b: 2是一个LabelledStatement, 不是表达式。


## 10、"b" + 45

结果是："b45"

> 字符串+数值=字符串



## 12、{a:{b:2}}

结果是：2

{a:{b:2}}近乎于a:b:2, 想起a,b,c,...g的例子没有，显然，这里返回值是2.

## 13、(function(){}())

结果是：undefined.


## 14、[1,2$,3,4,5][0..toString.length]??????????

结果还是：2


## 15、({} + 'b' > {} + 'a')

结果是：true.

需要注意最外面的括号。如果没有最外面的括号，则{}则几乎无意义，但是这里，作为常规用法，{}表示原生对象。因此，这里的比较实际上就是比较("[object Object]b" > "[object Object]a"), 因此返回的是true.

说点题外的，如果最外部没有括号，{} + 'b'返回的是NaN. 于是{} + 'b' > {} + 'a'变成了比较NaN > NaN, 结果为false.



## 16、Number.prototype.x = function(){ return this === 123; };  (123).x();


结果是：false.

我们这里使用了严格相等。实际上this和123属于不同的类型。


```
typeof this === “object”
typeof 123 === “number”
```

因此，结果为false. 如果我们把题目修改成弱等于，则返回结果就是true了，

```
Number.prototype.x = function(){ return this == 123; };
(123).x(); //==>true
```

## 17、Array(2).join()	

结果是","

Array(2)的返回值是[undefined, undefined]，因此，其使用join连接之后，就是个逗号","（数组join为指定连接符时候使用默认的逗号","）。


## 18、vars: var vars = vars;

结果是：undefined.

现在看此题就简单多了，标记语句，返回值就是var vars = vars的返回值undefined.

var vars = vars并不会报vars为定义的错误是在于JS的置顶解析，其实var vars = vars的运作是这样子的：

```
var vars;
vars = vars;
```

## 19、{ foo = 123 }

结果是：123.



## 20、x = 1; (function(){return x; var x = 2;}())

结果是：undefined

涉及到作用域的问题。


## 21、delete [].length;


结果为false.

先看一下 delete 的特点

> from MDN <br />
> 一些对象的属性不能被delete 


```
x = 42;        // 隐式声明的全局变量
var y = 43;    // 显式声明的全局变量
myobj = {
  h: 4,    
  k: 5
}    

// 隐式声明的全局变量可以被删除
delete x;       // 返回 true 

// 显式声明的全局变量不能被删除,该属性不可配置（not configurable）
delete y;       // 返回 false 

//内置对象的内置属性不能被删除
delete Math.PI; // 返回 false

//用户定义的属性可以被删除
delete myobj.h; // 返回 true 

// myobj 是全局对象的属性，而不是变量
//因此可以被删除
delete myobj;   // 返回 true

function f() {
  var z = 44;

  // delete doesn't affect local variable names
  delete z;     // returns false
}
```

> 不能删除一个对象从原型继承而来的属性(不过你可以从原型上直接删掉它)

```
function Foo(){}
 Foo.prototype.bar = 42;
 var foo = new Foo();

 // 无效的操作
 delete foo.bar;       
   
 // logs 42，继承的属性
 console.log(foo.bar);       
    
 // 直接删除原型上的属性
 delete Foo.prototype.bar;
 
 // logs "undefined"，已经没有继承的属性
 console.log(foo.bar);
```


delete用来删除对象属性，成功删除返回true, 如果对方防御很强删不动则返回false.

如上面所述，数组中的length属性是不可删除的，因此这里返回的是false.





## 22、RegExp.prototype.toString = function() {return this.source}; /3/-/2/;	//返回的是？

结果是：1.

正则表达式有如下一些属性：source, global, ignoreCase, multiline, lastIndex. 其中：source属性为构成正则表达式Pattern的字符串；global属性是一Boolean值，表示正则表达式flags是否有"g"；ignoreCase属性是一Boolean值，表示正则表达式flags是否有"i"；multiline属性是一Boolean值，表示正则表达式flags是否有"m"；lastIndex属性指定从何处开始下次匹配的一个字符串类型的位置索引，当需要时该值会转换为一个整型数。

RegExp.prototype.toString扩展改变了默认的toString方法，当正则表达式需要应用toString方法进行字符串转换的时候，返回的就是正则表达式的source属性值。

## 23、{break;4;}

结果是报如下错误：SyntaxError: unlabeled break must be inside loop or switch.

意思是——解析错误：未标记的break必须在循环或switch中。

对照错误，我们加个标记，使之成为标记语句，就不会出错了。类似下面：

```
foo: { break foo; 4;} 
```


## 24、'foo' == new function(){ return String('foo'); };

结果为：false.

由于这里是==, 'foo'又是正宗的字符串，因此，后面的new...需要转换成字符串。

```
new function(){ return String('foo'); } + ""; // "[object Object]"
```

显然，'foo' == "[object Object]"为false.

本题如果稍作一点修改，则结果完全不一样：

```
'foo' == new function(){ return new String('foo'); };	//返回的是？
```

结果为：true.


为什么呢？JavaScript中有5种基本类型（Undefined类型、Null类型、Boolean类型、Number类型、String类型），如果new后面的function return的是这5中基本类型之一，new会认为你是纯屌丝，不理你，还是返回自己创建的匿名对象；当然，如果返回数组啊、函数、对象这类高富帅，new立马变龟孙子了，返回的就是这些高富帅。

由于String("foo")是字符串，而new String("foo")是对象。因此，前者返回的是匿名函数对象——显然不等于"foo"；后者就是new String("foo")对象，加上"foo" == new String("foo")，于是，结果为true.


## 25、'foo'.split('') + []	//返回的是？

结果是："f,o,o".

记住，数组加数组，字符成老母。'foo'.split('')结果为数组["f", "o", "o"]，其变身字符串就是"f,o,o"跟后面的[]也就是""相加，就是最终的"f,o,o"了。

下面考考你，

```
[1, 2] + [3, 4]	//返回的是？
```

是不是"1,2,3,4"？恭喜你，，回答…………错误！

这又是整哪样啊！哥，你只是稍微粗心了点。[1, 2]变成字符串是"1,2", [3, 4]变成字符串是"3,4"，因此两者相加是"1,23,4"而不是"1,2,3,4".

空数组实际上是个很有意思的东西。

```
[] == 0 //true
!0 // true
![] // false
```

这些题目纯属是比较偏门的小知识点，查漏补缺记录一下。

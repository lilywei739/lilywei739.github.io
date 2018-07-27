---
layout: post
title: TypeScript (五) 
tags:
    - JS 
    - 前端  
---



## 类(一) 

从ECMAScript 6开始，JavaScript能够使用基于类的面向对象的方式。 TypeScript同样支持这种特性.


看一个使用类的例子：

```
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

这段代码声明一个 Greeter类。这个类有3个成员：一个叫做 greeting的属性，一个构造函数和一个 greet方法。最后 new 构造了 Greeter类的一个实例。 它会调用之前定义的构造函数，创建一个 Greeter类型的新对象，并执行构造函数初始化它

### 继承

在TypeScript里，可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

看下面的例子：

```
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

这个例子展示了最基本的继承：类从基类中继承了属性和方法。 

Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 

派生类通常被称作子类，基类通常被称作超类。

再看个更加复杂的例子:

```
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

这个例子展示了一些上面没有提到的特性。 使用 extends关键字创建了 Animal的两个子类： Horse和 Snake。

与前一个例子的不同点是，派生类包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，一定要调用 super()。 这个是**TypeScript强制执行的一条重要规则**。

这个例子演示了如何在子类里可以重写父类的方法。 Snake 类和 Horse 类都创建了 move 方法，它们重写了从 Animal继承来的 move方法，使得 move方法根据不同的类而具有不同的功能。 

注意，即使 tom 被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法：

```
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```


### 公共，私有与受保护的修饰符


**默认为 public**

在上面的例子里，可以自由的访问程序里定义的成员。 如果对其它语言中的类比较了解，就会注意到在之前的代码里并没有使用 public 来做修饰；例如，C#要求必须明确地使用 public指定成员是可见的。在TypeScript里，成员都默认为 public。

也可以明确的将一个成员标记成 public。 来重写上面的 Animal类：

```
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

```


**private**

当成员被标记成 private时，它就不能在声明它的类的外部访问。比如：

```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

TypeScript使用的是结构性类型系统。 当比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，才认为这两个类型是兼容的。 对于 protected 成员也使用这个规则。

下面来看一个例子，更好地说明了这一点：

```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```

这个例子中有 Animal和 Rhino两个类， Rhino是 Animal类的子类。 还有一个 Employee类，其类型看上去与 Animal是相同的。 

这里创建了几个这些类的实例，并相互赋值来看看会发生什么。

 因为 Animal和 Rhino共享了来自 Animal里的私有成员定义 private name: string，因此它们是兼容的。 然而 Employee却不是这样。当把 Employee赋值给 Animal的时候，得到一个错误，说它们的类型不兼容。 尽管 Employee里也有一个私有成员 name，但它明显不是 Animal里面定义的那个。

**protected**

protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问。例如：

```
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

注意，不能在 Person类外使用 name，但是仍然可以通过 Employee类的实例方法访问，因为 Employee是由 Person派生而来的。

构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。比如，

```
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```



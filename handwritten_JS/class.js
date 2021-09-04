class B1 {
  constructor(opt) {
    this.BName = opt.name;
  }
}
class A1 extends B1 {
  constructor() {
    // 向父类传参
    super({ name: 'B' });
    // this 必须在 super() 下面使用
    console.log(this);
  }
}


// 寄生组合继承
// 原型链继承，使子类可以调用父类原型上的方法和属性
// 借用构造函数继承，可以实现向父类传参
// 寄生继承，创造干净的没有构造方法的函数，用来寄生父类的 prototype

// 实现继承，通过继承父类 prototype
function __extends(child, parent) {
  // 修改对象原型
  Object.setPrototypeOf(child, parent);
  // 寄生继承，创建一个干净的构造函数，用于继承父类的 prototype
  // 这样做的好处是，修改子类的 prototype 不会影响父类的 prototype
  function __() {
    // 修正 constructor 指向子类
    this.constructor = child;
  }
  // 原型继承，继承父类原型属性，但是无法向父类构造函数传参
  child.prototype =
    parent === null
      ? Object.create(parent)
      : ((__.prototype = parent.prototype), new __());
}
 
var B = (function() {
  function B(opt) {
    console.log(opt)
    this.name = opt && opt.name;
  }
  return B;
})();
 
var A = (function(_super) {
  __extends(A, _super);
  function A() {
    // 借用继承，可以实现向父类传参, 使用 super 可以向父类传参
    return (_super !== null && _super.apply(this, { name: 'B' })) || this;
  }
  return A;
})(B);

// test
const a = new A();
console.log(a.BName, a.constructor); // B ,ƒ A() {}




// super 1作为函数调用时代表父类的构造函数  子类的构造函数必须执行一次super函数
// 2作为普通对象使用时指的是父类的原型对象
class X {
  constructor() {
    console.log(new.target.name)
  }
  p() {
    return 2
  }
}
class Y extends X {
  constructor() {
    super() // X.prototype.constructor.call(this)
    console.log(super.p()) // X.prototype.p()  由于super指向父类原型对象，所以定义在父类实例（constructor中）上的方法或属性是无法通过super调用的。
  }
}

new X()
new Y()
console.log(Y.__proto__ === X)
console.log(Y.prototype.__proto__ === X.prototype)
// Y的实例继承X的实例
Object.setPrototypeOf(Y.prototype, X.prototype)
// Y的实例继承X的静态属性
Object.setPrototypeOf(Y, X)
Object.setPrototypeOf = function(obj, proto) {
  obj.__proto__ = proto
  return obj
}

// super在静态方法中指向父类，普通方法中指向父类的原型对象。使用super时，必须显示指定是作为函数还是作为对象使用，否则会报错
class Parent {
  static myMethod(msg) {
    console.log('static', msg)
  }
  myMethod(msg) {
    console.log('instance', msg)
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg)
  }
  myMethod(msg) {
    super.myMethod(msg)
  }
}

Child.myMethod(1) // static 1
let child = new Child()
child.myMethod(2) // instance 2


// 构造函数的继承     方法的继承

// 1子类继承Object
console.log(Y.__proto__ === Object)
console.log(Y.prototype.__proto__ === Object.prototype)
// 2不存在任何继承
console.log(Y.__proto__ === Function.prototype)
console.log(Y.prototype.__proto__ === Object.prototype)
// 3继承null
console.log(Y.__proto__ === Function.prototype)
console.log(Y.prototype.__proto__ === undefined)

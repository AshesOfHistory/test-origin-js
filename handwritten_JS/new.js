// 创建一个新对象；

// 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）

// 执行构造函数中的代码（为这个新对象添加属性）

// 返回新对象。

function myNew() {
  // 创建一个实例对象
  var obj = new Object();
  // 取得外部传入的构造器
  var Constructor = Array.prototype.shift.call(arguments);
  // 实现继承，实例可以访问构造器的属性
  obj.__proto__ = Constructor.prototype;
  // 调用构造器，并改变其 this 指向到实例
  var ret = Constructor.apply(obj, arguments);
  // 如果构造函数返回值是对象则返回这个对象，如果不是对象则返回新的实例对象
  return typeof ret === 'object' ? ret : obj;
}



// ========= 无返回值 =============
const testNewFun = function(name) {
  this.name = name;
};
 
const newObj = myNew(testNewFun, 'foo');
 
console.log(newObj); // { name: "foo" }
console.log(newObj instanceof testNewFun); // true
// ========= 有返回值 =============
const testNewFun1 = function(name) {
  this.name = name;
  return {};
};
 
const newObj1 = myNew(testNewFun1, 'foo');
 
console.log(newObj1); // {}
console.log(newObj1 instanceof testNewFun1); // false





// --------------
// new.target 返回new命令所使用的构造函数     子类继承父类时new.target返回子类
function Person(name) {
  if (new.target === Person) {
    this.name = name
  } else {
    console.log('必须使用new生成实例')
    // throw new Error('必须使用new生成实例')
  }
}

let person = new Person('zhangsan') // true
let netPerson = Person.call(person, 'zhangsan') // error

// 封装抽象类
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化')
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    console.log(new.target === Rectangle)
    console.log(new.target === Square)
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length)
  }
}

let obj = new Square(3) // false
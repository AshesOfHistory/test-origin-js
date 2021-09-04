// call、aplly、bind 本质都是改变 this 的指向，不同点 call、aplly 是直接调用函数，bind 是返回一个新的函数。call 跟 aplly 就只有参数上不同。

// bind 实现
// - 箭头函数的 this 永远指向它所在的作用域
// - 函数作为构造函数用 new 关键字调用时，不应该改变其 this 指向，因为 new绑定 的优先级高于 显示绑定 和 硬绑定
Function.prototype.mybind = function(thisArg) {
  if (typeof this !== 'function') {
    throw TypeError("Bind must be called on a function");
  }
  // 拿到参数，为了传给调用者
  const args = Array.prototype.slice.call(arguments, 1),
    // 保存 this
    self = this,
    // 构建一个干净的函数，用于保存原函数的原型
    nop = function() {},
    // 绑定的函数
    bound = function() {
      // this instanceof nop, 判断是否使用 new 来调用 bound
      // 如果是 new 来调用的话，this的指向就是其实例，
      // 如果不是 new 调用的话，就改变 this 指向到指定的对象 o
      return self.apply(
        this instanceof nop ? this : thisArg,
        args.concat(Array.prototype.slice.call(arguments))
      );
    };

  // 箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
  if (this.prototype) {
    nop.prototype = this.prototype;
  }
  // 修改绑定函数的原型指向
  bound.prototype = new nop();

  return bound;
}

// testBind
const bar1 = function() {
  console.log(this.name, arguments);
};
 
bar1.prototype.name = 'bar1';
 
const foo1 = {
  name: 'foo1'
};
 
const bound = bar1.mybind(foo1, 22, 33, 44);
new bound(); // bar1, [22, 33, 44]
bound(); // foo1, [22, 33, 44]



// call实现
// bind 是封装了 call 的方法改变了 this 的指向并返回一个新的函数，那么 call 是如何做到改变 this 的指向呢？原理很简单，在方法调用模式下，this 总是指向调用它所在方法的对象，this 的指向与所在方法的调用位置有关，而与方法的声明位置无关

Function.prototype.mycall = function(thisArg) {
  // this指向调用call的对象
  if (typeof this !== 'function') {
    // 调用call的若不是函数则报错
    throw new TypeError('Error');
  }
 
  const args = [...arguments].slice(1);
  thisArg = thisArg || window;
  // 将调用call函数的对象添加到thisArg的属性中
  thisArg.fn = this;
  // 执行该属性
  const result = thisArg.fn(...arg);
  // 删除该属性
  delete thisArg.fn;
  // 返回函数执行结果
  return result;
};


// apply

Function.prototype.myapply = function(thisArg) {
  if (typeof this !== 'function') {
    throw this + ' is not a function';
  }
 
  const args = arguments[1];
 
  thisArg.fn = this;
 
  const result = thisArg.fn(...arg);
 
  delete thisArg.fn;
 
  return result;
};

// test  call  apply
const bar = function() {
  console.log(this.name, arguments);
};
 
bar.prototype.name = 'bar';
 
const foo = {
  name: 'foo'
};
 
bar.mycall(foo, 1, 2, 3); // foo [1, 2, 3]
bar.myaplly(foo, [1, 2, 3]); // foo [1, 2, 3]
/*
 * @Author: 沧澜
 * @Date: 2021-08-06 17:40:23
 * @LastEditors: 沧澜
 * @LastEditTime: 2021-09-04 17:01:04
 * @FilePath: /test-origin-js/手写/Parasitic_combinatorial_inheritance.js
 * @Description:寄生组合继承
 */
function Super(foo) {
  this.foo = foo;
}
Super.prototype.printFoo = function () {
  console.log(this.foo);
};
function Sub(bar) {
  this.bar = bar;
  Super.call(this);
}
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

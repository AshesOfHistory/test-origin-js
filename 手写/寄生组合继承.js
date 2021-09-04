function Super(foo) {
  this.foo = foo
}
Super.prototype.printFoo = function() {
  console.log(this.foo)
}
function Sub(bar) {
  this.bar = bar
  Super.call(this)
}
Sub.prototype = Object.create(Super.prototype)
Sub.prototype.constructor = Sub



// 类修饰
@testable
class MyTestableClass {

}

function testable(target) {
  target.isTestable = true
}

@testable1(true)
class MyTestableClass1 {

}
function testable1(isTestAble) {
  return function(target) {
    target.isTestAble = isTestAble
  }
}

// =>  修饰器的本质就是编译时执行的函数  参数1 要修饰的目标类
class MyTestableClass {}
MyTestableClass = testable(MyTestableClass)

// ---------  mixin
function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}
const Foo = {
  foo() {console.log('foo')}
}
@mixins(Foo)
class MyClass {}

//---
class MyClass extends MyBaseClass {}
// ----
let MyMixin = (superclass) => class extends superclass {
  foo() {
    console.log('foo form MyMixin')
  }
}
let MyMixin1 = (superclass) => class extends superclass {
  foo() {
    console.log('foo form MyMixin')
    if (super.foo) super.foo()
  }
}
let MyMixin2 = (superclass) => class extends superclass {
  foo() {
    console.log('foo form MyMixin')
  }
}
class MyClass extends MyMixin(MyBaseClass) {}
class MyClass extends MyMixin1(MyMixin2(MyBaseClass)) {}

// 方法的修饰
class Person {
  @readonly
  name() {
    return `${this.first} ${this.last}`
  }
  @nonenumerable
  get kidCount() {
    return this.children.length
  }
  @log
  add(a, b) {
    return a+b
  }
}

function readonly(target, name, descriptor) {
  descriptor.writable = false
  return descriptor
}
readonly(Person.prototype, 'name', descriptor)
// 类似
Object.defineProperty(Person.prototype, 'name', descriptor)


function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false
  return descriptor
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value
  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments)
    return oldValue.apply(null, arguments)
  }
  return descriptor
}

// 如果同一个方法有多个修饰器，那么该方法会从外到内进入修饰器，然后由内到外执行
function dec(id) {
  console.log('evaluated', id)
  return (target, name, descriptor) => {
    console.log('executed', id)
  }
}
class Example {
  @dec(1)
  @dec(2)
  method() {}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1

// 修饰器不能直接修饰函数，因为存在函数提升  。类不会提升，所以可以使用修饰器

// 使用修饰器实现自动发布事件
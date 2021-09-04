// let 
// 在块级作用域内有效
// 不能重复声明
// 不能预处理，不存在变量提升，即未声明之前的代码不能调用
// 匿名函数+闭包 模拟let
// let c = 3
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self }
  if (typeof window !== 'undefined') { return window }
  if (typeof global !== 'undefined') { return global }
  throw new Error('unable to locate global object')
};

// let c = 3;
(function(){
  var c = 3
  console.log(c) //1
})()
// console.log(c)  //c is not defined

// const
// 在块级作用域内有效
// 不能重复声明
// 不能预处理，不存在变量提升，即未声明之前的代码不能调用
// 他除了有和let一样的特性外，还有自己的特性：不能修改（要注意，数组和对象属于引用数据类型，const保存的是指向对象的指针，所以修改其中的属性时指针不变，可以修改）
// 使用时必须初始化（必须赋值）
// const d = 4   _const('d', 4)
function _const(key, value) {
  getGlobal[key] = value;
  Object.defineProperty(getGlobal, key, {
    enumerable: false,
    configurable: false,
    get: function () {
      return value;
    },
    set: function (newValue) {
      if (newValue !== value) {
        throw TypeError("这是只读变量，不可修改");
      } else {
        return value;
      }
    },
  });
}
_const('d', 4)
console.log(getGlobal['d'])

// 将一个对象彻底冻结
var constantize = (obj) => {
  Object.freeze(obj)
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key])
    }
  })
}
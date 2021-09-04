// 获取全局对象  方法1
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self }
  if (typeof window !== 'undefined') { return window }
  if (typeof global !== 'undefined') { return global }
  throw new Error('unable to locate global object')
}
// 方法2
(typeof window !== 'undefined'
? window
: (typeof process === 'object' &&
  typeof require === 'function' &&
  typeof global === 'object')
  ? global
  : this)
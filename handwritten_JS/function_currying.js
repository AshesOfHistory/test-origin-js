/*
 * @Author: 沧澜
 * @Date: 2021-08-06 16:25:48
 * @LastEditors: 沧澜
 * @LastEditTime: 2021-09-04 16:55:21
 * @FilePath: /test-origin-js/手写/function_currying.js
 * @Description:函数柯里化
 */
// 延迟计算 （用闭包把传入参数保存起来，当传入参数的数量足够执行函数时，开始执行函数）

// 动态创建函数 （参数不够时会返回接受剩下参数的函数）

// 参数复用（每个参数可以多次复用）

const curry = (fn) =>
  (judge = (...args) =>
    args.length === fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg));

const sum = (a, b, c, d) => a + b + c + d;
const currySum = curry(sum);

currySum(1)(2)(3)(4); // 10
currySum(1, 2)(3)(4); // 10
currySum(1)(2, 3)(4); // 10

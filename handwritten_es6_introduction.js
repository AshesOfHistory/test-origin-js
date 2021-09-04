function call() {

}

function apply() {

}

function bind() {

}

function flat() {

}

// 遍历器生成函数 模拟generate的next方法
function makeIterator(array) {
  let nextIndex = 0
  return {
    next() {
      return nextIndex < array.length ?
        { value: array[nextIndex++], done: false } :
        { value: undefined, done: true }
    }
  }
}

class RangeIterator {
  constructor(start, stop) {
    this.value = start
    this.stop = stop
  }
  [Symbol.iterator]() { return this }
  next() {
    var value = this.value
    if (value < this.stop) {
      this.value++
      return { done: false, value: value }
    }
    return { done: true, value: undefined }
  }
}
function range(start, stop) {
  return new RangeIterator(start, stop)
}
for (var value of range(0, 3)) {
  console.log(value) // 0, 1, 2
}

// Promise
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}

Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      setTimeout(() => { throw reason }, 0)
    })
}

// async co自执行模块
function co(gen) {
  let ctx = this
  return new Promise((resolve, reject) => {
    if (typeof gen === 'function') gen = gen.call(ctx)
    if (!gen || typeof gen.next !== 'function') return resolve(gen)

    onFulfilled()
    function onFulfilled(res) {
      let ret
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }
  })
}

function next(ret) {
  if (ret.done) return resolve(ret.value)
  let value = toPromise.call(ctx, ret.value)
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected)
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "'
      + String(ret.value)
      + '"'
    )
  )
}

// 自动执行器简易版
function run(gen) {
  let g = gen()
  function next(data) {
    let result = g.next(data)
    if (result.done) return result.value
    result.value.then(function (data) {
      next(data)
    })
  }
  next()
}
// 只要generator没有执行到最后一步，就调用自身
run(gen)


// async实现原理
async function fn(args) {
  // ...
}

// ===>
function fn(args) {
  return spawn(function *() {
    //...
  })
}

function spawn(genF) {
  return new Promise(function (resolve, reject) {
    var gen = genF()
    function step(nextF) {
      try {
        let next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(function(v) {
        step(function () {return gen.next(v)})
      }, function(e) {
        step(function() {return gen.throw(e)})
      })
    }
    step(function() {return gen.next(undefined)})
  })
}

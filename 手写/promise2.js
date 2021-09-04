(function (window) {

  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  function Promise(excutor) {
    this.status = PENDING // 给promise对象指定status属性，初始值为pending
    this.data = undefined // 给promise对象指定一个用于存储结果数据的属性(value, reason)
    this.callbacks = [] // callbacks数组中每个元素的结构: { onResolved() {}, onRejected() {}}

    // 在function中 谁调用function this就指向谁 这里会变成window
    // 所以需要在function外部，构造函数内部 定义一个常量self 保存Promise对象
    const self = this;
    function resolve(value) {
      // 如果当前状态不是pending,直接结束
      // 因为promise的状态只能被改变一次，也就是说必须从pending状态开始改变
      if (self.status !== PENDING) {
        return
      }
      // 将状态改为resolved
      self.status = RESOLVED
      // 保存value数据
      self.data = value
      // 如果有待执行callback函数，立即异步执行回调函数onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callback => {
            callback.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      // 如果当前状态不是pending,直接结束
      if (self.status !== PENDING) {
        return
      }
      // 将状态改为rejected
      self.status = REJECTED
      // 保存value数据
      self.data = reason
      // 如果有待执行callback函数，立即异步执行回调函数onRejected
      if (self.callbacks.length > 0) {
        setTimeout(() => {
          self.callbacks.forEach(callback => {
            callback.onRejected(reason)
          })
        })
      }
    }

    // 立即同步执行excutor
    try {
      excutor(resolve, reject)
    } catch (error) { // 如果执行器抛出异常，promise对象变为rejected状态
      reject(error)
    }
  }
  /*
    下面函数定义在Promise的原型上，所以需要通过Promise.prototype.then去定义
    调用是通过Promise的实例对象进行调用
  */
  /**
   * Promise的原型对象函数then()
   * 指定成功/失败的回调函数
   * 返回一个新的promise对象
   */
  Promise.prototype.then = function (onResolved, onRejected) {

    const self = this;

    // 判断onResolved, onRejected是否传入的是一个函数 如果不是 则重新赋值
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    // 指定默认的失败的回调（实现异常传透的关键步骤）
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    // 为了可以链式调用 所以返回的是一个Promise对象
    return new Promise((resolve, reject) => {
      // 状态还是pending状态 将回调函数保存起来
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      } else if (self.status === RESOLVED) {
        // 如果当前是resolved状态，异步执行onResolve并改变return的promise状态
        setTimeout(() => {
          handle(onResolved)
        })
      } else {
        // 如果当前是rejected状态，异步执行onRejected并改变return的promise状态
        setTimeout(() => {
          handle(onRejected)
        })
      }

      /**
       * 调用指定回调函数处理，根据执行结果，改变return的promise的状态
       */
      function handle(callback) {
        /**
         * 1.如果抛出异常，return的promise就会失败，reason就是error
         * 2.如果回调函数返回不是promise, return的promise就会成功，value就是返回的值
         * 3.如果回调函数返回是promise, return的promise结果就是这个promise的结果
         */
        try {
          const result = callback(self.data);
          if (result instanceof Promise) {
            // 3.如果回调函数返回是promise, return的promise结果就是这个promise的结果
            // result.then(
            //   value => resolve(value), // 当result成功时， 让return的promise也成功
            //   reason => reject(reason) // 当result失败时， 让return的promise也失败
            // )
            result.then(resolve, reject)
          } else {
            // 2.如果回调函数返回不是promise, return的promise就会成功，value就是返回的值
            resolve(result)
          }
        } catch (error) {
          reject(error) //1.如果抛出异常，return的promise就会失败，reason就是error
        }
      }
    })
  }

  /**
   * Promise的原型对象函数catch()
   * 指定失败的回调函数
   * 返回一个新的promise对象
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }


  /*
    下面两个函数是定义在Promise上的，所以在Promise的构造函数中写
    调用是通过Promise.resolve(value)/Promise.reject(reason)进行调用
  */
  /**
   * Promise函数对象resolve
   * 返回一个指定结果的成功的promise
   */
  Promise.resolve = function (value) {
    // 返回一个成功/失败的promise
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  /**
   * Promise函数对象reject
   * 返回一个指定reason的失败的promise
   */
  Promise.reject = function(reason){
    // 返回一个失败的promise
    return new Promise((resolve, reject)=>{
      reject(reason)
    })
  }
  
  /**
   * Promise函数对象all
   * 返回一个promise, 只有当所有proimse都成功时才成功，否则失败
   */
  Promise.all = function(promises){
    return new Promise((resolve, reject)=>{
      // 用来保存所有成功value的数组
      const values = new Array(promises.length)
      let resolveCount = 0
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            resolveCount++
            values[index] = value
            if(resolveCount === promises.length){
              resolve(values)
            }
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }
  
  /**
   * Promise函数对象race
   * 返回一个promise,其结果由第一个完成的promise决定
   */
  Promise.race = function(promises){
    return new Promise((resolve, reject)=>{
      promises.forEach(p => {
        Promise.resolve(p).then(
          value => {
            resolve(value)
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }
  
  // 向外暴露promise
  window.Promise = Promise
})(window)








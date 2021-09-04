class EventEmitter {
  #subs = {}
  emit(event, ...args) {
      if (this.#subs[event] && this.#subs[event].length) {
          this.#subs[event].forEach(cb => cb(...args))
      }
  }
  on(event, cb) {
      (this.#subs[event] || (this.#subs[event] = [])).push(cb)
  }
  off(event, offCb) {
  if (offCb) {
      if (this.#subs[event] && this.#subs[event].length)
          this.#subs[event] = this.#subs[event].filter(cb => cb !== offCb)
    } else {
      this.#subs[event] = []
    }
  }
}

// subs是EventEmitter私有属性(最新特性参考阮一峰老师的ECMAScript 6 入门)，通过on注册事件，off注销事件，emit触发事件
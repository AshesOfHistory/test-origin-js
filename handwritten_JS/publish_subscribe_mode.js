/*
 * @Author: 沧澜
 * @Date: 2021-08-06 17:39:36
 * @LastEditors: 沧澜
 * @LastEditTime: 2021-09-04 16:53:39
 * @FilePath: /test-origin-js/手写/publish_subscribe_mode.js
 * @Description: 发布订阅模式
 */
class EventEmitter {
  #subs = {};
  emit(event, ...args) {
    if (this.#subs[event] && this.#subs[event].length) {
      this.#subs[event].forEach((cb) => cb(...args));
    }
  }
  on(event, cb) {
    (this.#subs[event] || (this.#subs[event] = [])).push(cb);
  }
  off(event, offCb) {
    if (offCb) {
      if (this.#subs[event] && this.#subs[event].length)
        this.#subs[event] = this.#subs[event].filter((cb) => cb !== offCb);
    } else {
      this.#subs[event] = [];
    }
  }
}

// subs是EventEmitter私有属性(最新特性参考阮一峰老师的ECMAScript 6 入门)，通过on注册事件，off注销事件，emit触发事件

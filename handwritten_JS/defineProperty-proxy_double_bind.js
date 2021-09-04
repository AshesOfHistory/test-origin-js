/*
 * @Author: 沧澜
 * @Date: 2021-08-06 16:16:45
 * @LastEditors: 沧澜
 * @LastEditTime: 2021-09-04 16:56:01
 * @FilePath: /test-origin-js/手写/defineProperty-proxy_double_bind.js
 * @Description:vue双向绑定两种方式   defineProperty   proxy两种方式
 */
// 数据  defineProperty
const data = {
  text: "default",
};
const input = document.getElementById("input");
const span = document.getElementById("span");
// 数据劫持
Object.defineProperty(data, "text", {
  // 数据变化 --> 修改视图
  set(newVal) {
    input.value = newVal;
    span.innerHTML = newVal;
  },
});
// 视图更改 --> 数据变化
input.addEventListener("keyup", function (e) {
  data.text = e.target.value;
});

// 数据  proxy
const data = {
  text: "default",
};
const input = document.getElementById("input");
const span = document.getElementById("span");
// 数据劫持
const handler = {
  set(target, key, value) {
    target[key] = value;
    // 数据变化 --> 修改视图
    input.value = value;
    span.innerHTML = value;
    return value;
  },
};
const proxy = new Proxy(data);

// 视图更改 --> 数据变化
input.addEventListener("keyup", function (e) {
  proxy.text = e.target.value;
});

function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

null instanceof null // TypeError: Right-hand side of 'instanceof' is not an object
typeof null // object


// instanceof
// 原理：L 的 __proto__ 是不是等于 R.prototype，不等于再找 L.__proto__.__proto__ 直到 __proto__ 为 null
// L 表示左表达式，R 表示右表达式
function instance_of(L, R) {
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    // 这里重点：当 O 严格等于 L 时，返回 true
    if (O === L) return true;
    L = L.__proto__;
  }
}

function Foo() {
}

Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
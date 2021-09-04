function Object() {
  this.__proto__ = Function.prototype
  this.create = function(constructor) {
    return new constructor.__proto__.constructor
  }
  this.is = (x, y) => {// Object.is(x, y)
    if (x === y) { // 针对+0 == = -0情况
      return x !== 0 || 1 / x === 1 / y
    }// 针对NaN!==NaN情况
    return x !== x && y !== y
  }
}

Object.prototype = {
  type: 'object',
  __proto__: null,
  constructor: Object,
  // ...原生对象属性以及函数
  toString() {},
  valueOf() {},
  isPropertyOf() {},
  hasOwnProperty() {},
  propertyIsEnumerable() {},
  toLocaleString() {},
  __defineGetter__() {},
  __defineSetter__() {},
  __lookupGetter__() {},
  __lookupSetter__() {},
  ["get __proto__"]() {},
  ["set __proto__"]() {}
}

function Function() {
  this.__proto__ = Function.prototype
}

Function.prototype = {
  type: 'function',
  __proto__: Object.prototype,
  constructor: Function,
  split() {}
}

function Number() {
  this.__proto__ = Function.prototype
}

Number.prototype = {
  type: 'number',
  __proto__: Object.prototype,
  constructor: Number,
  toFixed() {},
  toLocaleString() {},
  toPrecision() {},
  toString() {},
  valueOf() {},
  [[PrimitiveValue]]: 0
}

function String() {
  this.__proto__ = Function.prototype
}

String.prototype = {
  type: 'string',
  __proto__: Object.prototype,
  constructor: String,
  anchor() {},
  big() {},
  blink() {},
  bold() {},
  charAt() {},
  charCodeAt() {},
  codePointAt() {},
  concat() {},
  endsWith() {},
  fixed() {},
  fontcolor() {},
  fontsize() {},
  includes(arr, value) {
    if (Array.isArray(arr)) {
      arr.some(el => Object.is(el, value))
    }
  },
  indexOf() {},
  italics() {},
  lastIndexOf() {},
  length() {},
  link() {},
  localeCompare() {},
  match() {},
  matchAll() {},
  normalize() {},
  padEnd() {},
  padStart() {},
  repeat() {},
  replace() {},
  replaceAll() {},
  search() {},
  slice(start, end) {
    var startToUse = start || 0
        endToUse = end || ToUint32(this.length)
        result = []
    for(var i = startToUse; i < endToUse; i++) {
      result.push(this[i])
    }
    return result
  },
  small() {},
  split() {},
  startsWith() {},
  strike() {},
  sub() {},
  substr() {},
  substring() {},
  sup() {},
  toLocaleLowerCase() {},
  toLocaleUpperCase() {},
  toLowerCase() {},
  toString() {},
  toUpperCase() {},
  trim() {},
  trimEnd() {},
  trimLeft() {},
  trimRight() {},
  trimStart() {},
  valueOf() {},
  trimRight() {},
  [Symbol.iterator]() {},
  [[PrimitiveValue]]: ""
}

function Boolean() {
  this.__proto__ = Function.prototype
}

Boolean.prototype = {
  type: 'boolean',
  __proto__: Object.prototype,
  constructor: Boolean,
  toString() {},
  valueOf() {},
  [[PrimitiveValue]]: false
}

function People() {
  this.__proto__ = Function.prototype
}

People.prototype = {
  type: 'function',
  __proto__: Object.prototype,
  constructor: People,
  // 自定义属性及函数
}


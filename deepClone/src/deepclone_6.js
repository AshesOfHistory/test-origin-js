// 可遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 不可遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 原始类型  引用类型 数组 对象（特殊对象  正则 特殊字符 error 函数 date）  toString获取合理的日期对象
// 对象的可遍历性    其他不可遍历的类型
// 可以看到，while的效率是最好的，所以，我们可以想办法把for in遍历改变为while遍历。   while 4ms for循环 12ms for in 141ms
// 具有通用函数的抽象能力。 性能优化
// 能考虑到循环引用的问题，展示了你考虑问题的全面性，如果还能用WeakMap解决内存释放垃圾回收的问题，进一步展示知识面的广度。WeakMap的话，target和obj存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
// 设想一下，如果我们要拷贝的对象非常庞大时，使用Map会对内存造成非常大的额外消耗，而且我们需要手动清除Map的属性才能释放这块内存
// 克隆函数   箭头函数  普通函数    箭头函数没有prototype
// 我们可以直接使用eval和函数字符串来重新生成一个箭头函数，注意这种方法是不适用于普通函数的。
// 我们可以使用正则来处理普通函数
// 分别使用正则取出函数体和函数参数，然后使用new Function ([arg1[, arg2[, ...argN]],] functionBody)构造函数重新构造一个新的函数

// 工具函数  封装while循环
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

// 工具函数 判断是否为引用类型
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

// 工具函数 判断引用类型
function getType(target) {
    return Object.prototype.toString.call(target);
}

// 初始化被克隆的函数
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

// 工具函数  克隆Symbol
function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

// 工具函数 克隆正则
function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

// 工具函数  克隆函数
function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

// 工具函数  克隆不可遍历的类型
function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

// weakMap优化对象引用，垃圾回收   主函数运行
function clone(target, map = new WeakMap()) {

    // 克隆原始类型   原始类型直接返回
    if (!isObject(target)) {
        return target;
    }

    // 初始化 根据不同类型操作
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
}

module.exports = {
    clone
};


// 基本实现

// 递归能力
// 循环引用

// 考虑问题的全面性
// 理解weakmap的真正意义


// 多种类型
// 考虑问题的严谨性
// 创建各种引用类型的方法，JS API的熟练程度
// 准确的判断数据类型，对数据类型的理解程度


// 通用遍历：
// 写代码可以考虑性能优化
// 了解集中遍历的效率
// 代码抽象能力


// 拷贝函数：
// 箭头函数和普通函数的区别
// 正则表达式熟练程度

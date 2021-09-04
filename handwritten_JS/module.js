// require 运行时加载
// import  编译时加载

// export，import 输出的接口预期对应的值是动态绑定关系，通过该接口可以获取到模块内部的值   值的引用  类似unix的符号连接   生成一个变量只读引用，不可重新赋值
// commonjs模块输出的是值的缓存   值的复制

// export必须处于代码顶层，因为处于块级作用域内无法做静态优化。
// import是静态执行的，无法使用表达式和变量

// export * 命令会忽略导入的模块的default方法

// import无法取代require的动态加载功能
// import() 提案   可以动态加载   可以嵌套async

// script 默认同步加载   异步加载方式 defer（等页面渲染结束才执行）   async（一旦下载完成中断渲染执行这个脚本以后才继续渲染）
// defer 渲染完执行  async 下载完执行

// 利用模块顶层this===undefined语法点，可以监测当前代码是否处于es6模块之中



// common加载的是一个对象，即module.exports属性，该对象只有在脚本运行结束的时候才会生成
// es6不是对象，对外接口是一种静态定义



// Node环境下，静态分析阶段，只有有一行是import或者export，就会认为是es6模块，否则默认是commonjs模块。若不输出任何接口，但是想将其认为es6模块，可以加上 export {}

// import './foo'
// 依次寻找 './foo.js'   './foo/package.json'  './foo/index.js'
// import 'baz'
// 依次寻找 './node_modules/baz.js'  './node_modules/baz/package.json'  './node_modules/baz/index.js'
// '../node_modules/baz.js'  '../node_modules/baz/package.json'  '../node_modules/baz/index.js'
// '../../node_modules/baz.js'  '../../node_modules/baz/package.json'  '../../node_modules/baz/index.js'

// es6 顶层this是undefined     commonjs顶层this指向当前模块
// 循环加载



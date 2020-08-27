
// js 中一个函数就可以看作是一个模块，但使用函数或者用对象封装函数都会存在一些问题，
// 模块的写法：立即执行函数
let module1 = (function () {
  let count = 0
  let m1 = function () {
    console.log('here m1')
  }

  let m2 = function () {
    console.log('here m2')
  }

  return {
    m1: m1,
    m2: m2
  }
})()


/*
1，写模块应该遵循一些规范，以便共享
   js 模块有两种规范：CommonJS -> 适用于服务端，因为加载模块是同步的, 使用 require(path) 加载
                     AMD (Asynchronous Module Definition) -> 适用于客户端（浏览器）， 异步加载模块，不会造成网页堵塞
                                                             也是使用 require([deps], callback) 加载

   目前实现了 AMD 规范的js库有：require.js 和 curl.js

2. 介绍 AMD 规范的 require.js 库
  a, 优点:           1. 实现js文件的异步加载，避免网页失去响应； 
                     2. 管理模块之间的依赖性，便于代码的编写和维护。
                     3. 解决模块间的同名变量冲突，起到隔离作用
  b, 使用：  html: <script src="js/require.js" data-main="js/main"></script>

  c, require.js实现：核心是 require([], callback) 函数和 
            define([], callback) 函数 (模块必须用define()函数来定义)
  d, 例子：
    // math.js 模块
    define(['deps1', 'deps2'], function (){
    　　　　var add = function (x,y){
    　　　　　　return x+y
    　　　　}
    　　　　return {
    　　　　　　add: add
    　　　　}
    　　})

    // main.js 中使用 math.js 模块
    require(['math'], function (math){
    　　　　alert(math.add(1,1))
    　　})
    
3. Node.js 中的所有模块均为CommonJS规范，核心也是使用 require() 加载模块。
   Node.js 中 require(X) 的加载流程：
   a. 如果 X 是内置模块（比如 require('http'）): 返回该模块, 不再继续执行。
   b. 如果 X 以 "./" 或者 "/" 或者 "../" 开头: 根据 X 所在的父模块，确定 X 的绝对路径 -> 将 X 当成文件，
                                              依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。-> 将 X 当成目录，
                                              依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
   c. 如果 X 不带路径: 根据 X 所在的父模块，确定 X 可能的安装目录 -> 依次在每个目录中，将 X 当成文件名或目录名加载
   d. 抛出 "not found" 

     
4. CommonJS 模块 和 ES6 模块的循环加载，见 LoadCommonJS 和 LoadES6Module
     要点：CommonJS模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。
          CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
          ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个引用。
          等到真的需要用到时，再到模块里面去取值。
*/


function main () {
  console.log(module1)
  module1.m1()
}

main()

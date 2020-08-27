/*
CommonJS模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。
CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
*/
var a = require('./a.js')

/*
在终端运行 node b.js
PS E:\programm\FE advanced\LoadModule\learnModule> node b.js
module.id:  E:\programm\FE advanced\LoadModule\learnModule\a.js
module.exports:  {}
module.parent:  Module {
  id: '.',
  path: 'E:\\programm\\FE advanced\\LoadModule\\learnModule',
  exports: {},
  parent: null,
  filename: 'E:\\programm\\FE advanced\\LoadModule\\learnModule\\b.js',
  loaded: false,
  children: [
    Module {
      id: 'E:\\programm\\FE advanced\\LoadModule\\learnModule\\a.js',
      path: 'E:\\programm\\FE advanced\\LoadModule\\learnModule',
      exports: {},
      parent: [Circular],
      filename: 'E:\\programm\\FE advanced\\LoadModule\\learnModule\\a.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  ],
  paths: [
    'E:\\programm\\FE advanced\\LoadModule\\learnModule\\node_modules',
    'E:\\programm\\FE advanced\\LoadModule\\node_modules',
    'E:\\programm\\FE advanced\\node_modules',
    'E:\\programm\\node_modules',
    'E:\\node_modules'
  ]
}
module.filename:  E:\programm\FE advanced\LoadModule\learnModule\a.js
module.loaded:  false
module.children:  []
module.paths:  [
  'E:\\programm\\FE advanced\\LoadModule\\learnModule\\node_modules',
  'E:\\programm\\FE advanced\\LoadModule\\node_modules',
  'E:\\programm\\FE advanced\\node_modules',
  'E:\\programm\\node_modules',
  'E:\\node_modules'
]
 */


function main () {
  console.log('module.id: ', module.id);
  console.log('module.exports: ', module.exports);
  console.log('module.parent: ', module.parent);
  console.log('module.filename: ', module.filename);
  console.log('module.loaded: ', module.loaded);
  console.log('module.children: ', module.children);
  console.log('module.paths: ', module.paths);
}

main()
// if (require.main === module) {
//   main()
// }

/*
在终端运行 a.js
PS E:\programm\FE advanced\LoadModule\learnModule> node a.js
module.id:  .
module.exports:  {}
module.parent:  null
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
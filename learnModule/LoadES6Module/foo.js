//ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个引用。
//等到真的需要用到时，再到模块里面去取值。

import {bar} from './bar.js';
export function foo() {  
  if (Math.random() > 0.5) {
    bar();
  }
}
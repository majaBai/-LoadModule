import {foo} from './foo.js';
export function bar() {
  foo();  
  console.log('执行完毕');
}
bar();
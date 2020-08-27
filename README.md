# -LoadModule
此项目分为两部分：

i) a.html + static 文件夹模拟了 RequireJS 的核心功能。在浏览器 打开 a.html 会执行以下流程：
   1. 加载 myRequire.js 
   2. myRequire 会自动去加载a.js（data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的a.js，这个文件会第一个被myRequire.js加载。意思是a.js是整个网页的入口代码。它有点像C语言的         main()函数，所有代码都从这儿开始运行。
   3. 执行 a.js, 即执行 require 函数
    
ii) learnModule 文件夹中说明了CommonJS 规范、AMD 规范以及 ES6 import/export 模块加载机制的特点
  

// myRequire_v2 中 a.js 的依赖模块 b.js 和 helper.js 不能再依赖别的模块
// myRequire_v3 优化定义模块的函数 define， 解决递归解析任意层深度的依赖

(function (global) {

  const log = console.log.bind(console)
  const e = selector => document.querySelector(selector)
  const es = selector => document.querySelectorAll(selector)
  function isFunction (s) {
    return Object.prototype.toString.call(s) === '[object Function]'
  }

  function current () {
    return document.currentScript.src
  }

  function rootPath () {
    let src = current()
    // src: file:///E:/programm/FE%20advanced/LoadModule/static/js/a.js
    let lastIndex = src.lastIndexOf('/')
    let path = src.slice(0, lastIndex)
    return path
  }

  function resolvePath (relative) {
    if (!relative.endsWith('.js')) {
      relative += '.js'
    }
    let root = rootPath()
    let sp = root + '/' + relative
    return sp
  }

  function resolvedEntry () {
    let scripts = es('script')
    let last = scripts[scripts.length - 1]
    let main = last.dataset.main
    return main
  }

  let mapper = {}
  let depList = []

  function applyDependency (id) {
    log('id in apply ', id)
    let deps = mapper[id].deps
    let params = deps.map(d => mapper[d].exports)
    let callback = mapper[id].callback
    let r = callback.apply(global, params)
    mapper[id].exports = r
    mapper[id].loaded = true
  }

  function checkeDeps () {
    for (let i = depList.length - 1; i >= 0; i--) {
      let d = depList[i]
      let completed = true
      let deps = mapper[d].deps
      for (let j = 0; j < deps.length; j++) {
        let dep = deps[j]
        if (!mapper[dep] || !mapper[dep].loaded) {
          completed = false
          break
        }
      }
      if (completed) {
        log('all modules loaded over')
        depList.splice(i, 1)
        applyDependency(d)
        checkeDeps()
      }
    }
  }

  function loadDeps (id) {
    let deps = mapper[id].deps
    for (let d of deps) {
      loadScript(d, () => {
        depList.unshift(d)
        loadDeps(d)
        checkeDeps()
      })
    }
  }

  function loadScript (src, callback) {
    // insert js file into html dynamically 
    let script = document.createElement('script')
    script.src = src
    script.onload = () => {
      if (isFunction(callback)) {
        callback()
      }
    }
    script.onerror = () => {
      log(`${src} load failed`)
    }
    let head = document.head
    head.appendChild(script)
  }

  function require (deps, callback) {
    let id = current()
    log('id in require ', id)
    if (!mapper[id]) {
      let ds = deps.map(d => resolvePath(d))
      log('deps in require ', ds)
      mapper[id] = {
        deps: ds,
        callback: callback,
        exports: null,
        loaded: false,
      }
      depList.unshift(id)
    }
    loadDeps(id)
  }

  // define([], () => {})
  function define (deps, callback) {
    let id = current()
    if (!mapper[id]) {
      let ds = deps.map(d => resolvePath(d))
      mapper[id] = {
        exports: null,
        callback: callback,
        deps: ds,
        loaded: false
      }
    }
  }

  function init () {
    global.require = require
    global.define = define
  }

  function main () {
    let entry = resolvedEntry()
    loadScript(entry)
    init()
  }

  main()

})(this)


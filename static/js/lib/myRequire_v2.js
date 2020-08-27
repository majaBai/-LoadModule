
// myRequire_v2 添加了 define 函数, 所有模块都通过 define 函数来定义
// define([], () => {})
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


  let mapper = {}

  function require (deps, callback) {
    if (!Array.isArray(deps)) {
      return
    }

    let count = 0;
    let args = []
    for (let i = 0; i < deps.length; i++) {
      let script = document.createElement('script')
      let path = resolvePath(deps[i])
      log('path', path)
      script.src = path
      script.onload = () => {
        let arg = mapper[path].exports
        args.push(arg)
        count++
        if (count === deps.length) {
          log('all modules loaded over', mapper, args)
          callback(...args)
        }
      }
      let head = document.head
      head.appendChild(script)
    }
  }

  
  
  function define (deps, callback) {
    let id = current()
    log('id ' + id)
    if (!mapper.hasOwnProperty(id)) {
      let r = callback()
      mapper[id] = {
        exports: r,
      }
    }
  }

 

  function resolvedEntry () {
    let scripts = es('script')
    let last = scripts[scripts.length - 1]
    let main = last.dataset.main
    return main
  }


  function loadScript (src, callback) {
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

  function init () {
    global.require = require
    global.define = define
  }

  function main () {
    init()
    let entry = resolvedEntry()
    loadScript(entry)
  }

  main()

})(this)


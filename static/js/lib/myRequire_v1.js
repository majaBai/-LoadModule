
// myRequire_v1 要解决 gulp concat js文件时的无序问题，即保证依赖的顺序
(function(global){

const log = console.log.bind(console)
const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)
function isFunction(s){
  return Object.prototype.toString.call(s) === '[object Function]'
}

function current(){
  return document.currentScript.src
}

function rootPath(){
  let src = current()
  log('current src in rootPath: ' + src)
  //current src in rootPath: file:///E:/programm/FE%20advanced/LoadModule/static/js/a.js
  let lastIndex = src.lastIndexOf('/')
  let path = src.slice(0, lastIndex)
  return path
}

function resolvePath(relative){
  if(!relative.endsWith('.js')){
    relative += '.js'
  }
  let root = rootPath()
  log('root: '+ root)
  let sp = root +'/'+relative
  return sp
}

// require's tasks:
// 1, resolve path of each deps
// 2, load each deps and inject into html
function require(deps, callback){
  if(!Array.isArray(deps)){
    return
  }
  let count = 0;
  for(let i = 0; i < deps.length; i++){
    let script = document.createElement('script')
    let path = resolvePath(deps[i])
    log('path', path)
    script.src = path
    script.onload = () => {
      count++
      if(count === deps.length){
        log('all modules loaded over')
        callback()
      }
    }
    let head = document.head
    head.appendChild(script)
  }
}

function init(){
  global.require = require
}

function resolvedEntry(){
  let scripts = es('script')
  let last = scripts[scripts.length - 1]
  let main = last.dataset.main
  return main
}


function loadScript(src, callback){
  let script = document.createElement('script')
  script.src = src
  script.onload = () =>{
    if(isFunction(callback)){
      callback()
    }
  }
  script.onerror = () =>{
    log(`${src} load failed`)
  }
  let head = document.head
  head.appendChild(script)
}

  function main(){
    init()
    let entry = resolvedEntry()
    loadScript(entry)
  }

  main()

})(this)
 

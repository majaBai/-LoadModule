
define([], () => {
  const es = selector => document.querySelectorAll(selector)
  const log = console.log.bind(console)
  return {
    es: es,
    log: log
  }
})

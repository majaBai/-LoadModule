define(['b'], (b) => {
  const e = selector => document.querySelector(selector)
  return {
    e: e,
    es: b.es,
    log: b.log
  }
})

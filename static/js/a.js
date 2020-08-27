// require(['utils/b', 'utils/helper'], (b, helper) => {
require(['utils/helper'], (helper) => {
  let e = helper.e
  // let es = helper.es
  const log = console.log.bind(console)
  log('helper', helper)
  function bindLogin () {
    let btn = e('#login')
    let box = e('.box')
    btn.addEventListener('click', event => {
      box.classList.toggle('pink')
      log('color changed')
    })
  }

  function addEvent () {
    bindLogin()
  }

  function main () {
    addEvent()
  }

  main()
})


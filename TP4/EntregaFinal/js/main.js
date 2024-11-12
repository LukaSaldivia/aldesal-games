let $ = (selector) => document.querySelector(selector)
let $$ = (selector) => document.querySelectorAll(selector)

// Sección "Descubre el juego que convierte las Matemáticas en diversión"
let download_section = $('section.download')

download_section.addEventListener('mousemove', ({clientX, clientY}) => {
  let {height, width} = download_section.getBoundingClientRect()
  let x = clientX / width - .5  
  let y = clientY / height - .5
  download_section.setAttribute('style', `--_mouse-x : ${x}; --_mouse-y : ${y}`)
})



let $ = (selector) => document.querySelector(selector)
let $$ = (selector) => document.querySelectorAll(selector)

// Sección "La app más divertida y educativa y para niños de 3 años"
const columns = $$('.cols-3 > .col');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    columns.forEach(el => el.classList.toggle('visible', entry.isIntersecting))
  });
}, { threshold: 0 });

columns.forEach(el => observer.observe(el))



// Sección "Descubre el juego que convierte las Matemáticas en diversión"
const download_section = $('section.download')

download_section.addEventListener('mousemove', ({clientX, clientY}) => {
  let {height, width} = download_section.getBoundingClientRect()
  let x = clientX / width - .5  
  let y = clientY / height - .5
  download_section.setAttribute('style', `--_mouse-x : ${x}; --_mouse-y : ${y}`)
})



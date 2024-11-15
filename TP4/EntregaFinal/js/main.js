let $ = (selector) => document.querySelector(selector)
let $$ = (selector) => document.querySelectorAll(selector)
let _$ = (element, selector) => element.querySelector(selector)
let _$$ = (element, selector) => element.querySelectorAll(selector)

// Sección "La app más divertida y educativa y para niños de 3 años"
const screen = $('.intro > .screen')
setInterval(()=>{
  screen.append(_$(screen, 'img:first-child'))
}, 3000)



const columns = $$('.cols-3 > .col');

const observer_cols_3 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    columns.forEach(el => el.classList.toggle('visible', entry.isIntersecting))
  });
}, { threshold: 0 });

columns.forEach(el => observer_cols_3.observe(el))



// Sección "Descubre el juego que convierte las Matemáticas en diversión"
const download_section = $('section.download')

download_section.addEventListener('mousemove', ({clientX, clientY}) => {
  let {height, width} = download_section.getBoundingClientRect()
  let x = clientX / width - .5  
  let y = clientY / height - .5
  download_section.setAttribute('style', `--_mouse-x : ${x}; --_mouse-y : ${y}`)
})

// Sección "Más amigos, más diversión!"

const scrolling_image = $('.scroll-2-columns .cols-2 .scrolling-image')

const paragraphs = [...$$('.scroll-2-columns .cols-2 .paragraphs > *')]

const observer_cols_2 = new IntersectionObserver((entries) => {
  entries.map((entry) => {    
    
    if (entry.isIntersecting) {
      const index = paragraphs.indexOf(entry.target)
      if (index != _$(scrolling_image, 'img:first-child').getAttribute('data-index')) {
        scrolling_image.prepend(_$(scrolling_image, `img[data-index="${index}"]`))
      }
    }
  })  


}, { threshold: .8 });

paragraphs.map(paragraph => observer_cols_2.observe(paragraph))



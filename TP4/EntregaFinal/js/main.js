let $ = (selector) => document.querySelector(selector)
let $$ = (selector) => document.querySelectorAll(selector)
let _$ = (element, selector) => element.querySelector(selector)
let _$$ = (element, selector) => element.querySelectorAll(selector)

// Loader
const loader = $('.load-screen')

document.addEventListener('DOMContentLoaded', ()=> {
  setTimeout(() => {
    loader.classList.add('loaded')
  }, 5000)
})

// Menú hamburguesa
let btn_hamburger = $('.hamburger')

btn_hamburger.addEventListener('click', e => {
  btn_hamburger.classList.toggle('active')
})

$('nav').addEventListener('click' , e => {
  btn_hamburger.classList.remove('active')
})

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

// Sección "¡Experimenta Efectos 3D Asombrosos en NumberBlocks: Una Aventura Matemática Inmersiva!"
const modelViewer = $("#UNO-3D");

  document.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const xRotation = ((clientY / innerHeight) - 0.5) * 30; // 15deg por cada lado (15 * 2 = 30)
    const yRotation = ((clientX / innerWidth) - 0.5) * 30;

    // -75deg 85deg 0 <-- Estado base

    modelViewer.setAttribute("camera-orbit", `${-75-yRotation}deg ${85 - xRotation}deg 0`);
  });


// Sección "¿Quieres ser el primero en enterarse de todas las novedades?"

let newsletter_form = $('#newsletter')
newsletter_form.addEventListener('submit', e => {
  e.preventDefault();


    _$(newsletter_form, 'input').value = ''
  
    _$(newsletter_form, 'span').classList.add('appear')
    setTimeout(() => {
      _$(newsletter_form, 'span').classList.remove('appear')
    }, 3000);

})



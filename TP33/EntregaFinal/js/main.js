const c = document.querySelector('#c')
const ctx = c.getContext('2d')

let game_started = false

const btn = document.querySelector('#jugar')
const portrait = document.querySelector('#portrait')
const game_title = document.querySelector('.game-title')

btn.addEventListener('click', ()=> {
  game_started = true
  portrait.setAttribute('style','display:none')
  game_title.setAttribute('style','display:none')
})



const sizes = {
  width: 1300,
  height: 500
}

const columnas = 7;
const filas = 6;

c.width = sizes.width
c.height = sizes.height

let juego = new Juego(ctx, c)







function loop() {
  if (game_started) {
    juego.update()
  }
  requestAnimationFrame(loop)
}


loop()

c.addEventListener('mousemove', (e) => juego.mouseMove(e))
c.addEventListener('mouseup', (e) => juego.mouseUp(e))
c.addEventListener('mousedown', (e) => juego.mouseDown(e))
c.addEventListener('mouseleave', (e) => juego.mouseLeave(e))

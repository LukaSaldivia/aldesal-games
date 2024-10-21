const c = document.querySelector('#c')
const ctx = c.getContext('2d')

const sizes = {
  width: 1300,
  height: 500
}

const columnas = 7;
const filas = 6;

c.width = sizes.width
c.height = sizes.height



const imagenRebelde = new Image()

imagenRebelde.src = `./img/juego/ficha_rebelde.png`

let ficha_rebelde = new Ficha(imagenRebelde, 1, 100, sizes.height - 100, ctx)

const imagenImperial = new Image()

imagenImperial.src = `./img/juego/ficha_imperial.png`

let ficha_imperial = new Ficha(imagenImperial, 2, sizes.width - 150 , sizes.height - 100, ctx)

const imagenJedi = new Image()

imagenJedi.src = `./img/juego/ficha_jedi.png`

let ficha_jedi = new Ficha(imagenJedi, 3, 100 , sizes.height - 100, ctx)

const imagenSeparatista = new Image()

imagenSeparatista.src = `./img/juego/ficha_separatista.png`

let ficha_separatista = new Ficha(imagenSeparatista, 4, sizes.width - 150 , sizes.height - 100, ctx)


let juego = new Juego([ficha_rebelde, ficha_imperial],ctx, c)
// juego.newGame(columnas, filas, 4)







function loop() {
  // ctx.fillStyle = '#050505'
  // ctx.fillRect(0, 0, sizes.width, sizes.height)
  juego.update()
  requestAnimationFrame(loop)
}


loop()

c.addEventListener('mousemove', (e) => juego.mouseMove(e))
c.addEventListener('mouseup', (e) => juego.mouseUp(e))
c.addEventListener('mousedown', (e) => juego.mouseDown(e))
c.addEventListener('mouseleave', (e) => juego.mouseLeave(e))

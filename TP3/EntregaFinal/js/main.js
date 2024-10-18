const c = document.querySelector('#c')

const sizes = {
  width : 1300,
  height : 500
}

const columnas = 7;
const filas = 6;


c.width = sizes.width
c.height = sizes.height

const ctx = c.getContext('2d')


const imagenesCasilleros = []
for (let i = 0; i < 3; i++) {
  let img = new Image()
  img.src = `./img/juego/casillero-${i}.png`
  imagenesCasilleros.push(img)
  
}

const imagenRebelde = new Image()

imagenRebelde.src = `./img/juego/ficha_rebeldes.png`

let ficha_rebelde = new Ficha(imagenRebelde, 1, 30, 30, ctx)

const imagenImperial = new Image()

imagenImperial.src = `./img/juego/ficha_imperio.png`

let ficha_imperial = new Ficha(imagenImperial, 1, 30, 30, ctx)




let tablero = new Tablero(columnas,filas, imagenesCasilleros, undefined, undefined, ctx)

tablero.pos.x = sizes.width/2 - (tablero.columns * tablero.cellSize / 2)
tablero.pos.y = sizes.height - (tablero.rows * tablero.cellSize)
tablero.setMatrix()

let row = tablero.addFicha(0, ficha_rebelde)
row = tablero.addFicha(0, ficha_imperial)
row = tablero.addFicha(1, ficha_rebelde)
row = tablero.addFicha(0, ficha_imperial)
// console.log(row);








function loop() {
  ctx.fillStyle = '#002'
  ctx.fillRect(0,0,sizes.width, sizes.height)
  tablero.draw()
  ficha_rebelde.draw()
  // console.warn(tablero.matrix[0][row].jugador);
  // ficha.draw()
  requestAnimationFrame(loop)
}

loop()

let mouse = {
  x : 0,
  y : 0
}

c.addEventListener('mousemove', (e) => {

  let {x : canvasXOffset, y : canvasYOffset} = c.getBoundingClientRect()

  let {layerX , layerY} = e

  mouse.x = Math.floor(layerX - canvasXOffset)
  mouse.y = Math.floor(layerY - canvasYOffset)

  
  
  
})
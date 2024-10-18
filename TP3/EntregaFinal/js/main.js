const c = document.querySelector('#c')

const sizes = {
  width: 1300,
  height: 500
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




let tablero = new Tablero(columnas, filas, imagenesCasilleros, undefined, undefined, ctx)

tablero.pos.x = sizes.width / 2 - (tablero.columns * tablero.cellSize / 2)
tablero.pos.y = sizes.height - (tablero.rows * tablero.cellSize)
tablero.setMatrix()

let row = tablero.addFicha(0, ficha_rebelde)
row = tablero.addFicha(0, ficha_imperial)
row = tablero.addFicha(1, ficha_rebelde)
row = tablero.addFicha(0, ficha_imperial)
// console.log(row);








function loop() {
  ctx.fillStyle = '#002'
  ctx.fillRect(0, 0, sizes.width, sizes.height)
  tablero.draw()
  ficha_rebelde.draw()
  // console.warn(tablero.matrix[0][row].jugador);
  // ficha.draw()
  requestAnimationFrame(loop)
}


loop()

let mouse = {
  x: 0,
  y: 0,
  isClicking: false
}

let game = {
  column : undefined
}

c.addEventListener('mousemove', (e) => {

  let { x: canvasXOffset, y: canvasYOffset } = c.getBoundingClientRect()

  let { layerX, layerY } = e

  mouse.x = Math.floor(layerX - canvasXOffset)
  mouse.y = Math.floor(layerY - canvasYOffset)


  const bool = ficha_rebelde.hasMouseOver(mouse.x, mouse.y) && ficha_rebelde.isHovereable

  ficha_rebelde.isHover = bool


  c.classList.toggle('hover', bool)

  if (ficha_rebelde.isClicked) {
    ficha_rebelde.updatePos(mouse.x - ficha_rebelde.size / 2, mouse.y - ficha_rebelde.size / 2)

    let columns = tablero.fixedZones

    let column 

    if (columns.some((coord, i) => {
      game.column = i
      column = coord
      return (
        mouse.x > coord.x.start &&
        mouse.x <= coord.x.end) &&
        mouse.y <= coord.y.end &&
        mouse.y > coord.y.start
    })) {
      ficha_rebelde.updatePos((column.x.end - column.x.start) / 2 + column.x.start - ficha_rebelde.size / 2, column.y.end - ficha_rebelde.size - 10)
    }else{
      game.column = undefined
    }



  }




})

c.addEventListener('mouseup', (e) => {

  if (game.column >= 0 && game.column <= columnas) {
    tablero.addFicha(game.column, ficha_rebelde)
    game.column = undefined
  }

  ficha_rebelde.isClicked = false
  mouse.isClicking = false
  c.classList.remove('grabbing')
})


c.addEventListener('mousedown', (e) => {
  if (ficha_rebelde.isHover && ficha_rebelde.isHovereable) {
    ficha_rebelde.isClicked = true
    c.classList.add('grabbing')
  }
})

c.addEventListener('mouseleave', (e) => {
  ficha_rebelde.isClicked = false
  ficha_rebelde.isHover = false
})
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




let tablero = new Tablero(columnas,filas, imagenesCasilleros, undefined, undefined, ctx)

tablero.pos.x = sizes.width/2 - (tablero.columns * tablero.cellSize / 2)
tablero.pos.y = sizes.height - (tablero.rows * tablero.cellSize)
tablero.setMatrix()





function loop() {
  ctx.fillStyle = '#002'
  ctx.fillRect(0,0,sizes.width, sizes.height)
  tablero.draw()
  requestAnimationFrame(loop)
}

loop()
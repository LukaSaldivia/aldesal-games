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

let juego = new Juego(ctx, c)







function loop() {
  juego.update()
  requestAnimationFrame(loop)
}


loop()

c.addEventListener('mousemove', (e) => juego.mouseMove(e))
c.addEventListener('mouseup', (e) => juego.mouseUp(e))
c.addEventListener('mousedown', (e) => juego.mouseDown(e))
c.addEventListener('mouseleave', (e) => juego.mouseLeave(e))

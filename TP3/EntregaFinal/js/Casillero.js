class Casillero extends Dibujable {
  constructor(img = ResizedImage, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos)
    this.img = img
    this.jugador = null
    this.endedFall = false
    this.offset = this.offset
  }

  draw() {
    super.draw()
    if (this.endedFall) {
      this.jugador?.draw()
    }
    this.img.draw()
  }

  setJugador(jugador = Ficha) {    
  
    this.jugador = new Ficha(jugador.equipo, undefined, undefined, this.ctx)
    this.jugador.setSize(jugador.size)
    this.jugador.isHovereable = false
    this.jugador.updatePos(this.pos.x + this.offset, this.pos.y + this.offset)
  }
}
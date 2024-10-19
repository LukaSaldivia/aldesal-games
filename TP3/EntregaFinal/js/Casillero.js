class Casillero extends Dibujable{
  constructor(img = ResizedImage, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D){
    super(ctx, xPos, yPos)
    this.img = img
    this.jugador = null
  }

  draw(){
    super.draw()
    this.jugador?.draw()
    this.img.draw()
    
  }

  setJugador(jugador = Ficha){
    this.jugador = new Ficha(jugador._image, jugador.jugador, undefined, undefined, jugador.ctx)

    this.jugador.isHovereable = false

    this.jugador.updatePos(this.pos.x + 8, this.pos.y + 8)
  }
}
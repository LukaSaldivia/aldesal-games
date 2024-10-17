class Casillero extends Dibujable{
  constructor(img = ResizedImage, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D){
    super(ctx, xPos, yPos)
    this.img = img
    this.jugador = null
  }

  draw(){
    super.draw()
    this.img.draw()
  }
}
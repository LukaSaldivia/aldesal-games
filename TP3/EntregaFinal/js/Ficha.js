class Ficha extends Dibujable{
  constructor(image = new Image(), jugador = 0, xPos = 0, yPos = 0 ,ctx = new CanvasRenderingContext2D()){
    super(ctx, xPos, yPos)
    this.jugador = jugador
    this.size = 30
    this.image = new ResizedImage(image, this.size, this.size, xPos, yPos, ctx)
    this.circle = new Circulo(this.pos.x, this.pos.y, this.size / 2, ctx)

    this.isHover = false
    this.isClicked = false
    this.isHovereable = false
  }

  draw(){
    super.draw()
    this.image.draw()

    if (this.isHover) {
      this.circle.fill = '#0006'
    }else{
      this.circle.fill = '#0000'
    }
    this.circle.draw()

  }


}
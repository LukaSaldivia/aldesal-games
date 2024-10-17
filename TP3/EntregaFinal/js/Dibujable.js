class Dibujable{
  constructor(ctx = new CanvasRenderingContext2D(), xPos = 0, yPos = 0){
    this.ctx = ctx
    this.pos = {
      x : xPos,
      y : yPos
    }
  }

  draw(){}
}
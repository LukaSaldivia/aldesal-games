class ResizedImage extends Dibujable{
  constructor(img = Image, width = 0, height = 0, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos)
    this.img = img;
    this.width = width;
    this.height = height;    
  }

  draw(){
    super.draw()    
    this.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)  
  }
}
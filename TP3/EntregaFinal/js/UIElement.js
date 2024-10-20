class UIElement extends Dibujable{
  constructor(img_default = ResizedImage, img_hover = ResizedImage, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D){
    super(ctx, xPos, yPos)
    this.img_default = img_default
    this.img_hover = img_hover

    img_default.updatePos(this.pos.x, this.pos.y)
    img_hover?.updatePos(this.pos.x, this.pos.y)

    this.width = this.img_default.width
    this.height = this.img_default.height

    this.isHover = false
    this.onClick = () => {}
  }

  updatePos(x = 0, y = 0){
    super.updatePos(x,y)
    this.img_default.updatePos(x,y)
    this.img_hover.updatePos(x,y)
  }

  addPos(x = 0, y = 0){
    super.addPos(x,y)
    this.img_default.addPos(x,y)
    this.img_hover.addPos(x,y)
  }

  mouseHover(x = 0, y = 0){
    this.isHover = (      
      x > this.pos.x &&
      x < this.pos.x + this.width &&
      y > this.pos.y &&
      y < this.pos.y + this.height
    )
  }

  mouseClick(){
    if (this.isHover) {
      this.onClick()
    }
  }

  draw(){
    super.draw()
    this.img_default.draw()
    if (this.img_hover != null && this.isHover) {
      this.img_hover.draw()
    }
  }
}
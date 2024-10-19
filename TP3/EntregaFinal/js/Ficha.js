class Ficha extends Dibujable{
  constructor(image = new Image(), id = 0, xPos = 0, yPos = 0 ,ctx = CanvasRenderingContext2D){
    super(ctx, xPos, yPos)

    this._image = image

    this.id = id
    this.size = 54
    this.image = new ResizedImage(image, this.size, this.size, xPos, yPos, ctx)
    this.circle = new Circulo(this.size / 2, this.pos.x + this.size / 2, this.pos.y + this.size / 2, ctx)

    this.isHover = false
    this.isClicked = false
    this.isHovereable = true
  }

  draw(){
    super.draw()
    this.image.draw()

    if (this.isHover && this.isHovereable) {
      this.circle.fill = '#0006'
    }else{
      this.circle.fill = '#0000'
    }
    this.circle.draw()

  }

  updatePos(x = 0, y = 0){
    super.updatePos(x,y)
    this.image.updatePos(x,y)
    this.circle.updatePos(x + this.size / 2, y + this.size / 2)
  }

  hasMouseOver(x = 0, y = 0){
    
    let centerX = this.pos.x + this.size / 2;
    let centerY = this.pos.y + this.size / 2;
  
    let dx = x - centerX;
    let dy = y - centerY;
  
    let distance = Math.sqrt(dx ** 2 + dy ** 2);
  
    return distance < (this.size / 2 + 15);
  }


}
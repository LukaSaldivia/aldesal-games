class UIText extends Dibujable{
  constructor(text, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D){
    super(ctx, xPos, yPos)
    this.text = text
    this.color = "#000"
    this.fontSize = 24
    this.fontFamily = 'Times New Roman'
    
  }

  getPixelWidth() {
    this.ctx.font = this.getFont();     
    return this.ctx.measureText(this.text).width;
  }

  draw(){
    console.log(this.text, this.color, this.getFont());
    
    this.ctx.fillStyle = this.color; // Aplica el color al texto
    this.ctx.font = this.getFont();       // Aplica la fuente al contexto
    this.ctx.fillText(this.text, this.pos.x, this.pos.y); // Dibuja el texto
    
  }

  getFont(){
    return `${this.fontSize}px ${this.fontFamily}`
  }


}
class UIText extends Dibujable {
  // Constructor que inicializa el texto, posición, contexto y configuración de estilo de fuente
  constructor(text, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos) // Llama al constructor de Dibujable para establecer el contexto y posición
    this.text = text // Texto a dibujar
    this.color = "#000" // Color del texto por defecto
    this.fontSize = 24 // Tamaño de la fuente por defecto
    this.fontFamily = 'Times New Roman' // Familia de la fuente por defecto
  }

  // Método que calcula y devuelve el ancho del texto en píxeles en el contexto actual
  getPixelWidth() {
    this.ctx.font = this.getFont() // Configura la fuente en el contexto
    return this.ctx.measureText(this.text).width // Mide y retorna el ancho del texto
  }

  // Dibuja el texto en la posición actual con el color y fuente especificados
  draw() {
    this.ctx.fillStyle = this.color // Aplica el color al texto
    this.ctx.font = this.getFont() // Configura la fuente en el contexto
    this.ctx.fillText(this.text, this.pos.x, this.pos.y) // Dibuja el texto en las coordenadas especificadas
  }

  // Método auxiliar para obtener el estilo de la fuente como una cadena
  getFont() {
    return `${this.fontSize}px ${this.fontFamily}` // Formatea el tamaño y familia de la fuente
  }
}

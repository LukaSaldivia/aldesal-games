class ResizedImage extends Dibujable {
  // Constructor que inicializa la imagen, dimensiones, posición y contexto, y crea un canvas propio para redimensionar
  constructor(img = Image, width = 0, height = 0, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos) // Llama al constructor de Dibujable para establecer contexto y posición
    this.img = img // Imagen a dibujar
    this.width = width // Ancho de la imagen redimensionada
    this.height = height // Alto de la imagen redimensionada
    this.opacity = 1 // Opacidad de la imagen

    // Crear un canvas propio (offscreen) para manejar la imagen redimensionada antes de dibujarla en el canvas principal
    this.offscreenCanvas = document.createElement('canvas') // Crear canvas offscreen
    this.offscreenCanvas.width = this.width // Establecer ancho del canvas propio
    this.offscreenCanvas.height = this.height // Establecer alto del canvas propio
    this.offscreenCtx = this.offscreenCanvas.getContext('2d') // Obtener contexto 2D del canvas propio

    this.startYPos = -this.height // Posición inicial fuera de pantalla (para posibles efectos de entrada)
    this.targetYPos = yPos // Posición final de la imagen en el eje Y
  }

  // Método para dibujar la imagen en el canvas principal usando el canvas propio para aplicar redimensionado y opacidad
  draw() {
    super.draw() // Llama al método draw de Dibujable (si está implementado)
    
    if (this.img.complete) { // Verifica si la imagen ha terminado de cargarse
      // Limpiar el canvas propio antes de dibujar
      this.offscreenCtx.clearRect(0, 0, this.width, this.height) // Limpiar el contenido del canvas propio
      this.offscreenCtx.globalAlpha = this.opacity // Aplicar opacidad al contexto del canvas propio
      this.offscreenCtx.drawImage(this.img, 0, 0, this.width, this.height) // Dibujar la imagen en el canvas propio con las dimensiones especificadas

      // Dibujar el canvas propio en el canvas original en la posición especificada
      this.ctx.drawImage(this.offscreenCanvas, this.pos.x, this.pos.y, this.width, this.height)
    }
  }
}

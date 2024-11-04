class Circulo extends Dibujable {
  // Constructor que inicializa un círculo con radio, posición y contexto de dibujo
  constructor(radius = 0, xPos = 0, yPos = 0, ctx = new CanvasRenderingContext2D()) {
    super(ctx, xPos, yPos) // Llama al constructor de Dibujable para establecer el contexto y la posición

    this.radius = radius // Establece el radio del círculo
    this.fill = '#0000' // Color de relleno por defecto (transparente)
  }

  // Método para dibujar el círculo en el contexto de dibujo
  draw() {
    super.draw() // Llama al método draw de Dibujable (aunque en este caso es vacío)

    this.ctx.fillStyle = this.fill // Define el color de relleno
    this.ctx.beginPath() // Comienza un nuevo trazo
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI) // Dibuja un arco (círculo completo)
    this.ctx.closePath() // Cierra el trazo
    this.ctx.fill() // Rellena el círculo con el color establecido
  }
}

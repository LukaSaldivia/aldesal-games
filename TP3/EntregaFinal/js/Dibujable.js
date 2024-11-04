class Dibujable {

  // Constructor que inicializa el contexto de dibujo, y la posición inicial en x e y
  constructor(ctx = new CanvasRenderingContext2D(), xPos = 0, yPos = 0) {
    this.ctx = ctx // Contexto de dibujo del canvas para esta instancia
    this.pos = {
      x: xPos, // Posición en el eje x
      y: yPos  // Posición en el eje y
    }
  }

  // Método placeholder para dibujar; se espera que clases hijas lo implementen
  draw() {}

  // Actualiza la posición del objeto a las coordenadas dadas
  updatePos(x = 0, y = 0) {
    this.pos.x = x // Establece la nueva posición en x
    this.pos.y = y // Establece la nueva posición en y
  }

  // Ajusta la posición actual sumando los valores dados a las coordenadas existentes
  addPos(x = 0, y = 0) {
    this.pos.x += x // Incrementa la posición en x
    this.pos.y += y // Incrementa la posición en y
  }
}

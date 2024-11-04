class Casillero extends Dibujable {
  // Constructor para crear un casillero con una imagen, posición y contexto de dibujo
  constructor(img = ResizedImage, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos) // Llama al constructor de Dibujable para inicializar el contexto y la posición
    this.img = img // Imagen de fondo del casillero
    this.jugador = null // Jugador asignado al casillero (inicialmente ninguno)
    this.endedFall = false // Estado para verificar si el jugador ha "caído" completamente en el casillero
    this.offset = this.offset // Offset para ajustar la posición del jugador dentro del casillero
  }

  // Método para dibujar el casillero y, si corresponde, el jugador
  draw() {
    super.draw() // Llama al método draw de Dibujable (vacío en este caso)

    if (this.endedFall) { // Si el jugador ha terminado de caer
      this.jugador?.draw() // Dibuja la ficha del jugador
    }

    this.img.draw() // Dibuja la imagen de fondo del casillero
  }

  // Método para asignar una ficha al casillero, representando al jugador
  setJugador(jugador = Ficha) {
    this.jugador = new Ficha(jugador.equipo, undefined, undefined, this.ctx) // Crea una copia de la ficha del jugador
    this.jugador.setSize(jugador.size) // Ajusta el tamaño de la ficha a la del jugador original
    this.jugador.isHovereable = false // Desactiva la capacidad de hover de la ficha
    this.jugador.updatePos(this.pos.x + this.offset, this.pos.y + this.offset) // Coloca la ficha en el centro del casillero aplicando el offset
  }
}

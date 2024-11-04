class Ficha extends Dibujable {
  // Constructor para crear una ficha de un equipo específico con posición y contexto de dibujo
  constructor(equipo = "", xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos) // Llama al constructor de Dibujable para inicializar el contexto y la posición

    this.equipo = equipo // Equipo al que pertenece la ficha

    this.size = 40 // Tamaño predeterminado de la ficha
    // Imagen de la ficha, cargada y redimensionada con base en el equipo
    this.image = getResizedImage(`./img/juego/ficha_${this.equipo}.png`, this.size, this.size, this.pos.x, this.pos.y, this.ctx)
    
    // Círculo asociado a la ficha para efectos visuales
    this.circle = new Circulo(this.size / 2, this.pos.x + this.size / 2, this.pos.y + this.size / 2, ctx)

    this.isHover = false // Estado para verificar si el mouse está sobre la ficha
    this.isClicked = false // Estado para verificar si la ficha ha sido clickeada
    this.isHovereable = true // Permitir hover sobre la ficha

    // Posición original de la ficha para poder resetearla si es necesario
    this.originalPosition = {
      x: xPos,
      y: yPos
    }
  }

  // Método para dibujar la ficha, incluyendo su imagen y círculo
  draw() {
    super.draw()
    this.image.draw() // Dibuja la imagen de la ficha
    this.circle.draw() // Dibuja el círculo asociado
  }

  // Actualiza la posición de la ficha y sus elementos internos
  updatePos(x = 0, y = 0) {
    super.updatePos(x, y) // Actualiza posición en Dibujable
    this.image.updatePos(x, y) // Actualiza posición de la imagen
    this.circle.updatePos(x + this.size / 2, y + this.size / 2) // Actualiza posición del círculo al centro de la ficha
  }
  
  // Incrementa la posición actual de la ficha y sus elementos
  addPos(x = 0, y = 0) {
    super.addPos(x, y) // Incrementa posición en Dibujable
    this.image.addPos(x, y) // Incrementa posición de la imagen
    this.circle.addPos(x + this.size / 2, y + this.size / 2) // Incrementa posición del círculo al centro de la ficha
  }

  // Verifica si el mouse está sobre la ficha con un margen de 3 píxeles
  hasMouseOver(x = 0, y = 0) {
    let centerX = this.pos.x + this.size / 2 // Centro en X
    let centerY = this.pos.y + this.size / 2 // Centro en Y
  
    let dx = x - centerX // Distancia en X entre mouse y centro de la ficha
    let dy = y - centerY // Distancia en Y entre mouse y centro de la ficha
  
    let distance = Math.sqrt(dx ** 2 + dy ** 2) // Distancia euclidiana
    
    return distance < (this.size / 2 + 3) // Retorna true si la distancia es menor al radio + margen
  }

  // Establece el color de relleno del círculo cuando el mouse está sobre la ficha
  setOverFill(fill = "#0000") {
    this.circle.fill = fill
  }

  // Actualiza la posición original de la ficha
  updateOriginalPosition() {
    this.originalPosition = {
      x: this.pos.x,
      y: this.pos.y
    }
  }

  // Cambia el tamaño de la ficha, actualizando su imagen y círculo
  setSize(n = 0) {
    this.size = n // Actualiza el tamaño
    // Recalcula la imagen de la ficha con el nuevo tamaño
    this.image = getResizedImage(`./img/juego/ficha_${this.equipo}.png`, this.size, this.size, this.pos.x, this.pos.y, this.ctx)
    // Recalcula el círculo de la ficha con el nuevo tamaño
    this.circle = new Circulo(this.size / 2, this.pos.x + this.size / 2, this.pos.y + this.size / 2, ctx)
  }
}

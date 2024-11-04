class UIElement extends Dibujable {
  // Constructor que inicializa el elemento UI con imágenes para el estado por defecto y el estado hover
  constructor(img_default = ResizedImage, img_hover = ResizedImage, xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos) // Llama al constructor de Dibujable para establecer contexto y posición
    this.img_default = img_default // Imagen por defecto
    this.img_hover = img_hover // Imagen al hacer hover

    // Actualiza la posición inicial de ambas imágenes
    img_default.updatePos(this.pos.x, this.pos.y)
    img_hover?.updatePos(this.pos.x, this.pos.y)

    // Define el ancho y alto del elemento basándose en la imagen por defecto
    this.width = this.img_default.width
    this.height = this.img_default.height

    // Define el área clickeable basándose en la posición y dimensiones actuales
    this.clickableArea = {
      x: {
        start: this.pos.x,
        end: this.pos.x + this.width
      },
      y: {
        start: this.pos.y,
        end: this.pos.y + this.height
      }
    }

    this.isHover = false // Estado de hover del elemento
    this.isHovereable = true // Define si el elemento puede tener estado hover
    this.onClick = () => {} // Función por defecto para el evento de clic
    this.onHover = () => {} // Función por defecto para el evento hover
    this.onHoverLeave = () => {} // Función por defecto para cuando se deja de hacer hover
  }

  // Actualiza la posición del elemento y de las imágenes asociadas
  updatePos(x = 0, y = 0) {
    super.updatePos(x, y) // Actualiza posición base
    this.img_default.updatePos(x, y) // Actualiza posición de la imagen por defecto
    this.img_hover?.updatePos(x, y) // Actualiza posición de la imagen hover si existe
  }

  // Ajusta la posición del elemento sumando valores a las coordenadas actuales
  addPos(x = 0, y = 0) {
    super.addPos(x, y) // Ajusta posición base
    this.img_default.addPos(x, y) // Ajusta posición de la imagen por defecto
    this.img_hover?.addPos(x, y) // Ajusta posición de la imagen hover si existe
  }

  // Detecta si el mouse está dentro del área clickeable y cambia el estado de hover
  mouseHover(x = 0, y = 0) {
    this.isHover = (
      x > this.clickableArea.x.start &&
      x < this.clickableArea.x.end &&
      y > this.clickableArea.y.start &&
      y < this.clickableArea.y.end
    )

    if (this.isHover && this.isHovereable) {
      this.onHover() // Ejecuta la función onHover si el estado de hover es verdadero
    } else {
      this.onHoverLeave() // Ejecuta la función onHoverLeave si el estado de hover es falso
    }
  }

  // Llama al evento onClick si el elemento está en estado hover y es clickeable
  mouseClick() {
    if (this.isHover && this.isHovereable) {
      this.onClick() // Ejecuta la función onClick
    }
  }

  // Ajusta la opacidad de las imágenes; si hoverImgToo es true, aplica también a la imagen hover
  setOpacity(amount = 1, hoverImgToo = false) {
    this.img_default.opacity = amount
    if (this.img_hover && hoverImgToo) {
      this.img_hover.opacity = amount
    }
  }

  // Dibuja la imagen correspondiente al estado (hover o por defecto) en el contexto
  draw() {
    super.draw()
    this.img_default.draw()
    if (this.img_hover != null && this.isHover && this.isHovereable) {
      this.img_hover.draw() // Dibuja la imagen hover si está en estado hover y es hovereable
    }
  }

  // Restaura el área clickeable con las coordenadas actuales del elemento
  resetClickableArea() {
    this.clickableArea = {
      x: {
        start: this.pos.x,
        end: this.pos.x + this.width
      },
      y: {
        start: this.pos.y,
        end: this.pos.y + this.height
      }
    }
  }
}

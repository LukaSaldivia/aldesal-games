class Escena {
  // Constructor que inicializa la escena con un contexto de canvas, un callback de animación y una función de finalización
  constructor(ctx = CanvasRenderingContext2D, callback = (t) => {}, end = () => {}) {
    this.ctx = ctx
    this.callback = callback // Callback que se ejecutará en cada frame de la animación
    this.startTime = -1 // Tiempo de inicio de la animación, se inicializa en -1
    this.end = end // Función que se ejecutará cuando la animación termine
  }

  // Método para iniciar y gestionar la animación durante una duración específica
  animate(duration = 0) {
    // Si es la primera vez que se llama al método, se establece el tiempo de inicio
    if (this.startTime < 0) {
      this.startTime = Date.now() / 1000 // Guarda el tiempo actual en segundos
    }

    // Verifica si la duración de la animación aún no se ha completado
    if (Date.now() / 1000 - this.startTime < duration) {
      // Calcula el tiempo normalizado entre 0 y 1 según la duración total
      let normalized = (Date.now() / 1000 - this.startTime) / duration
      // Llama al callback pasando el tiempo normalizado y el tiempo transcurrido en segundos redondeado
      this.callback(normalized, Math.ceil(Date.now() / 1000 - this.startTime))
    } else {
      // Si la duración se completó, llama a la función de finalización
      this.end()
      // Resetea el tiempo de inicio para permitir nuevas animaciones
      this.startTime = -1
    }
  }
}

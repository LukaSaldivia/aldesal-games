class Tablero extends Dibujable {

  static cellSize = 65

  // Constructor de la clase Tablero, que inicializa columnas, filas, imágenes, posiciones y contexto
  constructor(columns = 7, rows = 6, imgs = [Image], xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos) // Llama al constructor de la clase padre Dibujable

    this.rows = rows; // Número de filas del tablero
    this.columns = columns; // Número de columnas del tablero
    this.cellSize = Tablero.cellSize; // Tamaño de cada celda, utilizando la constante estática
    this.imgs = imgs; // Array de imágenes para las celdas

    // Inicializa la matriz del tablero con celdas vacías
    this.matrix = new Array(this.columns).fill().map(() => new Array(this.rows).fill());

    this.fixedZones = []; // Almacena las zonas fijas del tablero
    this.hints = []; // Almacena pistas para la colocación de fichas
    this.hintSize = 0; // Tamaño de las pistas

    this.setMatrix(); // Llama a la función para establecer la matriz del tablero
  }

  // Establece la matriz de celdas y las zonas fijas
  setMatrix() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        // Selecciona una imagen aleatoria del array imgs
        let img = this.imgs[Math.floor(Math.random() * this.imgs.length)]
        // Crea una imagen redimensionada y la asigna a la matriz
        let resized = new ResizedImage(img, this.cellSize, this.cellSize, this.pos.x + this.cellSize * i, this.pos.y + this.cellSize * j, this.ctx)
        this.matrix[i][j] = new Casillero(resized, this.pos.x + this.cellSize * i, this.pos.y + this.cellSize * j, this.ctx)
      }
    }

    this.fixedZones = []; // Reinicia las zonas fijas
    this.hints = []; // Reinicia las pistas

    for (let i = 0; i < this.columns; i++) {
      // Agrega las zonas fijas para cada columna
      this.fixedZones.push(
        {
          x: {
            start: this.pos.x + i * this.cellSize, // Inicio de la zona en X
            end: this.pos.x + (i + 1) * this.cellSize // Fin de la zona en X
          },

          y: {
            start: 0, // Inicio de la zona en Y
            end: this.pos.y // Fin de la zona en Y
          }
        }
      );

      
      // Crea un círculo para las pistas del tamaño de hintSize (que suele ser el tamaño de la ficha)
      this.hints.push(new Circulo(this.hintSize / 2, this.fixedZones[i].x.start + (this.fixedZones[i].x.end - this.fixedZones[i].x.start) / 2, this.fixedZones[i].y.end - this.hintSize / 2 - 10, this.ctx));
      this.hints[i].fill = "#0000"; // Establece el color de la pista


    }
  }

  draw() {

    // Dibuja el tablero y sus celdas
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.matrix[i][j].draw()
      }
    }

    // Dibuja las pistas
    this.hints.forEach(hint => {      
      hint.draw()
    })

  }

  centerOnScreen(width = 0, height = 0) {
    // Centra el tablero en la pantalla
    super.updatePos(width / 2 - (this.columns * this.cellSize / 2), height - (this.rows * this.cellSize))
  }

  // Verifica si las coordenadas están dentro de una columna
  isInsideColumn(x = 0, y = 0) {
    let zone, column;

    // Comprueba si las coordenadas están dentro de alguna zona fija
    if (this.fixedZones.some((coord, i) => {
      column = i;
      zone = coord;
      return (
        x > coord.x.start &&
        x <= coord.x.end &&
        y <= coord.y.end &&
        y > coord.y.start
      );
    })) {
      return [column, zone] // Devuelve la columna y la zona si está dentro
    } else {
      return [-1, null]// Devuelve -1 si no está dentro
    }

  }

  // Devuelve el casillero en una posición dada
  getCasillero(column = 0, row = 0) {
    return this.matrix[column][row]
  }

  // Devuelve la posición final del tablero
  getEndPos(){
    return {
      x : this.pos.x + this.columns * this.cellSize,
      y : this.pos.y + this.rows * this.cellSize
    }
  }

  // Agrega una ficha a la columna indicada
  addFicha(column = 0, jugador = Ficha) {
    let i = this.rows - 1;

    // Busca la primera fila vacía en la columna
    while (i >= 0 && this.matrix[column][i].jugador) {
      i--
    }

    // Si hay espacio, coloca la ficha
    if (i >= 0) {
      this.matrix[column][i].setJugador(jugador) // Establece el jugador en el casillero
      return i // Devuelve la fila donde se colocó la ficha
    }

    return -1 // Devuelve -1 si no se pudo colocar la ficha
  }

  // Verifica si hay un ganador
  hasWinner(equipo = "", column = 0, row = 0, fichasToWin = 4){    

    // Verifica verticalmente
    let vertical = this.countConsecutives(column, 0, equipo, 0, 1, fichasToWin);
    if (vertical.length == fichasToWin) {
      return vertical
    }

    // Verifica horizontalmente
    let horizontal = this.countConsecutives(0, row, equipo, 1, 0, fichasToWin); 
    if (horizontal.length == fichasToWin) {      
      return horizontal
    }

    // Verifica las diagonales


    // Buscala punta izquierda para empezar la búsqueda
    let punta_izquierda = { column, row }
    while (punta_izquierda.column != 0 && punta_izquierda.row != 0) {
      punta_izquierda.column--
      punta_izquierda.row--
    }

    // Verfica la diagonal derecha (\)

    let diagonal_derecha = this.countConsecutives(punta_izquierda.column, punta_izquierda.row, equipo, 1, 1, fichasToWin)
    if (diagonal_derecha.length == fichasToWin) {
      return diagonal_derecha
    }

    // Buscala punta derecha para empezar la búsqueda
    let punta_derecha = { column, row }    
    while (punta_derecha.column != this.columns - 1 && punta_derecha.row != 0) {
      punta_derecha.column++
      punta_derecha.row--
    }
  
        // Verfica la diagonal derecha (/)
    let diagonal_izquierda = this.countConsecutives(punta_derecha.column, punta_derecha.row, equipo, -1, 1, fichasToWin)
    if (diagonal_izquierda.length == fichasToWin) {
      return diagonal_izquierda
    }

    return [] // Si no se encontraron consecutivas iguales a fichasToWin, se devuelve un array vacío
    
  }

  // Cuenta las fichas consecutivas de un equipo en una dirección dada
  countConsecutives(initialCol = 0, initialRow = 0, equipo = "", dx = 0, dy = 0, goal = 0){

    let counter = 0 // Contador de fichas consecutivas
    let fichas = [] // Array para almacenar las fichas encontradas

    let casillero = this.matrix[initialCol][initialRow] // Casillero inicial

    // Verifica si la ficha en el casillero pertenece al equipo
    if (casillero.jugador?.equipo == equipo) {
      counter++
      fichas.push(casillero.jugador)
    }

    // Verifica las posiciones en la dirección indicada
    while (initialCol < this.columns && initialCol >= 0 && initialRow < this.rows && initialRow >= 0) {
      initialCol += 1*dx // Mueve a la siguiente posición en la dirección X
      initialRow += 1*dy // Mueve a la siguiente posición en la dirección Y

      if (initialCol < this.columns && initialCol >= 0 && initialRow < this.rows && initialRow >= 0) {

        let casillero = this.matrix[initialCol][initialRow] // Obtiene el casillero correspondiente

        // Verifica si el casillero tiene un jugador, y si lo tiene, si es del mismo equipo 
        if (casillero.jugador?.equipo == equipo) {
          counter++ // Incrementa el contador
          fichas.push(casillero.jugador) // Agrega la ficha al array
        }else{
          counter=0
          fichas = []
        }
        if (counter == goal) break; // Si se alcanza la meta, se corta el while
        
      }

    }
    return fichas
  }

  setHintColor(color = "#fff8"){
    this.hints.map(circle => {
      circle.fill = color
    })
  }

  setOpacity(opacity = 1){
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {        
        this.matrix[i][j].img.opacity = opacity
      }
      
    }
  }

  setOffset(n = 0){
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.matrix[i][j].offset = n
      }
      
    }
  }


}





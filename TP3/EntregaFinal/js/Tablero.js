class Tablero extends Dibujable {
  constructor(columns = 7, rows = 6, imgs = [Image], xPos = 0, yPos = 0, ctx = CanvasRenderingContext2D) {
    super(ctx, xPos, yPos)

    this.rows = rows
    this.columns = columns

    this.cellSize = 65

    this.imgs = imgs


    this.matrix = new Array(this.columns).fill().map(() => new Array(this.rows).fill())

    this.fixedZones = []

    this.hints = []



    this.setMatrix()
  }

  setMatrix() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        let img = this.imgs[Math.floor(Math.random() * this.imgs.length)]
        let resized = new ResizedImage(img, this.cellSize, this.cellSize, this.pos.x + this.cellSize * i, this.pos.y + this.cellSize * j, this.ctx)
        this.matrix[i][j] = new Casillero(resized, this.pos.x + this.cellSize * i, this.pos.y + this.cellSize * j, this.ctx)
      }
    }

    this.fixedZones = []
    this.hints = []

    for (let i = 0; i < this.columns; i++) {

      this.fixedZones.push(
        {
          x: {
            start: this.pos.x + i * this.cellSize,
            end: this.pos.x + (i + 1) * this.cellSize
          },

          y: {
            start: 0,
            end: this.pos.y
          }
        }
      )

      this.hints.push(new Circulo(20,this.fixedZones[i].x.start + (this.fixedZones[i].x.end - this.fixedZones[i].x.start )/2,this.fixedZones[i].y.end - 30, this.ctx))
      this.hints[i].fill = "#0000"


    }
  }

  draw() {

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.matrix[i][j].draw()
      }
    }

    this.hints.forEach(hint => {      
      hint.draw()
    })

  }

  centerOnScreen(width = 0, height = 0) {
    super.updatePos(width / 2 - (this.columns * this.cellSize / 2), height - (this.rows * this.cellSize))
  }

  isInsideColumn(x = 0, y = 0) {
    let zone, column;

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
      return [column, zone]
    } else {
      return [-1, null]
    }

  }

  //   console() {

  //     let res = ''
  //     for (let i = 0; i < this.columnas; i++) {
  //       for (let j = 0; j < this.filas; j++) {
  //         res += (this.matriz[i][j] == 0 ? '-' : this.matriz[i][j]) + " "
  //       }
  //       console.log(res)
  //       res = ""
  //     }

  //     console.log();

  //   }

  getCasillero(column = 0, row = 0) {
    return this.matrix[column][row]
  }

  getEndPos(){
    return {
      x : this.pos.x + this.columns * this.cellSize,
      y : this.pos.y + this.rows * this.cellSize
    }
  }

  addFicha(column = 0, jugador = Ficha) {
    let i = this.rows - 1;
    while (i >= 0 && this.matrix[column][i].jugador) {
      i--
    }

    if (i >= 0) {
      this.matrix[column][i].setJugador(jugador)
      return i
    }

    return -1


  }

  hasWinner(equipo = "", column = 0, row = 0, fichasToWin = 4){    

    let verticales = this.countConsecutives(column, -1, equipo, 0, 1, fichasToWin);
    if (verticales.length == fichasToWin) {
      return verticales
    }
    
    let horizontales = this.countConsecutives(-1, row, equipo, 1, 0, fichasToWin); 
    if (horizontales.length == fichasToWin) {
      return horizontales
    }
    // diagonales

    return []
    
  }

  countConsecutives(initialCol = 0, initialRow = 0, equipo = "", dx = 0, dy = 0, goal = 0){

    let counter = 0
    let casilleros = []
    while (initialCol < this.columns && initialRow < this.rows) {
      initialCol += 1*dx
      initialRow += 1*dy                  

      if (initialCol < this.columns && initialRow < this.rows) {
        let casillero = this.matrix[initialCol][initialRow]          
        if (casillero.jugador?.equipo == equipo) {
          counter++
          casilleros.push(casillero)
        }else{
          counter=0
          casilleros = []
        }
        if (counter == goal) break;
        
      }

    }

    // return [counter, casilleros]
    return casilleros
  }

  setHintColor(color = "#fff8"){
    this.hints.map(circle => {
      circle.fill = color
    })
  }


}




class Juego {
  constructor(fichas = [Ficha], ctx = CanvasRenderingContext2D, canvas = HTMLCanvasElement) {
    this.currentTurn = 0
    this.counter = 1
    this.currentColumn = undefined
    this.fichas = fichas
    this.currentFicha = this.fichas[this.currentTurn]
    this.originalPositions = []

    fichas.forEach(ficha => {
      this.originalPositions.push([ficha.pos.x, ficha.pos.y])
    })

    this.ctx = ctx;
    this.canvas = canvas;


    this.tablero

    this.mouse = {
      x: 0,
      y: 0,
      isClicking: false
    }


  }

  switchTurn() {
    this.currentTurn = this.counter % this.fichas.length
    this.currentFicha = this.fichas[this.currentTurn]
    this.counter++
  }

  newGame(columns = 7, rows = 6, fichasToWin = 4) {
    const imagenesCasilleros = []
    for (let i = 0; i < 3; i++) {
      let img = new Image()
      img.src = `./img/juego/casillero-${i}.png`
      imagenesCasilleros.push(img)

    }
    this.tablero = new Tablero(columns, rows, imagenesCasilleros, undefined, undefined, this.ctx)


    this.tablero.pos.x = sizes.width / 2 - (this.tablero.columns * this.tablero.cellSize / 2)
    this.tablero.pos.y = sizes.height - (this.tablero.rows * this.tablero.cellSize)
    this.tablero.setMatrix()



  }

  update() {
    if (this.tablero) this.tablero.draw()
    if (this.currentFicha) this.currentFicha.draw()
  }

  mouseMove({ layerX = 0, layerY = 0 }) {
    let { x: canvasXOffset, y: canvasYOffset } = this.canvas.getBoundingClientRect();

    this.mouse.x = Math.floor(layerX - canvasXOffset);
    this.mouse.y = Math.floor(layerY - canvasYOffset);

    const isMouseOver = this.currentFicha.hasMouseOver(this.mouse.x, this.mouse.y) && this.currentFicha.isHovereable;
    this.currentFicha.isHover = isMouseOver;
    this.canvas.classList.toggle('hover', isMouseOver);

    if (this.currentFicha.isClicked) {
      this.currentFicha.updatePos(this.mouse.x - this.currentFicha.size / 2, this.mouse.y - this.currentFicha.size / 2);


      this.canvas.classList.toggle('illegal', (
        this.mouse.x >= this.tablero.pos.x &&
        this.mouse.x <= this.tablero.pos.x + this.tablero.columns * this.tablero.cellSize &&
        this.mouse.y > this.tablero.pos.y

      ))


      let columns = this.tablero.fixedZones;
      let column;

      let isInsideColumn = columns.some((coord, i) => {
        this.currentColumn = i;
        column = coord;
        return (
          this.mouse.x > coord.x.start &&
          this.mouse.x <= coord.x.end &&
          this.mouse.y <= coord.y.end &&
          this.mouse.y > coord.y.start
        );
      });

      if (isInsideColumn) {
        this.currentFicha.updatePos(
          (column.x.start + column.x.end) / 2 - this.currentFicha.size / 2,
          column.y.end - this.currentFicha.size - 10
        );
      } else {
        this.currentColumn = undefined;
      }
    }
  }

  mouseUp(e) {
    if (this.currentColumn >= 0 && this.currentColumn <= columnas) {
      let row = this.tablero.addFicha(this.currentColumn, this.currentFicha)
      if (row >= 0) {
        this.currentFicha.updatePos(...this.originalPositions[this.currentTurn])
        this.switchTurn()
      }
      this.currentColumn = undefined
    }

    if (this.canvas.classList.contains('illegal')) {
      this.currentFicha.updatePos(...this.originalPositions[this.currentTurn])
      this.canvas.classList.remove('illegal')
    }

    this.currentFicha.isClicked = false
    this.mouse.isClicking = false
    this.canvas.classList.remove('grabbing')
  }

  mouseDown(e) {
    if (this.currentFicha.isHover && this.currentFicha.isHovereable) {
      this.currentFicha.isClicked = true
      this.canvas.classList.add('grabbing')
    }

  }

  mouseLeave(e) {
    this.currentFicha.isClicked = false
    this.currentFicha.isHover = false
  }


}
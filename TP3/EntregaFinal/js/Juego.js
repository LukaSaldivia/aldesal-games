class Juego {
  constructor(fichas = [Ficha], ctx = CanvasRenderingContext2D, canvas = HTMLCanvasElement) {
    this.currentTurn = 0
    this.counter = 1
    this.currentColumn = undefined
    this.fichas = fichas
    this.currentFicha = this.fichas[this.currentTurn]
    this.originalPositions = []
    this.fichasToWin = 4

    fichas.forEach(ficha => {
      this.originalPositions.push([ficha.pos.x, ficha.pos.y])
    })

    this.ctx = ctx;
    this.canvas = canvas;

    this.STATES = {
      MENU: 'menu',
      GAME: 'game',
      STARTING: 'starting',
      WINNER: 'winner',
      TIE: 'tie'
    }
    this.state = this.STATES.MENU

    this._startTime = 0


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

    this.state = this.STATES.STARTING

    this.fichasToWin = fichasToWin
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

    if (this.state == this.STATES.STARTING) {
      if (this._startTime == 0) {
        this._startTime = Date.now() / 1000
      }


      let time = 4
      if (Date.now() / 1000 - this._startTime < time) {
        let t = (Date.now() / 1000 - this._startTime) / time

        this.ctx.globalAlpha = t

        let scaleFactor = 2 - t
        let translateY = 50 * (1 - t)

        let centerX = this.canvas.width / 2
        let centerY = this.canvas.height / 2

        // Aplica la transformación centrada y escalada
        this.ctx.translate(centerX, centerY);   // Mueve el origen al centro del canvas
        this.ctx.setTransform(scaleFactor,0,0,scaleFactor,-centerX * (1-t),(translateY + centerY) * (1-t))



      } else {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.globalAlpha = 1
      }



    }

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


      let isOutOfBounds = (
        this.mouse.x >= this.tablero.pos.x &&
        this.mouse.x <= this.tablero.pos.x + this.tablero.columns * this.tablero.cellSize &&
        this.mouse.y > this.tablero.pos.y
      )

      this.canvas.classList.toggle('illegal', isOutOfBounds)


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
    if (this.currentColumn >= 0 && this.currentColumn <= this.tablero.columns) {
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
    if (this.currentFicha.isClicked) {
      this.currentFicha.updatePos(...this.originalPositions[this.currentTurn])
    }
    this.currentFicha.isClicked = false
    this.currentFicha.isHover = false
  }


}
class Juego {
  constructor(fichas = [Ficha], ctx = CanvasRenderingContext2D, canvas = HTMLCanvasElement) {

    this.ctx = ctx;
    this.canvas = canvas;


    this.currentTurn = 0
    this.counter = 1
    this.currentColumn = undefined
    this.currentCasillero = undefined
    this.fichas = fichas
    this.currentFicha = null
    this.targetY = 0
    this.originalPositions = []
    this.fichasToWin = 4

    this.IMGS = {
      MENU : getImage('./img/juego/menu.jpg'),
      CLICPARAEMPEZAR : {
        default : getImage('./img/juego/clic_para_empezar.png'),
        hover : getImage('./img/juego/clic_para_empezar_hover.png')
      },
      SELECTMODE : {
        4 : {
          empty : getImage('./img/juego/select-4-empty.png'),
          filled : getImage('./img/juego/select-4-filled.png')
        },
        5 : {
          empty : getImage('./img/juego/select-5-empty.png'),
          filled : getImage('./img/juego/select-5-filled.png')
        },
        6 : {
          empty : getImage('./img/juego/select-6-empty.png'),
          filled : getImage('./img/juego/select-6-filled.png')
        },
        7 : {
          empty : getImage('./img/juego/select-7-empty.png'),
          filled : getImage('./img/juego/select-7-filled.png')
        }
      }
    }


    this.UI = {}

    this.UI.MENU = new UIElement(new ResizedImage(this.IMGS.MENU, 1300, 500, 0, 0, ctx), null, 0, 0, ctx)

    fichas.forEach(ficha => {
      this.originalPositions.push([ficha.pos.x, ficha.pos.y])
    })



    this.STATES = {
      MENU: 'menu',
      SELECT_MODE : 'select mode',
      SELECT_FICHA : 'select ficha',
      TRANSITION_SELECT_FICHA_STARTING : 'transition select ficha to starting',
      GAME: 'game',
      STARTING: 'starting',
      WINNER: 'winner',
      TIE: 'tie',
      FICHA_DROP: 'ficha drop',
    }

    this.state = this.STATES.MENU

    this.UI.CLICPARAEMPEZAR = new UIElement(
      new ResizedImage(this.IMGS.CLICPARAEMPEZAR.default, 350, 54, undefined, undefined, ctx),
      new ResizedImage(this.IMGS.CLICPARAEMPEZAR.hover, 350, 54, undefined, undefined, ctx),
      canvas.width / 2 - 175, canvas.height - 120, ctx
    )

    this.UI.CLICPARAEMPEZAR.onClick = () => {
      this.state = this.STATES.SELECT_MODE
      this.canvas.classList.remove('pointer')
    }

    this.UI.CLICPARAEMPEZAR.onHover = () => {
      this.canvas.classList.add('pointer')
    }
    this.UI.CLICPARAEMPEZAR.onHoverLeave = () => {
      this.canvas.classList.remove('pointer')
    }

    this.UI.SELECTMODE = {
      4 : new UIElement(new ResizedImage(this.IMGS.SELECTMODE[4].empty, 395, 100, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[4].filled, 395, 100, undefined, undefined, this.ctx), canvas.width / 2 - 686/2, canvas.height / 2 - 100/2, this.ctx),
      5 : new UIElement(new ResizedImage(this.IMGS.SELECTMODE[5].empty, 486, 100, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[5].filled, 486, 100, undefined, undefined, this.ctx), canvas.width / 2 - 686/2, canvas.height / 2 - 100/2, this.ctx),
      6 : new UIElement(new ResizedImage(this.IMGS.SELECTMODE[6].empty, 575, 100, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[6].filled, 575, 100, undefined, undefined, this.ctx), canvas.width / 2 - 686/2, canvas.height / 2 - 100/2, this.ctx),
      7 : new UIElement(new ResizedImage(this.IMGS.SELECTMODE[7].empty, 686, 100, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[7].filled, 686, 100, undefined, undefined, this.ctx), canvas.width / 2 - 686/2, canvas.height / 2 - 100/2, this.ctx),
    }

    this.UI.SELECTMODE[5].clickableArea = {
      x : {
        start : this.UI.SELECTMODE[4].pos.x + this.UI.SELECTMODE[4].width,
        end : this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width
      },
      y : {
        start : this.UI.SELECTMODE[5].pos.y,
        end : this.UI.SELECTMODE[5].pos.y + this.UI.SELECTMODE[5].height
      }
    }
    this.UI.SELECTMODE[6].clickableArea = {
      x : {
        start : this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width,
        end : this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width
      },
      y : {
        start : this.UI.SELECTMODE[6].pos.y,
        end : this.UI.SELECTMODE[6].pos.y + this.UI.SELECTMODE[6].height
      }
    }
    this.UI.SELECTMODE[7].clickableArea = {
      x : {
        start : this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width,
        end : this.UI.SELECTMODE[7].pos.x + this.UI.SELECTMODE[7].width
      },
      y : {
        start : this.UI.SELECTMODE[7].pos.y,
        end : this.UI.SELECTMODE[7].pos.y + this.UI.SELECTMODE[7].height
      }
    }

    this.UI.SELECTMODE[4].onHover = () => {
      this.UI.SELECTMODE[5].isHovereable = false
      this.UI.SELECTMODE[6].isHovereable = false
      this.UI.SELECTMODE[7].isHovereable = false
    }
    this.UI.SELECTMODE[5].onHover = () => {
      this.UI.SELECTMODE[4].isHovereable = false
      this.UI.SELECTMODE[6].isHovereable = false
      this.UI.SELECTMODE[7].isHovereable = false
    }
    this.UI.SELECTMODE[6].onHover = () => {
      this.UI.SELECTMODE[4].isHovereable = false
      this.UI.SELECTMODE[5].isHovereable = false
      this.UI.SELECTMODE[7].isHovereable = false
    }
    this.UI.SELECTMODE[7].onHover = () => {
      this.UI.SELECTMODE[4].isHovereable = false
      this.UI.SELECTMODE[6].isHovereable = false
      this.UI.SELECTMODE[5].isHovereable = false
    }
    this.UI.SELECTMODE[4].onHoverLeave = () => {
      this.UI.SELECTMODE[5].isHovereable = true
      this.UI.SELECTMODE[6].isHovereable = true
      this.UI.SELECTMODE[7].isHovereable = true
    }
    this.UI.SELECTMODE[5].onHoverLeave = () => {
      this.UI.SELECTMODE[4].isHovereable = true
      this.UI.SELECTMODE[6].isHovereable = true
      this.UI.SELECTMODE[7].isHovereable = true
    }
    this.UI.SELECTMODE[6].onHoverLeave = () => {
      this.UI.SELECTMODE[4].isHovereable = true
      this.UI.SELECTMODE[5].isHovereable = true
      this.UI.SELECTMODE[7].isHovereable = true
    }
    this.UI.SELECTMODE[7].onHoverLeave = () => {
      this.UI.SELECTMODE[4].isHovereable = true
      this.UI.SELECTMODE[5].isHovereable = true
      this.UI.SELECTMODE[6].isHovereable = true
    }    
    this.UI.SELECTMODE[4].onClick = () => {
      console.log('4');
      
    }
    this.UI.SELECTMODE[5].onClick = () => {
      console.log('5');
    }
    this.UI.SELECTMODE[6].onClick = () => {
      console.log('6');
    }
    this.UI.SELECTMODE[7].onClick = () => {
      console.log('7');
    }    



    this.tablero

    this.mouse = {
      x: 0,
      y: 0,
      isClicking: false
    }


    this.ESCENAS = {}

    this.ESCENAS.INICIA_TABLERO = new Escena(this.ctx, (t) => {
      this.ctx.globalAlpha = t
      let scaleFactor = 2 - t
      let translateY = 50 * (1 - t)
      let centerX = this.canvas.width / 2
      let centerY = this.canvas.height / 2

      // Aplica la transformación centrada y escalada
      this.ctx.translate(centerX, centerY);   // Mueve el origen al centro del canvas
      this.ctx.setTransform(scaleFactor, 0, 0, scaleFactor, -centerX * (1 - t) + (Math.cos(Math.PI * 1 / t * 50) * 20) * (1 - t), (translateY + centerY) * (1 - t))

    }, () => {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.globalAlpha = 1
      this.state = this.STATES.GAME
    })

    this.ESCENAS.FICHA_DROP = new Escena(this.ctx, (t) => {
      this.canvas.classList.remove('hover')
      this.currentFicha.isHovereable = false
      let targetY = this.currentCasillero.pos.y + this.tablero.cellSize - this.currentFicha.size
      if (this.currentFicha.pos.y + this.currentFicha.size / 2 < targetY) {
        this.currentFicha.addPos(0, 10)
      } else {
        this.currentFicha.updatePos(this.currentCasillero.pos.x + this.currentCasillero.offset, this.currentCasillero.pos.y + this.currentCasillero.offset)
      }


    }, () => {
      this.currentCasillero.endedFall = true
      this.state = this.STATES.GAME
      this.currentFicha.updatePos(...this.originalPositions[this.currentTurn])
      this.switchTurn()

    })

    this.ESCENAS.ANIMATE_CLICPARAEMPEZAR = new Escena(this.ctx, (t) => {
      this.UI.CLICPARAEMPEZAR.setOpacity(1 - t)
    })

    this.ESCENAS.TRANSITION_MENU = new Escena(this.ctx, (t) => {
      this.UI.MENU.setOpacity(1 - t)
    }, () => {
      this.newGame(7, 6, 4)
      this.currentFicha = this.fichas[this.currentTurn]
      this.state = this.STATES.STARTING
    })




  }

  update() {


    console.log(this.state);
    

    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)



    if (this.state == this.STATES.MENU) {
      this.UI.MENU.draw()
      this.UI.CLICPARAEMPEZAR.draw()
      this.ESCENAS.ANIMATE_CLICPARAEMPEZAR.animate(1)
    }

    if (this.state == this.STATES.SELECT_MODE) {
      this.UI.SELECTMODE[4].draw()
      this.UI.SELECTMODE[5].draw()
      this.UI.SELECTMODE[6].draw()
      this.UI.SELECTMODE[7].draw()
    }


    if (this.state == this.STATES.STARTING) this.ESCENAS.INICIA_TABLERO.animate(5)
    if (this.state == this.STATES.FICHA_DROP) this.ESCENAS.FICHA_DROP.animate(1)
    if (this.currentFicha) this.currentFicha.draw()
    if (this.tablero) this.tablero.draw()
  }

  switchTurn() {
    this.currentTurn = this.counter % this.fichas.length
    this.currentFicha = this.fichas[this.currentTurn]
    this.counter++
    this.currentFicha.isHovereable = true
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



  mouseMove({ layerX = 0, layerY = 0 }) {
    let { x: canvasXOffset, y: canvasYOffset } = this.canvas.getBoundingClientRect();

    this.mouse.x = Math.floor(layerX - canvasXOffset);
    this.mouse.y = Math.floor(layerY - canvasYOffset);

    if (this.state == this.STATES.MENU) {
      this.UI.CLICPARAEMPEZAR.mouseHover(this.mouse.x, this.mouse.y)
    }

    if (this.state == this.STATES.SELECT_MODE) {
      this.UI.SELECTMODE[4].mouseHover(this.mouse.x, this.mouse.y)
      this.UI.SELECTMODE[5].mouseHover(this.mouse.x, this.mouse.y)
      this.UI.SELECTMODE[6].mouseHover(this.mouse.x, this.mouse.y)
      this.UI.SELECTMODE[7].mouseHover(this.mouse.x, this.mouse.y)
    }

    if (this.state == this.STATES.GAME) {

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


  }

  mouseUp(e) {

    if (this.state == this.STATES.GAME) {

      if (this.currentColumn >= 0 && this.currentColumn <= this.tablero.columns) {
        let row = this.tablero.addFicha(this.currentColumn, this.currentFicha)
        if (row >= 0) {

          this.currentCasillero = this.tablero.getCasillero(this.currentColumn, row)
          this.state = this.STATES.FICHA_DROP
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

  }

  mouseDown(e) {

    if (this.state == this.STATES.MENU) {
      this.UI.CLICPARAEMPEZAR.mouseClick()
    }

    if (this.state == this.STATES.SELECT_MODE) {
      this.UI.SELECTMODE[4].mouseClick()
      this.UI.SELECTMODE[5].mouseClick()
      this.UI.SELECTMODE[6].mouseClick()
      this.UI.SELECTMODE[7].mouseClick()
    }

    if (this.state == this.STATES.GAME) {
      if (this.currentFicha.isHover && this.currentFicha.isHovereable) {
        this.currentFicha.isClicked = true
        this.canvas.classList.add('grabbing')
      }
    }

  }

  mouseLeave(e) {
    if (this.state == this.STATES.GAME) {
      if (this.currentFicha.isClicked) {
        this.currentFicha.updatePos(...this.originalPositions[this.currentTurn])
      }
      this.currentFicha.isClicked = false
      this.currentFicha.isHover = false
    }
  }

  // 



}
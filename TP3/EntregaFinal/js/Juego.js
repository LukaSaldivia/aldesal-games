class Juego {
  constructor(ctx = CanvasRenderingContext2D, canvas = HTMLCanvasElement) {

    this.ctx = ctx;
    this.canvas = canvas;

    this.gameSettings = {
      columnas: 7,
      rows: 6,
      fichasToWin: 4,
      duration: 0
    }

    this.fichaBehaviour = {
      currentTurn : 0,
      counter : 1,
      currentColumn : undefined,
      currentCasillero : undefined,
      targetY : 0
    }


    this.fichas = []
    this.currentFicha = null
    this.originalPositions = []

    this.IMGS = {
      MENU: getImage('./img/juego/menu.jpg'),
      CLICPARAEMPEZAR: {
        default: getImage('./img/juego/clic_para_empezar.png'),
        hover: getImage('./img/juego/clic_para_empezar_hover.png')
      },
      SELECTMODE: {
        4: {
          empty: getImage('./img/juego/select-4-empty.png'),
          filled: getImage('./img/juego/select-4-filled.png')
        },
        5: {
          empty: getImage('./img/juego/select-5-empty.png'),
          filled: getImage('./img/juego/select-5-filled.png')
        },
        6: {
          empty: getImage('./img/juego/select-6-empty.png'),
          filled: getImage('./img/juego/select-6-filled.png')
        },
        7: {
          empty: getImage('./img/juego/select-7-empty.png'),
          filled: getImage('./img/juego/select-7-filled.png')
        }
      },
      FICHAS: {
        REBELDE: getImage('./img/juego/ficha_rebelde.png'),
        IMPERIAL: getImage('./img/juego/ficha_imperial.png'),
        SEPARATISTA: getImage('./img/juego/ficha_separatista.png'),
        JEDI: getImage('./img/juego/ficha_jedi.png')
      },
      HACEMUCHOTIEMPO: getImage('./img/juego/hace_mucho_tiempo.jpg')
    }


    this.UI = {}

    
    
    
    
    
    this.STATES = {
      MENU: 'menu',
      TRANSITION_MENU_SELECT_MODE : 'transition menu to select ficha',
      SELECT_MODE: 'select mode',
      SELECT_FICHA: 'select ficha',
      TRANSITION_SELECT_FICHA_STARTING: 'transition select ficha to starting',
      GAME: 'game',
      STARTING: 'starting',
      WINNER: 'winner',
      TIE: 'tie',
      FICHA_DROP: 'ficha drop',
    }
    
    this.state = this.STATES.MENU


    this.UI.MENU = new UIElement(new ResizedImage(this.IMGS.MENU, 1300, 500, 0, 0, ctx), null, 0, 0, ctx)

    this.UI.HACEMUCHOTIEMPO = new UIElement(new ResizedImage(this.IMGS.HACEMUCHOTIEMPO, 1300, 500, 0, 0, this.ctx), null, 0, 0, this.ctx)
    
    this.UI.CLICPARAEMPEZAR = new UIElement(
      new ResizedImage(this.IMGS.CLICPARAEMPEZAR.default, 350, 54, undefined, undefined, ctx),
      new ResizedImage(this.IMGS.CLICPARAEMPEZAR.hover, 350, 54, undefined, undefined, ctx),
      canvas.width / 2 - 175, canvas.height - 120, ctx
    )

    this.UI.CLICPARAEMPEZAR.onClick = () => {
      this.state = this.STATES.TRANSITION_MENU_SELECT_MODE
      this.canvas.classList.remove('pointer')
    }
    
    this.UI.CLICPARAEMPEZAR.onHover = () => {
      this.canvas.classList.add('pointer')
    }
    this.UI.CLICPARAEMPEZAR.onHoverLeave = () => {
      this.canvas.classList.remove('pointer')
    }

    this.UI.SELECTMODE = {
      4: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[4].empty, 197, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[4].filled, 197, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
      5: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[5].empty, 243, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[5].filled, 243, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
      6: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[6].empty, 290, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[6].filled, 290, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
      7: new UIElement(new ResizedImage(this.IMGS.SELECTMODE[7].empty, 343, 50, undefined, undefined, this.ctx), new ResizedImage(this.IMGS.SELECTMODE[7].filled, 343, 50, undefined, undefined, this.ctx), canvas.width / 2 - 343 / 2, (canvas.height / 2 - 50 / 2) * 4, this.ctx),
    }

    this.UI.SELECTMODE[5].clickableArea = {
      x: {
        start: this.UI.SELECTMODE[4].pos.x + this.UI.SELECTMODE[4].width,
        end: this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width
      },
      y: {
        start: this.UI.SELECTMODE[5].pos.y,
        end: this.UI.SELECTMODE[5].pos.y + this.UI.SELECTMODE[5].height
      }
    }
    this.UI.SELECTMODE[6].clickableArea = {
      x: {
        start: this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width,
        end: this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width
      },
      y: {
        start: this.UI.SELECTMODE[6].pos.y,
        end: this.UI.SELECTMODE[6].pos.y + this.UI.SELECTMODE[6].height
      }
    }
    this.UI.SELECTMODE[7].clickableArea = {
      x: {
        start: this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width,
        end: this.UI.SELECTMODE[7].pos.x + this.UI.SELECTMODE[7].width
      },
      y: {
        start: this.UI.SELECTMODE[7].pos.y,
        end: this.UI.SELECTMODE[7].pos.y + this.UI.SELECTMODE[7].height
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
      this.gameSettings.fichasToWin = 4
      this.gameSettings.columnas = 7
      this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10

      this.state = this.STATES.SELECT_FICHA
    }
    this.UI.SELECTMODE[5].onClick = () => {
      this.gameSettings.fichasToWin = 5
      this.gameSettings.columnas = 8
      this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10

      this.state = this.STATES.SELECT_FICHA
    }
    this.UI.SELECTMODE[6].onClick = () => {
      this.gameSettings.fichasToWin = 6
      this.gameSettings.columnas = 9
      this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10

      this.state = this.STATES.SELECT_FICHA
    }
    this.UI.SELECTMODE[7].onClick = () => {
      this.gameSettings.fichasToWin = 7
      this.gameSettings.columnas = 10
      this.gameSettings.duration = this.gameSettings.columnas * this.gameSettings.rows * 10

      this.state = this.STATES.SELECT_FICHA
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
      this.fichaBehaviour.targetY = this.fichaBehaviour.currentCasillero.pos.y + this.tablero.cellSize - this.currentFicha.size
      if (this.currentFicha.pos.y + this.currentFicha.size / 2 < this.fichaBehaviour.targetY) {
        this.currentFicha.addPos(0, 10)
      } else {
        this.currentFicha.updatePos(this.fichaBehaviour.currentCasillero.pos.x + this.fichaBehaviour.currentCasillero.offset, this.fichaBehaviour.currentCasillero.pos.y + this.fichaBehaviour.currentCasillero.offset)
      }


    }, () => {
      this.fichaBehaviour.currentCasillero.endedFall = true
      this.state = this.STATES.GAME
      this.currentFicha.updatePos(...this.originalPositions[this.fichaBehaviour.currentTurn])
      this.switchTurn()

    })

    this.ESCENAS.ANIMATE_CLICPARAEMPEZAR = new Escena(this.ctx, (t) => {
      this.UI.CLICPARAEMPEZAR.setOpacity(1 - t)
    })

    this.ESCENAS.TRANSITION_MENU = new Escena(this.ctx, (t) => {
      this.UI.MENU.setOpacity(1 - t)
    }, () => {
      this.newGame(7, 6, 4)
      this.currentFicha = this.fichas[this.fichaBehaviour.currentTurn]
      this.state = this.STATES.STARTING
    })

    this.ESCENAS.TRANSITION_MENU_SELECT_MODE = new Escena(this.ctx, (t => {
      this.UI.SELECTMODE[4].updatePos(this.canvas.width / 2 - 343 / 2 ,(canvas.height / 2 - 50 / 2) * t)
      this.UI.SELECTMODE[5].updatePos(this.canvas.width / 2 - 343 / 2 ,(canvas.height / 2 - 50 / 2) * t)
      this.UI.SELECTMODE[6].updatePos(this.canvas.width / 2 - 343 / 2 ,(canvas.height / 2 - 50 / 2) * t)
      this.UI.SELECTMODE[7].updatePos(this.canvas.width / 2 - 343 / 2 ,(canvas.height / 2 - 50 / 2) * t)
      // this.UI.MENU.updatePos(0 , this.canvas.height * t * 2)
      this.UI.MENU.setOpacity(1 - t * 1.5)

      

    }), () => {
      this.state = this.STATES.SELECT_MODE
      this.UI.SELECTMODE[4].clickableArea = {
        x: {
          start: this.UI.SELECTMODE[4].pos.x,
          end: this.UI.SELECTMODE[4].pos.x + this.UI.SELECTMODE[4].width
        },
        y: {
          start: this.UI.SELECTMODE[4].pos.y,
          end: this.UI.SELECTMODE[4].pos.y + this.UI.SELECTMODE[4].height
        }
      }
      this.UI.SELECTMODE[5].clickableArea = {
        x: {
          start: this.UI.SELECTMODE[4].pos.x + this.UI.SELECTMODE[4].width,
          end: this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width
        },
        y: {
          start: this.UI.SELECTMODE[5].pos.y,
          end: this.UI.SELECTMODE[5].pos.y + this.UI.SELECTMODE[5].height
        }
      }
      this.UI.SELECTMODE[6].clickableArea = {
        x: {
          start: this.UI.SELECTMODE[5].pos.x + this.UI.SELECTMODE[5].width,
          end: this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width
        },
        y: {
          start: this.UI.SELECTMODE[6].pos.y,
          end: this.UI.SELECTMODE[6].pos.y + this.UI.SELECTMODE[6].height
        }
      }
      this.UI.SELECTMODE[7].clickableArea = {
        x: {
          start: this.UI.SELECTMODE[6].pos.x + this.UI.SELECTMODE[6].width,
          end: this.UI.SELECTMODE[7].pos.x + this.UI.SELECTMODE[7].width
        },
        y: {
          start: this.UI.SELECTMODE[7].pos.y,
          end: this.UI.SELECTMODE[7].pos.y + this.UI.SELECTMODE[7].height
        }
      }
    })




  }

  update() {


    
    
    console.log(this.state);
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)



    if (this.state == this.STATES.MENU) {
      this.UI.MENU.draw()
      this.UI.CLICPARAEMPEZAR.draw()
      this.ESCENAS.ANIMATE_CLICPARAEMPEZAR.animate(1.5)
    }
    
    if (this.state == this.STATES.TRANSITION_MENU_SELECT_MODE) {
      this.UI.SELECTMODE[4].draw()
      this.UI.SELECTMODE[5].draw()
      this.UI.SELECTMODE[6].draw()
      this.UI.SELECTMODE[7].draw()
      this.UI.MENU.draw()
      this.ESCENAS.TRANSITION_MENU_SELECT_MODE.animate(2)
    }

    if (this.state == this.STATES.SELECT_MODE) {
      this.UI.SELECTMODE[4].draw()
      this.UI.SELECTMODE[5].draw()
      this.UI.SELECTMODE[6].draw()
      this.UI.SELECTMODE[7].draw()
    }

    if (this.state == this.STATES.SELECT_FICHA) {
      this.newGame(this.gameSettings.columnas, this.gameSettings.rows, 'REBELDE', 'IMPERIAL')
      this.state = this.STATES.STARTING
    }


    if (this.state == this.STATES.STARTING) {
      this.tablero.draw()
      this.ESCENAS.INICIA_TABLERO.animate(5)
    }
    if (this.state == this.STATES.FICHA_DROP){
      this.currentFicha.draw()
      this.tablero.draw()
      this.ESCENAS.FICHA_DROP.animate(1)
    }
    if (this.state == this.STATES.GAME) {
      this.currentFicha.draw()
      this.tablero.draw()
    }
  }

  updateOriginalPositions() {
    this.originalPositions = []
    this.fichas.forEach(ficha => {
      this.originalPositions.push([ficha.pos.x, ficha.pos.y])
    })
  }

  switchTurn() {
    this.fichaBehaviour.currentTurn = this.fichaBehaviour.counter % this.fichas.length
    this.currentFicha = this.fichas[this.fichaBehaviour.currentTurn]
    this.fichaBehaviour.counter++
    this.currentFicha.isHovereable = true

  }

  newGame(columns = 7, rows = 6, ...players) {

    this.fichas = []

    players.forEach((team, i) => {
      this.fichas.push(new Ficha(this.IMGS.FICHAS[team], i + 1, i % 2 == 0 ? 100 : this.canvas.width - 140, this.canvas.height - 100, this.ctx))
    })

    this.currentFicha = this.fichas[0]
    this.updateOriginalPositions()


    this.state = this.STATES.STARTING

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
          this.fichaBehaviour.currentColumn = i;
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
          this.fichaBehaviour.currentColumn = undefined;
        }
      }

    }


  }

  mouseUp(e) {

    if (this.state == this.STATES.GAME) {

      if (this.fichaBehaviour.currentColumn >= 0 && this.fichaBehaviour.currentColumn <= this.tablero.columns) {
        let row = this.tablero.addFicha(this.fichaBehaviour.currentColumn, this.currentFicha)
        if (row >= 0) {

          this.fichaBehaviour.currentCasillero = this.tablero.getCasillero(this.fichaBehaviour.currentColumn, row)
          this.state = this.STATES.FICHA_DROP
        }
        this.fichaBehaviour.currentColumn = undefined
      }

      if (this.canvas.classList.contains('illegal')) {
        this.currentFicha.updatePos(...this.originalPositions[this.fichaBehaviour.currentTurn])
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
        this.currentFicha.updatePos(...this.originalPositions[this.fichaBehaviour.currentTurn])
      }
      this.currentFicha.isClicked = false
      this.currentFicha.isHover = false
    }
  }

  // 



}
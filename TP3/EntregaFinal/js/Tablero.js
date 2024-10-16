class Tablero {
  constructor(filas = 6, columnas = 7, fichasNecesarias = 4) {
    this.filas = filas
    this.columnas = columnas
    this.NEUTRAL = 0

    this.matriz = new Array(columnas).fill().map(() => new Array(filas).fill(this.NEUTRAL))

    this.fichasNecesarias = fichasNecesarias

    // if filas == 6 && columnas == 7
    //   matriz[0][2] => 1

    // 0 0 1 0 0 0
    // 0 0 0 0 0 0
    // 0 0 0 0 0 0
    // 0 0 0 0 0 0
    // 0 0 0 0 0 0
    // 0 0 0 0 0 0
    // 0 0 0 0 0 0

    // en tablero es

    // 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0
    // 1 0 0 0 0 0 0
    // 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0
    // 0 0 0 0 0 0 0
  }

  console() {

    let res = ''
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        res += (this.matriz[i][j] == this.NEUTRAL ? '-' : this.matriz[i][j]) + " "
      }
      console.log(res)
      res = ""
    }

    console.log();

  }

  addFicha(column = 0, n = 0) {
    let i = this.filas - 1;
    while (this.matriz[column][i] != this.NEUTRAL) {
      i--
    }

    this.matriz[column][i] = n
  }

  checkMatriz(n = 0){
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        if (this.matriz[i][j] != this.NEUTRAL)
          if(this.checkWin(n, i, j))
            return true
      };
      
    }

    return false
  }


  checkWin(n = 0, columna = 0, fila = 0) {


    // chequear hacia derecha    

    if (columna + this.fichasNecesarias - 1 < this.columnas &&
      this.matriz[columna + this.fichasNecesarias - 1][fila] == n) {

      let i = columna + this.fichasNecesarias - 2;
      while (i > columna && this.matriz[i][fila] == n) {
        i--;
      }

      if (i == columna) {
        return ['der', true];
      }
    }


    // chequear hacia izquierda       

    if (columna - this.fichasNecesarias + 1 >= 0 &&
      this.matriz[columna - this.fichasNecesarias + 1][fila] == n) {
      let i = columna - this.fichasNecesarias + 2;
      while (i < columna && this.matriz[i][fila] == n) {
        i++;
      }

      if (i == columna) {
        return ['izq', true];
      }
    }


    // chequear hacia abajo
    if (fila + this.fichasNecesarias - 1 < this.filas &&
      this.matriz[columna][fila + this.fichasNecesarias - 1] == n) {
      let i = fila + this.fichasNecesarias - 2
      while (i > fila && this.matriz[columna][i] == n) {
        i--;
      }

      if (i == fila) {
        return ['aba', true]
      }
    }


    // chequear hacia izquierda-arriba

    if (columna - this.fichasNecesarias + 1 >= 0 && fila - this.fichasNecesarias + 1 >= 0 &&
      this.matriz[columna - this.fichasNecesarias + 1][fila - this.fichasNecesarias + 1] == n) {
      let i = 1;
      while (columna - i >= 0 && fila - i >= 0 && this.matriz[columna - i][fila - i] == n) {
        i++;
      }

      if (i == this.fichasNecesarias) {
        return ['izq-arr', true];
      }
    }


    // chequear hacia izquierda-abajo

    if (columna - this.fichasNecesarias + 1 >= 0 && fila + this.fichasNecesarias - 1 < this.filas &&
      this.matriz[columna - this.fichasNecesarias + 1][fila + this.fichasNecesarias - 1] == n) {
      let i = 1;
      while (columna - i >= 0 && fila + i < this.filas && this.matriz[columna - i][fila + i] == n) {
        i++;
      }

      if (i == this.fichasNecesarias) {
        return ['izq-aba', true];
      }
    }


    // chequear hacia derecha-arriba

    if (columna + this.fichasNecesarias - 1 < this.columnas && fila - this.fichasNecesarias + 1 >= 0 &&
      this.matriz[columna + this.fichasNecesarias - 1][fila - this.fichasNecesarias + 1] == n) {
      let i = 1;
      while (columna + i < this.columnas && fila - i >= 0 && this.matriz[columna + i][fila - i] == n) {
        i++;
      }

      if (i == this.fichasNecesarias) {
        return ['der-arr', true];
      }
    }
    // chequear hacia derecha-abajo

    if (columna + this.fichasNecesarias - 1 < this.columnas && fila + this.fichasNecesarias - 1 < this.filas &&
      this.matriz[columna + this.fichasNecesarias - 1][fila + this.fichasNecesarias - 1] == n) {
      let i = 1;
      while (columna + i < this.columnas && fila + i < this.filas && this.matriz[columna + i][fila + i] == n) {
        i++;
      }

      if (i == this.fichasNecesarias) {
        return ['der-aba', true];
      }
    }

    return false
  }
}

let tablero = new Tablero(4, 4, 4)

function addFicha(tablero = new Tablero(), column = 0, n = 0) {
  let hayGanador = false

  if (!hayGanador) {
    tablero.addFicha(column, n)
    tablero.console()
    hayGanador = tablero.checkMatriz(n)
  }

  return hayGanador

}

console.log(addFicha(tablero, 0, 1))
console.log(addFicha(tablero, 0, 2))
console.log(addFicha(tablero, 1, 1))
console.log(addFicha(tablero, 1, 2))
console.log(addFicha(tablero, 3, 1))
console.log(addFicha(tablero, 3, 2))
console.log(addFicha(tablero, 2, 1))
console.log(addFicha(tablero, 2, 2))



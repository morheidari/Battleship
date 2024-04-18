function Ship(l) {
  let length = l
  let hitted = 0
  return {
    length: length,
    hitted: hitted,
    hit: function () {
      this.hitted = this.hitted + 1
    },
    isSunk: function () {
      if (this.hitted >= this.length) return true
      return false
    }
  }
}

function GameBoard() {
  let board = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[i][j] = null
    }
  }
  return {
    ships: [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)],
    board: board,
    missedAttacks: [],
    putShipInCordinates: function (ship, cordinates, orientation) {
      const l = ship.length
      if (orientation === 'horizontal') {
        if (cordinates[0] + l - 1 < 10) {
          for (let i = 0; i < l; i++) {
            boards[cordinates[0] + i][cordinates[1]] = ship
          }
          return true
        } else return false
      } else {
        if (cordinates[1] + l - 1 < 10) {
          for (let i = 0; i < l; i++) {
            boards[cordinates[0]][cordinates[1] + i] = ship
          }
          return true
        } else return false
      }
    },
    recieveAttack: function (cordinates) {
      const c = board[cordinates[0]][cordinates[1]]
      if (c === null) {
        this.missedAttacks.push(cordinates)
      } else {
        c.hit()
      }
    },
    areAllShipsSunk: function () {
      return this.ships.every((ship) => ship.isSunk)
    }
  }
}

module.exports = { Ship, GameBoard }

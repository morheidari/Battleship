function Ship(l, label) {
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
    },
    label
  }
}

function GameBoard() {
  let board = []
  function setupBoard() {
    for (let i = 0; i < 10; i++) {
      let row = []
      for (let j = 0; j < 10; j++) {
        row.push(null)
      }
      board.push(row)
    }
  }
  setupBoard()
  function isShipPlacable(ship, cordinates, orientation) {
    const l = ship.length
    if (orientation === 'horizontal') {
      if (cordinates[0] + l - 1 < 10) {
        for (let i = 0; i < l; i++) {
          if (board[cordinates[0] + i][cordinates[1]] !== null) {
            return false
          }
        }
        return true
      } else return false
    } else {
      if (cordinates[1] + l - 1 < 10) {
        for (let i = 0; i < l; i++) {
          if (board[cordinates[0]][cordinates[1] + i] !== null) {
            return false
          }
        }
        return true
      } else return false
    }
  }
  function placeShipInRandomPlace(ship, gameBoard) {
    let r = Math.floor(Math.random() * 10)
    let c = Math.floor(Math.random() * 10)
    let o = Math.floor(Math.random() * 2)
    function convertBinaryToOrientation(b) {
      if (b == 1) return 'horizontal'
      return 'vertical'
    }
    while (!isShipPlacable(ship, [c, r], convertBinaryToOrientation(o))) {
      r = Math.floor(Math.random() * 10)
      c = Math.floor(Math.random() * 10)
      o = Math.floor(Math.random() * 2)
    }
    gameBoard.putShipInCordinates(ship, [c, r], convertBinaryToOrientation(o))
  }
  return {
    ships: [Ship(2, 1), Ship(3, 2), Ship(3, 3), Ship(4, 4), Ship(5, 5)],
    board: board,
    missedAttacks: [],
    putShipInCordinates: function (ship, cordinates, orientation) {
      const l = ship.length
      if (isShipPlacable(ship, cordinates, orientation)) {
        ship.position = cordinates
        ship.orientation = orientation
        if (orientation === 'horizontal') {
          for (let i = 0; i < l; i++) {
            this.board[cordinates[0] + i][cordinates[1]] = ship
          }
        } else {
          for (let i = 0; i < l; i++) {
            this.board[cordinates[0]][cordinates[1] + i] = ship
          }
        }
      } else return isShipPlacable(ship, cordinates, orientation)
    },
    recieveAttack: function (cordinates) {
      const c = this.board[cordinates[0]][cordinates[1]]
      if (c === null) {
        this.missedAttacks.push(cordinates)
      } else {
        c.hit()
      }
    },
    areAllShipsSunk: function () {
      return this.ships.every((ship) => ship.isSunk())
    },
    placeShipsInRandomPlaces: function () {
      const ships = this.ships
      ships.forEach((ship) => {
        placeShipInRandomPlace(ship, this)
      })
    }
  }
}

function Player() {
  const type = 'real'
  const gameBoard = GameBoard()
  return { type, gameBoard }
}

module.exports = { Ship, GameBoard, Player }

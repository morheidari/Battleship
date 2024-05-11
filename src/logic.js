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
  function setupBoard() {
    let board = []
    for (let i = 0; i < 10; i++) {
      let row = []
      for (let j = 0; j < 10; j++) {
        row.push(null)
      }
      board.push(row)
    }
    return board
  }
  let board = setupBoard()
  return {
    placeShipInRandomPlace: function (ship, gameBoard) {
      let r = Math.floor(Math.random() * 10)
      let c = Math.floor(Math.random() * 10)
      let o = Math.floor(Math.random() * 2)
      function convertBinaryToOrientation(b) {
        if (b == 1) return 'horizontal'
        return 'vertical'
      }
      while (
        !this.isShipPlacable(ship, [c, r], convertBinaryToOrientation(o))
      ) {
        r = Math.floor(Math.random() * 10)
        c = Math.floor(Math.random() * 10)
        o = Math.floor(Math.random() * 2)
      }
      gameBoard.putShipInCordinates(ship, [c, r], convertBinaryToOrientation(o))
    },
    isShipPlacable: function (ship, cordinates, orientation) {
      const l = ship.length
      if (orientation === 'horizontal') {
        if (cordinates[0] + l - 1 < 10) {
          for (let i = 0; i < l; i++) {
            if (this.board[cordinates[0] + i][cordinates[1]] !== null) {
              return false
            }
          }
          return true
        } else return false
      } else {
        if (cordinates[1] + l - 1 < 10) {
          for (let i = 0; i < l; i++) {
            if (this.board[cordinates[0]][cordinates[1] + i] !== null) {
              return false
            }
          }
          return true
        } else return false
      }
    },
    ships: [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)],
    board: board,
    missedAttacks: [],
    attacked: [],
    putShipInCordinates: function (ship, cordinates, orientation) {
      const l = ship.length
      if (this.isShipPlacable(ship, cordinates, orientation)) {
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
      } else return this.isShipPlacable(ship, cordinates, orientation)
    },
    removeShipFromCordinates: function (ship) {
      const cordinates = ship.position
      const orientation = ship.orientation
      const l = ship.length
      if (cordinates) {
        if (orientation === 'horizontal') {
          for (let i = 0; i < l; i++) {
            this.board[cordinates[0] + i][cordinates[1]] = null
          }
        } else {
          for (let i = 0; i < l; i++) {
            this.board[cordinates[0]][cordinates[1] + i] = null
          }
        }
      }
    },
    receiveAttack: function (cordinates) {
      const c = this.board[cordinates[0]][cordinates[1]]
      this.attacked.push(cordinates)
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
      this.board = setupBoard()
      let ships = this.ships
      ships.forEach((ship) => {
        ship.hitted = 0
        this.placeShipInRandomPlace(ship, this)
      })
    }
  }
}

function Player() {
  const type = 'real'
  const gameBoard = GameBoard()
  function containArray(mainArray, array) {
    return mainArray.some(
      (arr) => JSON.stringify(arr) === JSON.stringify(array)
    )
  }

  function isAttackable(cordinates, gameBoard) {
    return !containArray(gameBoard.attacked, cordinates)
  }

  function generateRandomCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
  }

  function generateRandomAttackCoordinate(gameBoard) {
    let c = generateRandomCoordinates()
    while (!isAttackable(c, gameBoard)) {
      c = generateRandomCoordinates()
    }
    return c
  }
  let successfullAttacks = []

  function nextCordinate(coordinates, direction) {
    let [x, y] = coordinates

    switch (direction) {
      case 'up':
        y += 1
        break
      case 'down':
        y -= 1
        break
      case 'left':
        x -= 1
        break
      default:
        x += 1
    }

    return [x, y]
  }

  function generateNextAttack(gameBoard) {
    if (successfullAttacks.length == 1) {
      console.log(successfullAttacks)
      const directions = ['up', 'down', 'right', 'left']
      let nextDirectionIndex = Math.floor(Math.random() * 4)
      while (
        !isAttackable(
          nextCordinate(successfullAttacks[0], directions[nextDirectionIndex]),
          gameBoard
        )
      ) {
        nextDirectionIndex = Math.floor(Math.random() * 4)
      }
      return nextCordinate(
        successfullAttacks[0],
        directions[nextDirectionIndex]
      )
    }
    if (successfullAttacks.length >= 2) {
      const d1 =
        successfullAttacks.slice(-2)[1][0] - successfullAttacks.slice(-2)[0][0]
      const d2 =
        successfullAttacks.slice(-2)[1][1] - successfullAttacks.slice(-2)[0][1]
      let next = [
        successfullAttacks.slice(-2)[1][0] + d1,
        successfullAttacks.slice(-2)[1][1] + d2
      ]
      if (isAttackable(next, gameBoard)) return next
      next = [successfullAttacks[0][0] - d1, successfullAttacks[0][1] - d2]
      if (isAttackable(next, gameBoard)) return next
      return generateRandomAttack(gameBoard)
    }
  }

  return { type, gameBoard, generateRandomAttackCoordinate }
}

module.exports = { Ship, GameBoard, Player }

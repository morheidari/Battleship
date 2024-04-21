const { GameBoard } = require('../logic.js')

test('put a ship of size 3 in (3,3) horizontaly', () => {
  const gameBoard = GameBoard()
  gameBoard.putShipInCordinates(gameBoard.ships[1], [3, 3], 'horizontal')
  expect(gameBoard.board[3][3]).toBe(gameBoard.ships[1])
  expect(gameBoard.board[4][3]).toBe(gameBoard.ships[1])
  expect(gameBoard.board[5][3]).toBe(gameBoard.ships[1])
})

test('put a ship of size 3 in (7,1) horizontaly', () => {
  const gameBoard = GameBoard()
  gameBoard.putShipInCordinates(gameBoard.ships[1], [7, 3], 'horizontal')
  expect(gameBoard.board[7][3]).toBe(gameBoard.ships[1])
  expect(gameBoard.board[8][3]).toBe(gameBoard.ships[1])
  expect(gameBoard.board[9][3]).toBe(gameBoard.ships[1])
})

test("can't put a ship of size 3 in (8,1) horizontaly", () => {
  const gameBoard = GameBoard()
  gameBoard.putShipInCordinates(gameBoard.ships[1], [8, 1], 'horizontal')
  expect(gameBoard.board[8][1]).toBe(null)
  expect(gameBoard.board[9][1]).toBe(null)
})

test('collision is not allowed', () => {
  const gameBoard = GameBoard()
  const ship1 = gameBoard.ships[0]
  const ship2 = gameBoard.ships[1]
  gameBoard.putShipInCordinates(ship1, [4, 4], 'horizontal')
  gameBoard.putShipInCordinates(ship2, [4, 4], 'vertical')
  expect(gameBoard.board[5][4]).toBe(ship1)
  expect(gameBoard.board[4][5]).toBe(null)
})

test('put two ships', () => {
  const gameBoard = GameBoard()
  const ship1 = gameBoard.ships[0]
  const ship2 = gameBoard.ships[1]
  gameBoard.putShipInCordinates(ship1, [4, 4], 'horizontal')
  gameBoard.putShipInCordinates(ship2, [4, 5], 'vertical')
  expect(gameBoard.board[5][4]).toBe(ship1)
  expect(gameBoard.board[4][5]).toBe(ship2)
})

test('recieve attack in a ship cordinate', () => {
  const gameBoard = GameBoard()
  const ship = gameBoard.ships[0]
  gameBoard.putShipInCordinates(ship, [0, 0], 'horizontal')
  gameBoard.recieveAttack([1, 0])
  expect(gameBoard.board[0][0]).toBe(ship)
  expect(gameBoard.board[1][0]).toBe(ship)
  expect(ship.hitted).toBe(1)
})

test('sank all the ships', () => {
  const gameBoard = GameBoard()
  const ships = gameBoard.ships
  gameBoard.putShipInCordinates(ships[0], [0, 0], 'horizontal')
  gameBoard.putShipInCordinates(ships[1], [2, 0], 'horizontal')
  gameBoard.putShipInCordinates(ships[2], [5, 0], 'horizontal')
  gameBoard.putShipInCordinates(ships[3], [0, 1], 'horizontal')
  gameBoard.putShipInCordinates(ships[4], [4, 1], 'horizontal')
  for (let i = 0; i < 20; i++) {
    const rem = i % 10
    const res = (i - rem) / 10
    gameBoard.recieveAttack([rem, res])
  }
  expect(gameBoard.areAllShipsSunk()).toBeTruthy()
})

test('test missed attacks', () => {
  const gameBoard = GameBoard()
  const ships = gameBoard.ships
  gameBoard.putShipInCordinates(ships[0], [0, 0], 'horizontal')
  gameBoard.putShipInCordinates(ships[1], [2, 0], 'horizontal')
  gameBoard.putShipInCordinates(ships[2], [5, 0], 'horizontal')
  for (let i = 0; i < 20; i++) {
    const rem = i % 10
    const res = (i - rem) / 10
    gameBoard.recieveAttack([rem, res])
  }
  expect(gameBoard.missedAttacks).toBe([
    [8, 0],
    [9, 0],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9]
  ])
})

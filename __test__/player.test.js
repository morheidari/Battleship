const { Player } = require('../logic.js')

test('player is real', () => {
  const player = Player()
  expect(player.type).toBe('real')
})

test('player is computer', () => {
  const player = Player()
  player.type = 'computer'
  expect(player.type).toBe('computer')
})

test('player recieve an attack', () => {
  const player = Player()
  player.gameBoard.recieveAttack([0, 0])
  expect(player.gameBoard.missedAttacks).toEqual([[0, 0]])
})

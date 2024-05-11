const { Player } = require('./logic.js')
const { Render, startGame, changeShipsPosition } = require('./dom.js')

const player = Player()
const opponent = Player()
opponent.type = 'computer'
startGame(player, opponent)

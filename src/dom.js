function Render() {
  const showShipsPosition = function (gameBoard) {
    const ships = gameBoard.ships
    for (let i = 0; i < 5; i++) {
      const ship = ships[i]
      const startPoint = ship.position
      const orientation = ship.orientation
      const length = ship.length
      if (orientation == 'horizontal') {
        for (let j = 0; j < length; j++) {
          const position = startPoint[0] + j + startPoint[1] * 10
          const shipCell = document.querySelector(
            `.player>.board>.cell${position}`
          )
          shipCell.classList.add('ship')
        }
      } else {
        for (let j = 0; j < length; j++) {
          const position = startPoint[0] + (startPoint[1] + j) * 10
          const shipCell = document.querySelector(
            `.player>.board>.cell${position}`
          )
          shipCell.classList.toggle('ship')
        }
      }
    }
  }
  const showShipsCondition = function (gameBoard) {}
  return { showShipsPosition }
}

module.exports = { Render }

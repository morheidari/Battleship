function Render(identity) {
  const id = identity
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
            `.${id}>.board>.cell${position}`
          )
          shipCell.classList.add('ship')
        }
      } else {
        for (let j = 0; j < length; j++) {
          const position = startPoint[0] + (startPoint[1] + j) * 10
          const shipCell = document.querySelector(
            `.${id}>.board>.cell${position}`
          )
          shipCell.classList.toggle('ship')
        }
      }
    }
  }
  const aliveShips = [1, 2, 3, 4, 5]
  const showShipsCondition = function (gameBoard) {
    const ships = gameBoard.ships
    aliveShips.forEach((label) => {
      if (ships[label].isSunk()) {
        const outboardShip = document.querySelector(
          `.${id}>.ships>.ship-${label}`
        )
        outboardShip.classList.add('sunk')
        aliveShips = aliveShips.filter((l) => l !== label)
      }
    })
  }
  const missedAttacks = []
  const succsessfullAttacks = []
  function createCrossSvg() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('viewBox', '0 0 100 100')
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line1.setAttribute('x1', '0')
    line1.setAttribute('y1', '0')
    line1.setAttribute('x2', '100')
    line1.setAttribute('y2', '100')
    line1.setAttribute('stroke', 'black')
    line1.setAttribute('stroke-width', '5')
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line2.setAttribute('x1', '0')
    line2.setAttribute('y1', '100')
    line2.setAttribute('x2', '100')
    line2.setAttribute('y2', '0')
    line2.setAttribute('stroke', 'black')
    line2.setAttribute('stroke-width', '5')
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    )
    circle.setAttribute('cx', '50')
    circle.setAttribute('cy', '50')
    circle.setAttribute('r', '10')
    circle.setAttribute('fill', 'black')
    svg.appendChild(line1)
    svg.appendChild(line2)
    svg.appendChild(circle)
    return svg
  }
  const showAttackResult = function (cordinates, gameBoard) {
    const position = cordinates[0] + cordinates[1] * 10
    const cell = document.querySelector(`.${id}>.board>.cell${position}`)
    if (gameBoard.board[cordinates[0]][cordinates[1]])
      cell.style.backgroundColor = 'rgb(230,0,0)'
    else cell.style.backgroundColor = 'rgb(200,220,220)'
    cell.appendChild(createCrossSvg())
  }
  return { showShipsPosition, showShipsCondition, showAttackResult }
}

module.exports = { Render }

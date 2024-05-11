function Render(identity) {
  const id = identity
  const cleanGrid = function () {
    const cells = Array.from(document.querySelectorAll(`.${id}>.board>.cell`))
    cells.forEach((cell) => {
      const i = cell.classList[1]
      cell.className = `cell ${i}`
      cell.innerHTML = ''
    })
  }
  const removeRotationIcon = function (startPoint) {
    const pos = startPoint[0] + startPoint[1] * 10
    const rotationCell = document.querySelector(`.${id}>.board>.cell${pos}`)
    rotationCell.innerHTML = ''
  }
  const addRotationIcon = function (startPoint) {
    const pos = startPoint[0] + startPoint[1] * 10
    const rotationCell = document.querySelector(`.${id}>.board>.cell${pos}`)
    const rotation = document.createElement('span')
    rotation.classList.add('material-symbols-outlined')
    rotation.classList.add('rotation')
    rotation.textContent = 'replay'
    rotationCell.appendChild(rotation)
  }
  const showPosibleShipPosition = function (position, orientation, length) {
    cleanPosibleShipPosition()
    if (orientation == 'horizontal') {
      for (let i = 0; i < length; i++) {
        const cell = document.querySelector(
          `.${id}>.board>.cell${position + i}`
        )
        cell.classList.add('posible-ship')
      }
    } else {
      for (let i = 0; i < length; i++) {
        const cell = document.querySelector(
          `.${id}>.board>.cell${position + 10 * i}`
        )
        cell.classList.add('posible-ship')
      }
    }
  }
  const cleanPosibleShipPosition = function () {
    const cells = Array.from(document.querySelectorAll(`.posible-ship`))
    cells.forEach((cell) => {
      cell.classList.remove('posible-ship')
    })
  }
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
          shipCell.classList.add(`ship-${i + 1}`)
        }
      } else {
        for (let j = 0; j < length; j++) {
          const position = startPoint[0] + (startPoint[1] + j) * 10
          const shipCell = document.querySelector(
            `.${id}>.board>.cell${position}`
          )
          shipCell.classList.toggle('ship')
          shipCell.classList.add(`ship-${i + 1}`)
        }
      }
    }
  }
  let aliveShips = [1, 2, 3, 4, 5]
  const showShipsCondition = function (gameBoard) {
    const ships = gameBoard.ships
    aliveShips.forEach((label) => {
      const outboardShip = document.querySelector(
        `.${id}>.ships>.ship-${label}`
      )
      if (ships[label - 1].isSunk()) {
        outboardShip.classList.add('sunk')
      } else {
        outboardShip.classList.remove('sunk')
      }
    })
  }
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
      cell.classList.add('successful-attack')
    else cell.classList.add('failed-attack')
    cell.appendChild(createCrossSvg())
  }
  return {
    showShipsPosition,
    showShipsCondition,
    showAttackResult,
    cleanGrid,
    showPosibleShipPosition,
    cleanPosibleShipPosition,
    addRotationIcon,
    removeRotationIcon
  }
}

function startGame(playerOne, playerTwo) {
  const display = document.querySelector('.display')
  const startBtn = document.querySelector('.start')
  const gameBoardOne = playerOne.gameBoard
  const gameBoardTwo = playerTwo.gameBoard
  const renderOne = Render('player')
  const renderTwo = Render('opponent')
  const cells = Array.from(document.querySelectorAll(`.opponent>.board>.cell`))
  begin()
  startBtn.addEventListener('click', (e) => {
    if (e.target.textContent == 'Start') {
      changeShipsPosition(playerOne, true)
      e.target.textContent = 'Restart'
      cells.forEach((cell) => {
        cell.addEventListener('click', start, { once: true })
      })
    } else {
      renderOne.cleanGrid()
      renderTwo.cleanGrid()
      e.target.textContent = 'Start'
      begin()
    }
  })
  function start(e) {
    const attackedPosition = Number(e.target.classList[1].replace(/cell/, ''))
    const c = attackedPosition % 10
    const r = (attackedPosition - c) / 10
    const playerOneAttackedCordinates = [c, r]
    const playerTwoAttackedCordinates =
      playerTwo.generateRandomAttackCoordinate(gameBoardOne)
    gameBoardTwo.receiveAttack(playerOneAttackedCordinates)
    renderTwo.showAttackResult(playerOneAttackedCordinates, gameBoardTwo)
    renderTwo.showShipsCondition(gameBoardTwo)
    gameBoardOne.receiveAttack(playerTwoAttackedCordinates)
    renderOne.showAttackResult(playerTwoAttackedCordinates, gameBoardOne)
    renderOne.showShipsCondition(gameBoardOne)
    endOfGame()
  }
  function announceWinner(winner) {
    const message = winner == 'computer' ? 'computer wins' : 'you win'
    display.textContent = message
  }
  function removeEventListenersFromAllCells() {
    cells.forEach((cell) => {
      cell.removeEventListener('click', start)
    })
  }
  function endOfGame() {
    if (gameBoardOne.areAllShipsSunk()) {
      removeEventListenersFromAllCells()
      announceWinner('computer')
    }
    if (gameBoardTwo.areAllShipsSunk()) {
      removeEventListenersFromAllCells()
      announceWinner('player')
    }
  }
  function begin() {
    removeEventListenersFromAllCells()
    gameBoardOne.placeShipsInRandomPlaces()
    gameBoardTwo.placeShipsInRandomPlaces()
    renderOne.showShipsPosition(gameBoardOne)
    renderOne.showShipsCondition(gameBoardOne)
    renderTwo.showShipsCondition(gameBoardTwo)
    changeShipsPosition(playerOne, false)
  }
}

function changeShipsPosition(player, done) {
  const display = document.querySelector('.display')
  display.textContent = 'Move your ships by click!'
  const renderP = Render('player')
  const gameBoard = player.gameBoard
  const cells = Array.from(document.querySelectorAll('.player>.board>.cell'))
  let clicked = 0
  let position
  let c
  let r
  let shipObject
  let startPoint
  let orientation
  function replacement(e) {
    const isShip = e.target.classList.contains('ship')
    const isRotation = e.target.classList.contains('rotation')
    if (clicked == 0) {
      if (isShip) {
        clicked = 1
        position = e.target.classList[1].replace(/cell/, '')
        c = position % 10
        r = (position - c) / 10
        shipObject = gameBoard.board[c][r]
        startPoint = shipObject.position
        orientation = shipObject.orientation
        renderP.addRotationIcon(startPoint)
      }
    } else if (clicked == 1) {
      if (isRotation) {
        let changedOrientation
        if (orientation == 'horizontal') changedOrientation = 'vertical'
        else changedOrientation = 'horizontal'
        if (
          gameBoard.isShipPlacable(shipObject, startPoint, changedOrientation)
        ) {
          gameBoard.removeShipFromCordinates(shipObject)
          gameBoard.putShipInCordinates(
            shipObject,
            startPoint,
            changedOrientation
          )
          orientation = changedOrientation
          renderP.cleanGrid()
          renderP.showShipsPosition(gameBoard)
          clicked = 0
          renderP.removeRotationIcon(startPoint)
        }
      } else {
        const destination = e.target
        const cellNumber = destination.classList[1].replace(/cell/, '')
        const column = cellNumber % 10
        const row = (cellNumber - column) / 10
        const cordinates = [column, row]
        if (gameBoard.isShipPlacable(shipObject, cordinates, orientation)) {
          renderP.removeRotationIcon(startPoint)
          gameBoard.putShipInCordinates(shipObject, cordinates, orientation)
          renderP.cleanPosibleShipPosition()
          clicked = 0
        } else {
          gameBoard.putShipInCordinates(shipObject, startPoint, orientation)
        }
        renderP.cleanGrid()
        renderP.showShipsPosition(gameBoard)
      }
    }
  }
  if (done) {
    cells.forEach((cell) => {
      let newCell = cell.cloneNode(true)
      cell.parentNode.replaceChild(newCell, cell)
    })
    display.textContent = 'Game is running, restart it whenever you want!'
  } else {
    cells.forEach((cell) => {
      cell.addEventListener('click', replacement)
    })
    cells.forEach((cell) => {
      cell.addEventListener('mouseover', (event) => {
        renderP.cleanPosibleShipPosition()
        if (clicked == 1) {
          gameBoard.removeShipFromCordinates(shipObject)
          const pos = Number(event.target.classList[1].replace(/cell/, ''))
          const column = pos % 10
          const row = (pos - column) / 10
          if (
            gameBoard.isShipPlacable(shipObject, [column, row], orientation)
          ) {
            renderP.showPosibleShipPosition(pos, orientation, shipObject.length)
          }
        }
      })
    })
  }
}

module.exports = { Render, startGame, changeShipsPosition }

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((module) => {

function Render(identity) {
  var id = identity;
  var cleanGrid = function cleanGrid() {
    var cells = Array.from(document.querySelectorAll(".".concat(id, ">.board>.cell")));
    cells.forEach(function (cell) {
      var i = cell.classList[1];
      cell.className = "cell ".concat(i);
      cell.innerHTML = '';
    });
  };
  var removeRotationIcon = function removeRotationIcon(startPoint) {
    var pos = startPoint[0] + startPoint[1] * 10;
    var rotationCell = document.querySelector(".".concat(id, ">.board>.cell").concat(pos));
    rotationCell.innerHTML = '';
  };
  var addRotationIcon = function addRotationIcon(startPoint) {
    var pos = startPoint[0] + startPoint[1] * 10;
    var rotationCell = document.querySelector(".".concat(id, ">.board>.cell").concat(pos));
    var rotation = document.createElement('span');
    rotation.classList.add('material-symbols-outlined');
    rotation.classList.add('rotation');
    rotation.textContent = 'replay';
    rotationCell.appendChild(rotation);
  };
  var showPosibleShipPosition = function showPosibleShipPosition(position, orientation, length) {
    cleanPosibleShipPosition();
    if (orientation == 'horizontal') {
      for (var i = 0; i < length; i++) {
        var cell = document.querySelector(".".concat(id, ">.board>.cell").concat(position + i));
        cell.classList.add('posible-ship');
      }
    } else {
      for (var _i = 0; _i < length; _i++) {
        var _cell = document.querySelector(".".concat(id, ">.board>.cell").concat(position + 10 * _i));
        _cell.classList.add('posible-ship');
      }
    }
  };
  var cleanPosibleShipPosition = function cleanPosibleShipPosition() {
    var cells = Array.from(document.querySelectorAll(".posible-ship"));
    cells.forEach(function (cell) {
      cell.classList.remove('posible-ship');
    });
  };
  var showShipsPosition = function showShipsPosition(gameBoard) {
    var ships = gameBoard.ships;
    for (var i = 0; i < 5; i++) {
      var ship = ships[i];
      var startPoint = ship.position;
      var orientation = ship.orientation;
      var length = ship.length;
      if (orientation == 'horizontal') {
        for (var j = 0; j < length; j++) {
          var position = startPoint[0] + j + startPoint[1] * 10;
          var shipCell = document.querySelector(".".concat(id, ">.board>.cell").concat(position));
          shipCell.classList.add('ship');
          shipCell.classList.add("ship-".concat(i + 1));
        }
      } else {
        for (var _j = 0; _j < length; _j++) {
          var _position = startPoint[0] + (startPoint[1] + _j) * 10;
          var _shipCell = document.querySelector(".".concat(id, ">.board>.cell").concat(_position));
          _shipCell.classList.toggle('ship');
          _shipCell.classList.add("ship-".concat(i + 1));
        }
      }
    }
  };
  var aliveShips = [1, 2, 3, 4, 5];
  var showShipsCondition = function showShipsCondition(gameBoard) {
    var ships = gameBoard.ships;
    aliveShips.forEach(function (label) {
      var outboardShip = document.querySelector(".".concat(id, ">.ships>.ship-").concat(label));
      if (ships[label - 1].isSunk()) {
        outboardShip.classList.add('sunk');
      } else {
        outboardShip.classList.remove('sunk');
      }
    });
  };
  function createCrossSvg() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100');
    var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '0');
    line1.setAttribute('y1', '0');
    line1.setAttribute('x2', '100');
    line1.setAttribute('y2', '100');
    line1.setAttribute('stroke', 'black');
    line1.setAttribute('stroke-width', '5');
    var line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '0');
    line2.setAttribute('y1', '100');
    line2.setAttribute('x2', '100');
    line2.setAttribute('y2', '0');
    line2.setAttribute('stroke', 'black');
    line2.setAttribute('stroke-width', '5');
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '10');
    circle.setAttribute('fill', 'black');
    svg.appendChild(line1);
    svg.appendChild(line2);
    svg.appendChild(circle);
    return svg;
  }
  var showAttackResult = function showAttackResult(cordinates, gameBoard) {
    var position = cordinates[0] + cordinates[1] * 10;
    var cell = document.querySelector(".".concat(id, ">.board>.cell").concat(position));
    if (gameBoard.board[cordinates[0]][cordinates[1]]) cell.classList.add('successful-attack');else cell.classList.add('failed-attack');
    cell.appendChild(createCrossSvg());
  };
  return {
    showShipsPosition: showShipsPosition,
    showShipsCondition: showShipsCondition,
    showAttackResult: showAttackResult,
    cleanGrid: cleanGrid,
    showPosibleShipPosition: showPosibleShipPosition,
    cleanPosibleShipPosition: cleanPosibleShipPosition,
    addRotationIcon: addRotationIcon,
    removeRotationIcon: removeRotationIcon
  };
}
function startGame(playerOne, playerTwo) {
  var display = document.querySelector('.display');
  var startBtn = document.querySelector('.start');
  var gameBoardOne = playerOne.gameBoard;
  var gameBoardTwo = playerTwo.gameBoard;
  var renderOne = Render('player');
  var renderTwo = Render('opponent');
  var cells = Array.from(document.querySelectorAll(".opponent>.board>.cell"));
  begin();
  startBtn.addEventListener('click', function (e) {
    if (e.target.textContent == 'Start') {
      changeShipsPosition(playerOne, true);
      e.target.textContent = 'Restart';
      cells.forEach(function (cell) {
        cell.addEventListener('click', start, {
          once: true
        });
      });
    } else {
      renderOne.cleanGrid();
      renderTwo.cleanGrid();
      e.target.textContent = 'Start';
      begin();
    }
  });
  function start(e) {
    var attackedPosition = Number(e.target.classList[1].replace(/cell/, ''));
    var c = attackedPosition % 10;
    var r = (attackedPosition - c) / 10;
    var playerOneAttackedCordinates = [c, r];
    var playerTwoAttackedCordinates = playerTwo.generateRandomAttackCoordinate(gameBoardOne);
    gameBoardTwo.receiveAttack(playerOneAttackedCordinates);
    renderTwo.showAttackResult(playerOneAttackedCordinates, gameBoardTwo);
    renderTwo.showShipsCondition(gameBoardTwo);
    gameBoardOne.receiveAttack(playerTwoAttackedCordinates);
    renderOne.showAttackResult(playerTwoAttackedCordinates, gameBoardOne);
    renderOne.showShipsCondition(gameBoardOne);
    endOfGame();
  }
  function announceWinner(winner) {
    var message = winner == 'computer' ? 'computer wins' : 'you win';
    display.textContent = message;
  }
  function removeEventListenersFromAllCells() {
    cells.forEach(function (cell) {
      cell.removeEventListener('click', start);
    });
  }
  function endOfGame() {
    if (gameBoardOne.areAllShipsSunk()) {
      removeEventListenersFromAllCells();
      announceWinner('computer');
    }
    if (gameBoardTwo.areAllShipsSunk()) {
      removeEventListenersFromAllCells();
      announceWinner('player');
    }
  }
  function begin() {
    removeEventListenersFromAllCells();
    gameBoardOne.placeShipsInRandomPlaces();
    gameBoardTwo.placeShipsInRandomPlaces();
    renderOne.showShipsPosition(gameBoardOne);
    renderOne.showShipsCondition(gameBoardOne);
    renderTwo.showShipsCondition(gameBoardTwo);
    changeShipsPosition(playerOne, false);
  }
}
function changeShipsPosition(player, done) {
  var display = document.querySelector('.display');
  display.textContent = 'Move your ships by click!';
  var renderP = Render('player');
  var gameBoard = player.gameBoard;
  var cells = Array.from(document.querySelectorAll('.player>.board>.cell'));
  var clicked = 0;
  var position;
  var c;
  var r;
  var shipObject;
  var startPoint;
  var orientation;
  function replacement(e) {
    var isShip = e.target.classList.contains('ship');
    var isRotation = e.target.classList.contains('rotation');
    if (clicked == 0) {
      if (isShip) {
        clicked = 1;
        position = e.target.classList[1].replace(/cell/, '');
        c = position % 10;
        r = (position - c) / 10;
        shipObject = gameBoard.board[c][r];
        startPoint = shipObject.position;
        orientation = shipObject.orientation;
        renderP.addRotationIcon(startPoint);
      }
    } else if (clicked == 1) {
      if (isRotation) {
        var changedOrientation;
        if (orientation == 'horizontal') changedOrientation = 'vertical';else changedOrientation = 'horizontal';
        if (gameBoard.isShipPlacable(shipObject, startPoint, changedOrientation)) {
          gameBoard.removeShipFromCordinates(shipObject);
          gameBoard.putShipInCordinates(shipObject, startPoint, changedOrientation);
          orientation = changedOrientation;
          renderP.cleanGrid();
          renderP.showShipsPosition(gameBoard);
          clicked = 0;
          renderP.removeRotationIcon(startPoint);
        }
      } else {
        var destination = e.target;
        var cellNumber = destination.classList[1].replace(/cell/, '');
        var column = cellNumber % 10;
        var row = (cellNumber - column) / 10;
        var cordinates = [column, row];
        if (gameBoard.isShipPlacable(shipObject, cordinates, orientation)) {
          renderP.removeRotationIcon(startPoint);
          gameBoard.putShipInCordinates(shipObject, cordinates, orientation);
          renderP.cleanPosibleShipPosition();
          clicked = 0;
        } else {
          gameBoard.putShipInCordinates(shipObject, startPoint, orientation);
        }
        renderP.cleanGrid();
        renderP.showShipsPosition(gameBoard);
      }
    }
  }
  if (done) {
    cells.forEach(function (cell) {
      var newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
    });
    display.textContent = 'Game is running, restart it whenever you want!';
  } else {
    cells.forEach(function (cell) {
      cell.addEventListener('click', replacement);
    });
    cells.forEach(function (cell) {
      cell.addEventListener('mouseover', function (event) {
        renderP.cleanPosibleShipPosition();
        if (clicked == 1) {
          gameBoard.removeShipFromCordinates(shipObject);
          var pos = Number(event.target.classList[1].replace(/cell/, ''));
          var column = pos % 10;
          var row = (pos - column) / 10;
          if (gameBoard.isShipPlacable(shipObject, [column, row], orientation)) {
            renderP.showPosibleShipPosition(pos, orientation, shipObject.length);
          }
        }
      });
    });
  }
}
module.exports = {
  Render: Render,
  startGame: startGame,
  changeShipsPosition: changeShipsPosition
};

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((module) => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function Ship(l) {
  var length = l;
  var hitted = 0;
  return {
    length: length,
    hitted: hitted,
    hit: function hit() {
      this.hitted = this.hitted + 1;
    },
    isSunk: function isSunk() {
      if (this.hitted >= this.length) return true;
      return false;
    }
  };
}
function GameBoard() {
  function setupBoard() {
    var board = [];
    for (var i = 0; i < 10; i++) {
      var row = [];
      for (var j = 0; j < 10; j++) {
        row.push(null);
      }
      board.push(row);
    }
    return board;
  }
  var board = setupBoard();
  return {
    placeShipInRandomPlace: function placeShipInRandomPlace(ship, gameBoard) {
      var r = Math.floor(Math.random() * 10);
      var c = Math.floor(Math.random() * 10);
      var o = Math.floor(Math.random() * 2);
      function convertBinaryToOrientation(b) {
        if (b == 1) return 'horizontal';
        return 'vertical';
      }
      while (!this.isShipPlacable(ship, [c, r], convertBinaryToOrientation(o))) {
        r = Math.floor(Math.random() * 10);
        c = Math.floor(Math.random() * 10);
        o = Math.floor(Math.random() * 2);
      }
      gameBoard.putShipInCordinates(ship, [c, r], convertBinaryToOrientation(o));
    },
    isShipPlacable: function isShipPlacable(ship, cordinates, orientation) {
      var l = ship.length;
      if (orientation === 'horizontal') {
        if (cordinates[0] + l - 1 < 10) {
          for (var i = 0; i < l; i++) {
            if (this.board[cordinates[0] + i][cordinates[1]] !== null) {
              return false;
            }
          }
          return true;
        } else return false;
      } else {
        if (cordinates[1] + l - 1 < 10) {
          for (var _i = 0; _i < l; _i++) {
            if (this.board[cordinates[0]][cordinates[1] + _i] !== null) {
              return false;
            }
          }
          return true;
        } else return false;
      }
    },
    ships: [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)],
    board: board,
    missedAttacks: [],
    attacked: [],
    putShipInCordinates: function putShipInCordinates(ship, cordinates, orientation) {
      var l = ship.length;
      if (this.isShipPlacable(ship, cordinates, orientation)) {
        ship.position = cordinates;
        ship.orientation = orientation;
        if (orientation === 'horizontal') {
          for (var i = 0; i < l; i++) {
            this.board[cordinates[0] + i][cordinates[1]] = ship;
          }
        } else {
          for (var _i2 = 0; _i2 < l; _i2++) {
            this.board[cordinates[0]][cordinates[1] + _i2] = ship;
          }
        }
      } else return this.isShipPlacable(ship, cordinates, orientation);
    },
    removeShipFromCordinates: function removeShipFromCordinates(ship) {
      var cordinates = ship.position;
      var orientation = ship.orientation;
      var l = ship.length;
      if (cordinates) {
        if (orientation === 'horizontal') {
          for (var i = 0; i < l; i++) {
            this.board[cordinates[0] + i][cordinates[1]] = null;
          }
        } else {
          for (var _i3 = 0; _i3 < l; _i3++) {
            this.board[cordinates[0]][cordinates[1] + _i3] = null;
          }
        }
      }
    },
    receiveAttack: function receiveAttack(cordinates) {
      var c = this.board[cordinates[0]][cordinates[1]];
      this.attacked.push(cordinates);
      if (c === null) {
        this.missedAttacks.push(cordinates);
      } else {
        c.hit();
      }
    },
    areAllShipsSunk: function areAllShipsSunk() {
      return this.ships.every(function (ship) {
        return ship.isSunk();
      });
    },
    placeShipsInRandomPlaces: function placeShipsInRandomPlaces() {
      var _this = this;
      this.board = setupBoard();
      var ships = this.ships;
      ships.forEach(function (ship) {
        ship.hitted = 0;
        _this.placeShipInRandomPlace(ship, _this);
      });
    }
  };
}
function Player() {
  var type = 'real';
  var gameBoard = GameBoard();
  function containArray(mainArray, array) {
    return mainArray.some(function (arr) {
      return JSON.stringify(arr) === JSON.stringify(array);
    });
  }
  function isAttackable(cordinates, gameBoard) {
    return !containArray(gameBoard.attacked, cordinates);
  }
  function generateRandomCoordinates() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
  function generateRandomAttackCoordinate(gameBoard) {
    var c = generateRandomCoordinates();
    while (!isAttackable(c, gameBoard)) {
      c = generateRandomCoordinates();
    }
    return c;
  }
  var successfullAttacks = [];
  function nextCordinate(coordinates, direction) {
    var _coordinates = _slicedToArray(coordinates, 2),
      x = _coordinates[0],
      y = _coordinates[1];
    switch (direction) {
      case 'up':
        y += 1;
        break;
      case 'down':
        y -= 1;
        break;
      case 'left':
        x -= 1;
        break;
      default:
        x += 1;
    }
    return [x, y];
  }
  function generateNextAttack(gameBoard) {
    if (successfullAttacks.length == 1) {
      console.log(successfullAttacks);
      var directions = ['up', 'down', 'right', 'left'];
      var nextDirectionIndex = Math.floor(Math.random() * 4);
      while (!isAttackable(nextCordinate(successfullAttacks[0], directions[nextDirectionIndex]), gameBoard)) {
        nextDirectionIndex = Math.floor(Math.random() * 4);
      }
      return nextCordinate(successfullAttacks[0], directions[nextDirectionIndex]);
    }
    if (successfullAttacks.length >= 2) {
      var d1 = successfullAttacks.slice(-2)[1][0] - successfullAttacks.slice(-2)[0][0];
      var d2 = successfullAttacks.slice(-2)[1][1] - successfullAttacks.slice(-2)[0][1];
      var next = [successfullAttacks.slice(-2)[1][0] + d1, successfullAttacks.slice(-2)[1][1] + d2];
      if (isAttackable(next, gameBoard)) return next;
      next = [successfullAttacks[0][0] - d1, successfullAttacks[0][1] - d2];
      if (isAttackable(next, gameBoard)) return next;
      return generateRandomAttack(gameBoard);
    }
  }
  return {
    type: type,
    gameBoard: gameBoard,
    generateRandomAttackCoordinate: generateRandomAttackCoordinate
  };
}
module.exports = {
  Ship: Ship,
  GameBoard: GameBoard,
  Player: Player
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
var _require = __webpack_require__(/*! ./logic.js */ "./src/logic.js"),
  Player = _require.Player;
var _require2 = __webpack_require__(/*! ./dom.js */ "./src/dom.js"),
  Render = _require2.Render,
  startGame = _require2.startGame,
  changeShipsPosition = _require2.changeShipsPosition;
var player = Player();
var opponent = Player();
opponent.type = 'computer';
startGame(player, opponent);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBTTtBQUNkLElBQUErQixTQUFBLEdBQW1ERCxtQkFBTyxDQUFDLDhCQUFVLENBQUM7RUFBOURoSyxNQUFNLEdBQUFpSyxTQUFBLENBQU5qSyxNQUFNO0VBQUV1RCxTQUFTLEdBQUEwRyxTQUFBLENBQVQxRyxTQUFTO0VBQUVhLG1CQUFtQixHQUFBNkYsU0FBQSxDQUFuQjdGLG1CQUFtQjtBQUU5QyxJQUFNb0IsTUFBTSxHQUFHMEMsTUFBTSxDQUFDLENBQUM7QUFDdkIsSUFBTWdDLFFBQVEsR0FBR2hDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCZ0MsUUFBUSxDQUFDL0IsSUFBSSxHQUFHLFVBQVU7QUFDMUI1RSxTQUFTLENBQUNpQyxNQUFNLEVBQUUwRSxRQUFRLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUmVuZGVyKGlkZW50aXR5KSB7XG4gIGNvbnN0IGlkID0gaWRlbnRpdHlcbiAgY29uc3QgY2xlYW5HcmlkID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtpZH0+LmJvYXJkPi5jZWxsYCkpXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY29uc3QgaSA9IGNlbGwuY2xhc3NMaXN0WzFdXG4gICAgICBjZWxsLmNsYXNzTmFtZSA9IGBjZWxsICR7aX1gXG4gICAgICBjZWxsLmlubmVySFRNTCA9ICcnXG4gICAgfSlcbiAgfVxuICBjb25zdCByZW1vdmVSb3RhdGlvbkljb24gPSBmdW5jdGlvbiAoc3RhcnRQb2ludCkge1xuICAgIGNvbnN0IHBvcyA9IHN0YXJ0UG9pbnRbMF0gKyBzdGFydFBvaW50WzFdICogMTBcbiAgICBjb25zdCByb3RhdGlvbkNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtpZH0+LmJvYXJkPi5jZWxsJHtwb3N9YClcbiAgICByb3RhdGlvbkNlbGwuaW5uZXJIVE1MID0gJydcbiAgfVxuICBjb25zdCBhZGRSb3RhdGlvbkljb24gPSBmdW5jdGlvbiAoc3RhcnRQb2ludCkge1xuICAgIGNvbnN0IHBvcyA9IHN0YXJ0UG9pbnRbMF0gKyBzdGFydFBvaW50WzFdICogMTBcbiAgICBjb25zdCByb3RhdGlvbkNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtpZH0+LmJvYXJkPi5jZWxsJHtwb3N9YClcbiAgICBjb25zdCByb3RhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHJvdGF0aW9uLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKVxuICAgIHJvdGF0aW9uLmNsYXNzTGlzdC5hZGQoJ3JvdGF0aW9uJylcbiAgICByb3RhdGlvbi50ZXh0Q29udGVudCA9ICdyZXBsYXknXG4gICAgcm90YXRpb25DZWxsLmFwcGVuZENoaWxkKHJvdGF0aW9uKVxuICB9XG4gIGNvbnN0IHNob3dQb3NpYmxlU2hpcFBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc2l0aW9uLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSB7XG4gICAgY2xlYW5Qb3NpYmxlU2hpcFBvc2l0aW9uKClcbiAgICBpZiAob3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAuJHtpZH0+LmJvYXJkPi5jZWxsJHtwb3NpdGlvbiArIGl9YFxuICAgICAgICApXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgncG9zaWJsZS1zaGlwJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLiR7aWR9Pi5ib2FyZD4uY2VsbCR7cG9zaXRpb24gKyAxMCAqIGl9YFxuICAgICAgICApXG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgncG9zaWJsZS1zaGlwJylcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc3QgY2xlYW5Qb3NpYmxlU2hpcFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucG9zaWJsZS1zaGlwYCkpXG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdwb3NpYmxlLXNoaXAnKVxuICAgIH0pXG4gIH1cbiAgY29uc3Qgc2hvd1NoaXBzUG9zaXRpb24gPSBmdW5jdGlvbiAoZ2FtZUJvYXJkKSB7XG4gICAgY29uc3Qgc2hpcHMgPSBnYW1lQm9hcmQuc2hpcHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgY29uc3Qgc2hpcCA9IHNoaXBzW2ldXG4gICAgICBjb25zdCBzdGFydFBvaW50ID0gc2hpcC5wb3NpdGlvblxuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBzaGlwLm9yaWVudGF0aW9uXG4gICAgICBjb25zdCBsZW5ndGggPSBzaGlwLmxlbmd0aFxuICAgICAgaWYgKG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzdGFydFBvaW50WzBdICsgaiArIHN0YXJ0UG9pbnRbMV0gKiAxMFxuICAgICAgICAgIGNvbnN0IHNoaXBDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGAuJHtpZH0+LmJvYXJkPi5jZWxsJHtwb3NpdGlvbn1gXG4gICAgICAgICAgKVxuICAgICAgICAgIHNoaXBDZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxuICAgICAgICAgIHNoaXBDZWxsLmNsYXNzTGlzdC5hZGQoYHNoaXAtJHtpICsgMX1gKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzdGFydFBvaW50WzBdICsgKHN0YXJ0UG9pbnRbMV0gKyBqKSAqIDEwXG4gICAgICAgICAgY29uc3Qgc2hpcENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYC4ke2lkfT4uYm9hcmQ+LmNlbGwke3Bvc2l0aW9ufWBcbiAgICAgICAgICApXG4gICAgICAgICAgc2hpcENlbGwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hpcCcpXG4gICAgICAgICAgc2hpcENlbGwuY2xhc3NMaXN0LmFkZChgc2hpcC0ke2kgKyAxfWApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbGV0IGFsaXZlU2hpcHMgPSBbMSwgMiwgMywgNCwgNV1cbiAgY29uc3Qgc2hvd1NoaXBzQ29uZGl0aW9uID0gZnVuY3Rpb24gKGdhbWVCb2FyZCkge1xuICAgIGNvbnN0IHNoaXBzID0gZ2FtZUJvYXJkLnNoaXBzXG4gICAgYWxpdmVTaGlwcy5mb3JFYWNoKChsYWJlbCkgPT4ge1xuICAgICAgY29uc3Qgb3V0Ym9hcmRTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYC4ke2lkfT4uc2hpcHM+LnNoaXAtJHtsYWJlbH1gXG4gICAgICApXG4gICAgICBpZiAoc2hpcHNbbGFiZWwgLSAxXS5pc1N1bmsoKSkge1xuICAgICAgICBvdXRib2FyZFNoaXAuY2xhc3NMaXN0LmFkZCgnc3VuaycpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXRib2FyZFNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc3VuaycpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVDcm9zc1N2ZygpIHtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpXG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKVxuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKVxuICAgIGNvbnN0IGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdsaW5lJylcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoJ3gxJywgJzAnKVxuICAgIGxpbmUxLnNldEF0dHJpYnV0ZSgneTEnLCAnMCcpXG4gICAgbGluZTEuc2V0QXR0cmlidXRlKCd4MicsICcxMDAnKVxuICAgIGxpbmUxLnNldEF0dHJpYnV0ZSgneTInLCAnMTAwJylcbiAgICBsaW5lMS5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdibGFjaycpXG4gICAgbGluZTEuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAnNScpXG4gICAgY29uc3QgbGluZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2xpbmUnKVxuICAgIGxpbmUyLnNldEF0dHJpYnV0ZSgneDEnLCAnMCcpXG4gICAgbGluZTIuc2V0QXR0cmlidXRlKCd5MScsICcxMDAnKVxuICAgIGxpbmUyLnNldEF0dHJpYnV0ZSgneDInLCAnMTAwJylcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoJ3kyJywgJzAnKVxuICAgIGxpbmUyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ2JsYWNrJylcbiAgICBsaW5lMi5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICc1JylcbiAgICBjb25zdCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgJ2NpcmNsZSdcbiAgICApXG4gICAgY2lyY2xlLnNldEF0dHJpYnV0ZSgnY3gnLCAnNTAnKVxuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGUoJ2N5JywgJzUwJylcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKCdyJywgJzEwJylcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlKCdmaWxsJywgJ2JsYWNrJylcbiAgICBzdmcuYXBwZW5kQ2hpbGQobGluZTEpXG4gICAgc3ZnLmFwcGVuZENoaWxkKGxpbmUyKVxuICAgIHN2Zy5hcHBlbmRDaGlsZChjaXJjbGUpXG4gICAgcmV0dXJuIHN2Z1xuICB9XG4gIGNvbnN0IHNob3dBdHRhY2tSZXN1bHQgPSBmdW5jdGlvbiAoY29yZGluYXRlcywgZ2FtZUJvYXJkKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSBjb3JkaW5hdGVzWzBdICsgY29yZGluYXRlc1sxXSAqIDEwXG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2lkfT4uYm9hcmQ+LmNlbGwke3Bvc2l0aW9ufWApXG4gICAgaWYgKGdhbWVCb2FyZC5ib2FyZFtjb3JkaW5hdGVzWzBdXVtjb3JkaW5hdGVzWzFdXSlcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc3VjY2Vzc2Z1bC1hdHRhY2snKVxuICAgIGVsc2UgY2VsbC5jbGFzc0xpc3QuYWRkKCdmYWlsZWQtYXR0YWNrJylcbiAgICBjZWxsLmFwcGVuZENoaWxkKGNyZWF0ZUNyb3NzU3ZnKCkpXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBzaG93U2hpcHNQb3NpdGlvbixcbiAgICBzaG93U2hpcHNDb25kaXRpb24sXG4gICAgc2hvd0F0dGFja1Jlc3VsdCxcbiAgICBjbGVhbkdyaWQsXG4gICAgc2hvd1Bvc2libGVTaGlwUG9zaXRpb24sXG4gICAgY2xlYW5Qb3NpYmxlU2hpcFBvc2l0aW9uLFxuICAgIGFkZFJvdGF0aW9uSWNvbixcbiAgICByZW1vdmVSb3RhdGlvbkljb25cbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXNwbGF5JylcbiAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKVxuICBjb25zdCBnYW1lQm9hcmRPbmUgPSBwbGF5ZXJPbmUuZ2FtZUJvYXJkXG4gIGNvbnN0IGdhbWVCb2FyZFR3byA9IHBsYXllclR3by5nYW1lQm9hcmRcbiAgY29uc3QgcmVuZGVyT25lID0gUmVuZGVyKCdwbGF5ZXInKVxuICBjb25zdCByZW5kZXJUd28gPSBSZW5kZXIoJ29wcG9uZW50JylcbiAgY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5vcHBvbmVudD4uYm9hcmQ+LmNlbGxgKSlcbiAgYmVnaW4oKVxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ID09ICdTdGFydCcpIHtcbiAgICAgIGNoYW5nZVNoaXBzUG9zaXRpb24ocGxheWVyT25lLCB0cnVlKVxuICAgICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSAnUmVzdGFydCdcbiAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0LCB7IG9uY2U6IHRydWUgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlck9uZS5jbGVhbkdyaWQoKVxuICAgICAgcmVuZGVyVHdvLmNsZWFuR3JpZCgpXG4gICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9ICdTdGFydCdcbiAgICAgIGJlZ2luKClcbiAgICB9XG4gIH0pXG4gIGZ1bmN0aW9uIHN0YXJ0KGUpIHtcbiAgICBjb25zdCBhdHRhY2tlZFBvc2l0aW9uID0gTnVtYmVyKGUudGFyZ2V0LmNsYXNzTGlzdFsxXS5yZXBsYWNlKC9jZWxsLywgJycpKVxuICAgIGNvbnN0IGMgPSBhdHRhY2tlZFBvc2l0aW9uICUgMTBcbiAgICBjb25zdCByID0gKGF0dGFja2VkUG9zaXRpb24gLSBjKSAvIDEwXG4gICAgY29uc3QgcGxheWVyT25lQXR0YWNrZWRDb3JkaW5hdGVzID0gW2MsIHJdXG4gICAgY29uc3QgcGxheWVyVHdvQXR0YWNrZWRDb3JkaW5hdGVzID1cbiAgICAgIHBsYXllclR3by5nZW5lcmF0ZVJhbmRvbUF0dGFja0Nvb3JkaW5hdGUoZ2FtZUJvYXJkT25lKVxuICAgIGdhbWVCb2FyZFR3by5yZWNlaXZlQXR0YWNrKHBsYXllck9uZUF0dGFja2VkQ29yZGluYXRlcylcbiAgICByZW5kZXJUd28uc2hvd0F0dGFja1Jlc3VsdChwbGF5ZXJPbmVBdHRhY2tlZENvcmRpbmF0ZXMsIGdhbWVCb2FyZFR3bylcbiAgICByZW5kZXJUd28uc2hvd1NoaXBzQ29uZGl0aW9uKGdhbWVCb2FyZFR3bylcbiAgICBnYW1lQm9hcmRPbmUucmVjZWl2ZUF0dGFjayhwbGF5ZXJUd29BdHRhY2tlZENvcmRpbmF0ZXMpXG4gICAgcmVuZGVyT25lLnNob3dBdHRhY2tSZXN1bHQocGxheWVyVHdvQXR0YWNrZWRDb3JkaW5hdGVzLCBnYW1lQm9hcmRPbmUpXG4gICAgcmVuZGVyT25lLnNob3dTaGlwc0NvbmRpdGlvbihnYW1lQm9hcmRPbmUpXG4gICAgZW5kT2ZHYW1lKClcbiAgfVxuICBmdW5jdGlvbiBhbm5vdW5jZVdpbm5lcih3aW5uZXIpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gd2lubmVyID09ICdjb21wdXRlcicgPyAnY29tcHV0ZXIgd2lucycgOiAneW91IHdpbidcbiAgICBkaXNwbGF5LnRleHRDb250ZW50ID0gbWVzc2FnZVxuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzRnJvbUFsbENlbGxzKCkge1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydClcbiAgICB9KVxuICB9XG4gIGZ1bmN0aW9uIGVuZE9mR2FtZSgpIHtcbiAgICBpZiAoZ2FtZUJvYXJkT25lLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyc0Zyb21BbGxDZWxscygpXG4gICAgICBhbm5vdW5jZVdpbm5lcignY29tcHV0ZXInKVxuICAgIH1cbiAgICBpZiAoZ2FtZUJvYXJkVHdvLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyc0Zyb21BbGxDZWxscygpXG4gICAgICBhbm5vdW5jZVdpbm5lcigncGxheWVyJylcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gYmVnaW4oKSB7XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnNGcm9tQWxsQ2VsbHMoKVxuICAgIGdhbWVCb2FyZE9uZS5wbGFjZVNoaXBzSW5SYW5kb21QbGFjZXMoKVxuICAgIGdhbWVCb2FyZFR3by5wbGFjZVNoaXBzSW5SYW5kb21QbGFjZXMoKVxuICAgIHJlbmRlck9uZS5zaG93U2hpcHNQb3NpdGlvbihnYW1lQm9hcmRPbmUpXG4gICAgcmVuZGVyT25lLnNob3dTaGlwc0NvbmRpdGlvbihnYW1lQm9hcmRPbmUpXG4gICAgcmVuZGVyVHdvLnNob3dTaGlwc0NvbmRpdGlvbihnYW1lQm9hcmRUd28pXG4gICAgY2hhbmdlU2hpcHNQb3NpdGlvbihwbGF5ZXJPbmUsIGZhbHNlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVNoaXBzUG9zaXRpb24ocGxheWVyLCBkb25lKSB7XG4gIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGlzcGxheScpXG4gIGRpc3BsYXkudGV4dENvbnRlbnQgPSAnTW92ZSB5b3VyIHNoaXBzIGJ5IGNsaWNrISdcbiAgY29uc3QgcmVuZGVyUCA9IFJlbmRlcigncGxheWVyJylcbiAgY29uc3QgZ2FtZUJvYXJkID0gcGxheWVyLmdhbWVCb2FyZFxuICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcj4uYm9hcmQ+LmNlbGwnKSlcbiAgbGV0IGNsaWNrZWQgPSAwXG4gIGxldCBwb3NpdGlvblxuICBsZXQgY1xuICBsZXQgclxuICBsZXQgc2hpcE9iamVjdFxuICBsZXQgc3RhcnRQb2ludFxuICBsZXQgb3JpZW50YXRpb25cbiAgZnVuY3Rpb24gcmVwbGFjZW1lbnQoZSkge1xuICAgIGNvbnN0IGlzU2hpcCA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpXG4gICAgY29uc3QgaXNSb3RhdGlvbiA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncm90YXRpb24nKVxuICAgIGlmIChjbGlja2VkID09IDApIHtcbiAgICAgIGlmIChpc1NoaXApIHtcbiAgICAgICAgY2xpY2tlZCA9IDFcbiAgICAgICAgcG9zaXRpb24gPSBlLnRhcmdldC5jbGFzc0xpc3RbMV0ucmVwbGFjZSgvY2VsbC8sICcnKVxuICAgICAgICBjID0gcG9zaXRpb24gJSAxMFxuICAgICAgICByID0gKHBvc2l0aW9uIC0gYykgLyAxMFxuICAgICAgICBzaGlwT2JqZWN0ID0gZ2FtZUJvYXJkLmJvYXJkW2NdW3JdXG4gICAgICAgIHN0YXJ0UG9pbnQgPSBzaGlwT2JqZWN0LnBvc2l0aW9uXG4gICAgICAgIG9yaWVudGF0aW9uID0gc2hpcE9iamVjdC5vcmllbnRhdGlvblxuICAgICAgICByZW5kZXJQLmFkZFJvdGF0aW9uSWNvbihzdGFydFBvaW50KVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xpY2tlZCA9PSAxKSB7XG4gICAgICBpZiAoaXNSb3RhdGlvbikge1xuICAgICAgICBsZXQgY2hhbmdlZE9yaWVudGF0aW9uXG4gICAgICAgIGlmIChvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcpIGNoYW5nZWRPcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCdcbiAgICAgICAgZWxzZSBjaGFuZ2VkT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCdcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGdhbWVCb2FyZC5pc1NoaXBQbGFjYWJsZShzaGlwT2JqZWN0LCBzdGFydFBvaW50LCBjaGFuZ2VkT3JpZW50YXRpb24pXG4gICAgICAgICkge1xuICAgICAgICAgIGdhbWVCb2FyZC5yZW1vdmVTaGlwRnJvbUNvcmRpbmF0ZXMoc2hpcE9iamVjdClcbiAgICAgICAgICBnYW1lQm9hcmQucHV0U2hpcEluQ29yZGluYXRlcyhcbiAgICAgICAgICAgIHNoaXBPYmplY3QsXG4gICAgICAgICAgICBzdGFydFBvaW50LFxuICAgICAgICAgICAgY2hhbmdlZE9yaWVudGF0aW9uXG4gICAgICAgICAgKVxuICAgICAgICAgIG9yaWVudGF0aW9uID0gY2hhbmdlZE9yaWVudGF0aW9uXG4gICAgICAgICAgcmVuZGVyUC5jbGVhbkdyaWQoKVxuICAgICAgICAgIHJlbmRlclAuc2hvd1NoaXBzUG9zaXRpb24oZ2FtZUJvYXJkKVxuICAgICAgICAgIGNsaWNrZWQgPSAwXG4gICAgICAgICAgcmVuZGVyUC5yZW1vdmVSb3RhdGlvbkljb24oc3RhcnRQb2ludClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBlLnRhcmdldFxuICAgICAgICBjb25zdCBjZWxsTnVtYmVyID0gZGVzdGluYXRpb24uY2xhc3NMaXN0WzFdLnJlcGxhY2UoL2NlbGwvLCAnJylcbiAgICAgICAgY29uc3QgY29sdW1uID0gY2VsbE51bWJlciAlIDEwXG4gICAgICAgIGNvbnN0IHJvdyA9IChjZWxsTnVtYmVyIC0gY29sdW1uKSAvIDEwXG4gICAgICAgIGNvbnN0IGNvcmRpbmF0ZXMgPSBbY29sdW1uLCByb3ddXG4gICAgICAgIGlmIChnYW1lQm9hcmQuaXNTaGlwUGxhY2FibGUoc2hpcE9iamVjdCwgY29yZGluYXRlcywgb3JpZW50YXRpb24pKSB7XG4gICAgICAgICAgcmVuZGVyUC5yZW1vdmVSb3RhdGlvbkljb24oc3RhcnRQb2ludClcbiAgICAgICAgICBnYW1lQm9hcmQucHV0U2hpcEluQ29yZGluYXRlcyhzaGlwT2JqZWN0LCBjb3JkaW5hdGVzLCBvcmllbnRhdGlvbilcbiAgICAgICAgICByZW5kZXJQLmNsZWFuUG9zaWJsZVNoaXBQb3NpdGlvbigpXG4gICAgICAgICAgY2xpY2tlZCA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnYW1lQm9hcmQucHV0U2hpcEluQ29yZGluYXRlcyhzaGlwT2JqZWN0LCBzdGFydFBvaW50LCBvcmllbnRhdGlvbilcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJQLmNsZWFuR3JpZCgpXG4gICAgICAgIHJlbmRlclAuc2hvd1NoaXBzUG9zaXRpb24oZ2FtZUJvYXJkKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZG9uZSkge1xuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGxldCBuZXdDZWxsID0gY2VsbC5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgIGNlbGwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Q2VsbCwgY2VsbClcbiAgICB9KVxuICAgIGRpc3BsYXkudGV4dENvbnRlbnQgPSAnR2FtZSBpcyBydW5uaW5nLCByZXN0YXJ0IGl0IHdoZW5ldmVyIHlvdSB3YW50ISdcbiAgfSBlbHNlIHtcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVwbGFjZW1lbnQpXG4gICAgfSlcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgICByZW5kZXJQLmNsZWFuUG9zaWJsZVNoaXBQb3NpdGlvbigpXG4gICAgICAgIGlmIChjbGlja2VkID09IDEpIHtcbiAgICAgICAgICBnYW1lQm9hcmQucmVtb3ZlU2hpcEZyb21Db3JkaW5hdGVzKHNoaXBPYmplY3QpXG4gICAgICAgICAgY29uc3QgcG9zID0gTnVtYmVyKGV2ZW50LnRhcmdldC5jbGFzc0xpc3RbMV0ucmVwbGFjZSgvY2VsbC8sICcnKSlcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBwb3MgJSAxMFxuICAgICAgICAgIGNvbnN0IHJvdyA9IChwb3MgLSBjb2x1bW4pIC8gMTBcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBnYW1lQm9hcmQuaXNTaGlwUGxhY2FibGUoc2hpcE9iamVjdCwgW2NvbHVtbiwgcm93XSwgb3JpZW50YXRpb24pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZW5kZXJQLnNob3dQb3NpYmxlU2hpcFBvc2l0aW9uKHBvcywgb3JpZW50YXRpb24sIHNoaXBPYmplY3QubGVuZ3RoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBSZW5kZXIsIHN0YXJ0R2FtZSwgY2hhbmdlU2hpcHNQb3NpdGlvbiB9XG4iLCJmdW5jdGlvbiBTaGlwKGwpIHtcbiAgbGV0IGxlbmd0aCA9IGxcbiAgbGV0IGhpdHRlZCA9IDBcbiAgcmV0dXJuIHtcbiAgICBsZW5ndGg6IGxlbmd0aCxcbiAgICBoaXR0ZWQ6IGhpdHRlZCxcbiAgICBoaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuaGl0dGVkID0gdGhpcy5oaXR0ZWQgKyAxXG4gICAgfSxcbiAgICBpc1N1bms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmhpdHRlZCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWVcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBHYW1lQm9hcmQoKSB7XG4gIGZ1bmN0aW9uIHNldHVwQm9hcmQoKSB7XG4gICAgbGV0IGJvYXJkID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGxldCByb3cgPSBbXVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKG51bGwpXG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHJvdylcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkXG4gIH1cbiAgbGV0IGJvYXJkID0gc2V0dXBCb2FyZCgpXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwSW5SYW5kb21QbGFjZTogZnVuY3Rpb24gKHNoaXAsIGdhbWVCb2FyZCkge1xuICAgICAgbGV0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICAgIGxldCBjID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICBsZXQgbyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXG4gICAgICBmdW5jdGlvbiBjb252ZXJ0QmluYXJ5VG9PcmllbnRhdGlvbihiKSB7XG4gICAgICAgIGlmIChiID09IDEpIHJldHVybiAnaG9yaXpvbnRhbCdcbiAgICAgICAgcmV0dXJuICd2ZXJ0aWNhbCdcbiAgICAgIH1cbiAgICAgIHdoaWxlIChcbiAgICAgICAgIXRoaXMuaXNTaGlwUGxhY2FibGUoc2hpcCwgW2MsIHJdLCBjb252ZXJ0QmluYXJ5VG9PcmllbnRhdGlvbihvKSlcbiAgICAgICkge1xuICAgICAgICByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgICAgIGMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICAgICAgbyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXG4gICAgICB9XG4gICAgICBnYW1lQm9hcmQucHV0U2hpcEluQ29yZGluYXRlcyhzaGlwLCBbYywgcl0sIGNvbnZlcnRCaW5hcnlUb09yaWVudGF0aW9uKG8pKVxuICAgIH0sXG4gICAgaXNTaGlwUGxhY2FibGU6IGZ1bmN0aW9uIChzaGlwLCBjb3JkaW5hdGVzLCBvcmllbnRhdGlvbikge1xuICAgICAgY29uc3QgbCA9IHNoaXAubGVuZ3RoXG4gICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBpZiAoY29yZGluYXRlc1swXSArIGwgLSAxIDwgMTApIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbY29yZGluYXRlc1swXSArIGldW2NvcmRpbmF0ZXNbMV1dICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29yZGluYXRlc1sxXSArIGwgLSAxIDwgMTApIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmRbY29yZGluYXRlc1swXV1bY29yZGluYXRlc1sxXSArIGldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSxcbiAgICBzaGlwczogW1NoaXAoMiksIFNoaXAoMyksIFNoaXAoMyksIFNoaXAoNCksIFNoaXAoNSldLFxuICAgIGJvYXJkOiBib2FyZCxcbiAgICBtaXNzZWRBdHRhY2tzOiBbXSxcbiAgICBhdHRhY2tlZDogW10sXG4gICAgcHV0U2hpcEluQ29yZGluYXRlczogZnVuY3Rpb24gKHNoaXAsIGNvcmRpbmF0ZXMsIG9yaWVudGF0aW9uKSB7XG4gICAgICBjb25zdCBsID0gc2hpcC5sZW5ndGhcbiAgICAgIGlmICh0aGlzLmlzU2hpcFBsYWNhYmxlKHNoaXAsIGNvcmRpbmF0ZXMsIG9yaWVudGF0aW9uKSkge1xuICAgICAgICBzaGlwLnBvc2l0aW9uID0gY29yZGluYXRlc1xuICAgICAgICBzaGlwLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb25cbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtjb3JkaW5hdGVzWzBdICsgaV1bY29yZGluYXRlc1sxXV0gPSBzaGlwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW2NvcmRpbmF0ZXNbMF1dW2NvcmRpbmF0ZXNbMV0gKyBpXSA9IHNoaXBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSByZXR1cm4gdGhpcy5pc1NoaXBQbGFjYWJsZShzaGlwLCBjb3JkaW5hdGVzLCBvcmllbnRhdGlvbilcbiAgICB9LFxuICAgIHJlbW92ZVNoaXBGcm9tQ29yZGluYXRlczogZnVuY3Rpb24gKHNoaXApIHtcbiAgICAgIGNvbnN0IGNvcmRpbmF0ZXMgPSBzaGlwLnBvc2l0aW9uXG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IHNoaXAub3JpZW50YXRpb25cbiAgICAgIGNvbnN0IGwgPSBzaGlwLmxlbmd0aFxuICAgICAgaWYgKGNvcmRpbmF0ZXMpIHtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ib2FyZFtjb3JkaW5hdGVzWzBdICsgaV1bY29yZGluYXRlc1sxXV0gPSBudWxsXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkW2NvcmRpbmF0ZXNbMF1dW2NvcmRpbmF0ZXNbMV0gKyBpXSA9IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHJlY2VpdmVBdHRhY2s6IGZ1bmN0aW9uIChjb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5ib2FyZFtjb3JkaW5hdGVzWzBdXVtjb3JkaW5hdGVzWzFdXVxuICAgICAgdGhpcy5hdHRhY2tlZC5wdXNoKGNvcmRpbmF0ZXMpXG4gICAgICBpZiAoYyA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChjb3JkaW5hdGVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYy5oaXQoKVxuICAgICAgfVxuICAgIH0sXG4gICAgYXJlQWxsU2hpcHNTdW5rOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSlcbiAgICB9LFxuICAgIHBsYWNlU2hpcHNJblJhbmRvbVBsYWNlczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5ib2FyZCA9IHNldHVwQm9hcmQoKVxuICAgICAgbGV0IHNoaXBzID0gdGhpcy5zaGlwc1xuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLmhpdHRlZCA9IDBcbiAgICAgICAgdGhpcy5wbGFjZVNoaXBJblJhbmRvbVBsYWNlKHNoaXAsIHRoaXMpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG4gIGNvbnN0IHR5cGUgPSAncmVhbCdcbiAgY29uc3QgZ2FtZUJvYXJkID0gR2FtZUJvYXJkKClcbiAgZnVuY3Rpb24gY29udGFpbkFycmF5KG1haW5BcnJheSwgYXJyYXkpIHtcbiAgICByZXR1cm4gbWFpbkFycmF5LnNvbWUoXG4gICAgICAoYXJyKSA9PiBKU09OLnN0cmluZ2lmeShhcnIpID09PSBKU09OLnN0cmluZ2lmeShhcnJheSlcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBpc0F0dGFja2FibGUoY29yZGluYXRlcywgZ2FtZUJvYXJkKSB7XG4gICAgcmV0dXJuICFjb250YWluQXJyYXkoZ2FtZUJvYXJkLmF0dGFja2VkLCBjb3JkaW5hdGVzKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpIHtcbiAgICByZXR1cm4gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXVxuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVSYW5kb21BdHRhY2tDb29yZGluYXRlKGdhbWVCb2FyZCkge1xuICAgIGxldCBjID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlcygpXG4gICAgd2hpbGUgKCFpc0F0dGFja2FibGUoYywgZ2FtZUJvYXJkKSkge1xuICAgICAgYyA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZXMoKVxuICAgIH1cbiAgICByZXR1cm4gY1xuICB9XG4gIGxldCBzdWNjZXNzZnVsbEF0dGFja3MgPSBbXVxuXG4gIGZ1bmN0aW9uIG5leHRDb3JkaW5hdGUoY29vcmRpbmF0ZXMsIGRpcmVjdGlvbikge1xuICAgIGxldCBbeCwgeV0gPSBjb29yZGluYXRlc1xuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgeSArPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgeSAtPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgeCAtPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB4ICs9IDFcbiAgICB9XG5cbiAgICByZXR1cm4gW3gsIHldXG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZU5leHRBdHRhY2soZ2FtZUJvYXJkKSB7XG4gICAgaWYgKHN1Y2Nlc3NmdWxsQXR0YWNrcy5sZW5ndGggPT0gMSkge1xuICAgICAgY29uc29sZS5sb2coc3VjY2Vzc2Z1bGxBdHRhY2tzKVxuICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IFsndXAnLCAnZG93bicsICdyaWdodCcsICdsZWZ0J11cbiAgICAgIGxldCBuZXh0RGlyZWN0aW9uSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KVxuICAgICAgd2hpbGUgKFxuICAgICAgICAhaXNBdHRhY2thYmxlKFxuICAgICAgICAgIG5leHRDb3JkaW5hdGUoc3VjY2Vzc2Z1bGxBdHRhY2tzWzBdLCBkaXJlY3Rpb25zW25leHREaXJlY3Rpb25JbmRleF0pLFxuICAgICAgICAgIGdhbWVCb2FyZFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgbmV4dERpcmVjdGlvbkluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNClcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0Q29yZGluYXRlKFxuICAgICAgICBzdWNjZXNzZnVsbEF0dGFja3NbMF0sXG4gICAgICAgIGRpcmVjdGlvbnNbbmV4dERpcmVjdGlvbkluZGV4XVxuICAgICAgKVxuICAgIH1cbiAgICBpZiAoc3VjY2Vzc2Z1bGxBdHRhY2tzLmxlbmd0aCA+PSAyKSB7XG4gICAgICBjb25zdCBkMSA9XG4gICAgICAgIHN1Y2Nlc3NmdWxsQXR0YWNrcy5zbGljZSgtMilbMV1bMF0gLSBzdWNjZXNzZnVsbEF0dGFja3Muc2xpY2UoLTIpWzBdWzBdXG4gICAgICBjb25zdCBkMiA9XG4gICAgICAgIHN1Y2Nlc3NmdWxsQXR0YWNrcy5zbGljZSgtMilbMV1bMV0gLSBzdWNjZXNzZnVsbEF0dGFja3Muc2xpY2UoLTIpWzBdWzFdXG4gICAgICBsZXQgbmV4dCA9IFtcbiAgICAgICAgc3VjY2Vzc2Z1bGxBdHRhY2tzLnNsaWNlKC0yKVsxXVswXSArIGQxLFxuICAgICAgICBzdWNjZXNzZnVsbEF0dGFja3Muc2xpY2UoLTIpWzFdWzFdICsgZDJcbiAgICAgIF1cbiAgICAgIGlmIChpc0F0dGFja2FibGUobmV4dCwgZ2FtZUJvYXJkKSkgcmV0dXJuIG5leHRcbiAgICAgIG5leHQgPSBbc3VjY2Vzc2Z1bGxBdHRhY2tzWzBdWzBdIC0gZDEsIHN1Y2Nlc3NmdWxsQXR0YWNrc1swXVsxXSAtIGQyXVxuICAgICAgaWYgKGlzQXR0YWNrYWJsZShuZXh0LCBnYW1lQm9hcmQpKSByZXR1cm4gbmV4dFxuICAgICAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tQXR0YWNrKGdhbWVCb2FyZClcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyB0eXBlLCBnYW1lQm9hcmQsIGdlbmVyYXRlUmFuZG9tQXR0YWNrQ29vcmRpbmF0ZSB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBTaGlwLCBHYW1lQm9hcmQsIFBsYXllciB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgeyBQbGF5ZXIgfSA9IHJlcXVpcmUoJy4vbG9naWMuanMnKVxuY29uc3QgeyBSZW5kZXIsIHN0YXJ0R2FtZSwgY2hhbmdlU2hpcHNQb3NpdGlvbiB9ID0gcmVxdWlyZSgnLi9kb20uanMnKVxuXG5jb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKVxuY29uc3Qgb3Bwb25lbnQgPSBQbGF5ZXIoKVxub3Bwb25lbnQudHlwZSA9ICdjb21wdXRlcidcbnN0YXJ0R2FtZShwbGF5ZXIsIG9wcG9uZW50KVxuIl0sIm5hbWVzIjpbIlJlbmRlciIsImlkZW50aXR5IiwiaWQiLCJjbGVhbkdyaWQiLCJjZWxscyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImNvbmNhdCIsImZvckVhY2giLCJjZWxsIiwiaSIsImNsYXNzTGlzdCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsInJlbW92ZVJvdGF0aW9uSWNvbiIsInN0YXJ0UG9pbnQiLCJwb3MiLCJyb3RhdGlvbkNlbGwiLCJxdWVyeVNlbGVjdG9yIiwiYWRkUm90YXRpb25JY29uIiwicm90YXRpb24iLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInNob3dQb3NpYmxlU2hpcFBvc2l0aW9uIiwicG9zaXRpb24iLCJvcmllbnRhdGlvbiIsImxlbmd0aCIsImNsZWFuUG9zaWJsZVNoaXBQb3NpdGlvbiIsInJlbW92ZSIsInNob3dTaGlwc1Bvc2l0aW9uIiwiZ2FtZUJvYXJkIiwic2hpcHMiLCJzaGlwIiwiaiIsInNoaXBDZWxsIiwidG9nZ2xlIiwiYWxpdmVTaGlwcyIsInNob3dTaGlwc0NvbmRpdGlvbiIsImxhYmVsIiwib3V0Ym9hcmRTaGlwIiwiaXNTdW5rIiwiY3JlYXRlQ3Jvc3NTdmciLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRBdHRyaWJ1dGUiLCJsaW5lMSIsImxpbmUyIiwiY2lyY2xlIiwic2hvd0F0dGFja1Jlc3VsdCIsImNvcmRpbmF0ZXMiLCJib2FyZCIsInN0YXJ0R2FtZSIsInBsYXllck9uZSIsInBsYXllclR3byIsImRpc3BsYXkiLCJzdGFydEJ0biIsImdhbWVCb2FyZE9uZSIsImdhbWVCb2FyZFR3byIsInJlbmRlck9uZSIsInJlbmRlclR3byIsImJlZ2luIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjaGFuZ2VTaGlwc1Bvc2l0aW9uIiwic3RhcnQiLCJvbmNlIiwiYXR0YWNrZWRQb3NpdGlvbiIsIk51bWJlciIsInJlcGxhY2UiLCJjIiwiciIsInBsYXllck9uZUF0dGFja2VkQ29yZGluYXRlcyIsInBsYXllclR3b0F0dGFja2VkQ29yZGluYXRlcyIsImdlbmVyYXRlUmFuZG9tQXR0YWNrQ29vcmRpbmF0ZSIsInJlY2VpdmVBdHRhY2siLCJlbmRPZkdhbWUiLCJhbm5vdW5jZVdpbm5lciIsIndpbm5lciIsIm1lc3NhZ2UiLCJyZW1vdmVFdmVudExpc3RlbmVyc0Zyb21BbGxDZWxscyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhcmVBbGxTaGlwc1N1bmsiLCJwbGFjZVNoaXBzSW5SYW5kb21QbGFjZXMiLCJwbGF5ZXIiLCJkb25lIiwicmVuZGVyUCIsImNsaWNrZWQiLCJzaGlwT2JqZWN0IiwicmVwbGFjZW1lbnQiLCJpc1NoaXAiLCJjb250YWlucyIsImlzUm90YXRpb24iLCJjaGFuZ2VkT3JpZW50YXRpb24iLCJpc1NoaXBQbGFjYWJsZSIsInJlbW92ZVNoaXBGcm9tQ29yZGluYXRlcyIsInB1dFNoaXBJbkNvcmRpbmF0ZXMiLCJkZXN0aW5hdGlvbiIsImNlbGxOdW1iZXIiLCJjb2x1bW4iLCJyb3ciLCJuZXdDZWxsIiwiY2xvbmVOb2RlIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImV2ZW50IiwibW9kdWxlIiwiZXhwb3J0cyIsIlNoaXAiLCJsIiwiaGl0dGVkIiwiaGl0IiwiR2FtZUJvYXJkIiwic2V0dXBCb2FyZCIsInB1c2giLCJwbGFjZVNoaXBJblJhbmRvbVBsYWNlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibyIsImNvbnZlcnRCaW5hcnlUb09yaWVudGF0aW9uIiwiYiIsIm1pc3NlZEF0dGFja3MiLCJhdHRhY2tlZCIsImV2ZXJ5IiwiX3RoaXMiLCJQbGF5ZXIiLCJ0eXBlIiwiY29udGFpbkFycmF5IiwibWFpbkFycmF5IiwiYXJyYXkiLCJzb21lIiwiYXJyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzQXR0YWNrYWJsZSIsImdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZXMiLCJzdWNjZXNzZnVsbEF0dGFja3MiLCJuZXh0Q29yZGluYXRlIiwiY29vcmRpbmF0ZXMiLCJkaXJlY3Rpb24iLCJfY29vcmRpbmF0ZXMiLCJfc2xpY2VkVG9BcnJheSIsIngiLCJ5IiwiZ2VuZXJhdGVOZXh0QXR0YWNrIiwiY29uc29sZSIsImxvZyIsImRpcmVjdGlvbnMiLCJuZXh0RGlyZWN0aW9uSW5kZXgiLCJkMSIsInNsaWNlIiwiZDIiLCJuZXh0IiwiZ2VuZXJhdGVSYW5kb21BdHRhY2siLCJfcmVxdWlyZSIsInJlcXVpcmUiLCJfcmVxdWlyZTIiLCJvcHBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=
const { Ship } = require('../src/logic.js')

test('create a ship of length 3', () => {
  const ship = Ship(3)
  expect(ship.length).toBe(3)
})

test('hit a ship', () => {
  const ship = Ship(3)
  ship.hit()
  expect(ship.hitted).toBe(1)
})

test('hit a ship of lenght three, three time so it is sunk', () => {
  const ship = Ship(3)
  ship.hit()
  ship.hit()
  ship.hit()
  expect(ship.isSunk()).toBeTruthy()
})

test('hit a ship of length three one time so it is not sunk', () => {
  const ship = Ship(3)
  ship.hit()
  expect(ship.isSunk()).toBeFalsy()
})

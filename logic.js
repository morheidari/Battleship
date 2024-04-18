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

module.exports = { Ship }

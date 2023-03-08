const math = require('./math');
// easy, medium, hard (by level)

function randomize(num) {
  return Math.ceil(Math.random() * num);
}

module.exports = randomize;

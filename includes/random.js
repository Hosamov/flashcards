//* Randomize using level (see app.js)
const math = require('./math');

function randomize(num) {
  return Math.ceil(Math.random() * num);
}

module.exports = randomize;

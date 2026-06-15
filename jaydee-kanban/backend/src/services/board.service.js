// Service : logique métier du tableau (sera enrichi en Exercice 5 et 6).
const { columns, tasks } = require('../data/seed');

function getBoard() {
  return { columns, tasks };
}

module.exports = { getBoard };

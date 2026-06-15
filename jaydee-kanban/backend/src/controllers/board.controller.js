// Contrôleur : fait le lien entre la route HTTP et le service métier.
const boardService = require('../services/board.service');

exports.getBoard = (req, res) => {
  const board = boardService.getBoard();
  res.status(200).json(board);
};

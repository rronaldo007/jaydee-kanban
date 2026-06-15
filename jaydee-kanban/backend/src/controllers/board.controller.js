// Contrôleur : fait le lien entre la route HTTP et le service métier.
const boardService = require('../services/board.service');
const { badRequest } = require('../middlewares/validate');

exports.getBoard = (req, res) => {
  const board = boardService.getBoard();
  res.status(200).json(board);
};

exports.createTask = (req, res, next) => {
  try {
    const task = boardService.addTask(req.body);
    res.status(201).json(task);
  } catch (e) {
    // Erreur métier (ex. colonne inconnue) => requête invalide (400).
    next(badRequest(e.message));
  }
};

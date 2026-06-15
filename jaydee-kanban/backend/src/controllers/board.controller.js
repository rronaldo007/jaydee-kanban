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

exports.updateTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = boardService.updateTask(id, req.body);
    res.status(200).json(task);
  } catch (e) {
    // Erreur déjà qualifiée (ex. 404) transmise telle quelle ;
    // sinon erreur de validation métier => 400.
    next(e.status ? e : badRequest(e.message));
  }
};

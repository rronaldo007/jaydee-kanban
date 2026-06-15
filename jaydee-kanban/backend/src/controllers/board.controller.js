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
    next(badRequest(e.message));
  }
};

exports.updateTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = boardService.updateTask(id, req.body);
    res.status(200).json(task);
  } catch (e) {
    next(e.status ? e : badRequest(e.message));
  }
};

const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const { validateTask } = require('../middlewares/validate');

router.get('/', boardController.getBoard);
router.post('/tasks', validateTask, boardController.createTask);
router.put('/tasks/:id', validateTask, boardController.updateTask);

module.exports = router;

// Définition des routes du tableau. La logique métier reste dans les services.
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const { validateTask } = require('../middlewares/validate');

// GET /api/board -> colonnes + tâches
router.get('/', boardController.getBoard);

// POST /api/board/tasks -> crée une tâche après validation (Exercice 9)
router.post('/tasks', validateTask, boardController.createTask);

// PUT /api/board/tasks/:id -> modifie une tâche après validation (SCRUM-25)
router.put('/tasks/:id', validateTask, boardController.updateTask);

module.exports = router;

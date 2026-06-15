// Définition des routes du tableau. La logique métier reste dans les services.
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

// GET /api/board -> colonnes + tâches
router.get('/', boardController.getBoard);

// (Exercice 9) POST /api/board/tasks -> sera ajouté avec le middleware de validation.

module.exports = router;

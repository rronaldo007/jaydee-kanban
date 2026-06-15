// Configuration de l'application Express (middlewares + routes).
const express = require('express');
const cors = require('cors');
const boardRoutes = require('./routes/board.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Route de santé : sert au test de communication (Exercice 4).
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'jaydee-kanban-api' });
});

// Routes métier du tableau Kanban.
app.use('/api/board', boardRoutes);

// 404 : aucune route ne correspond.
app.use((req, res, next) => {
  const err = new Error('Ressource introuvable.');
  err.status = 404;
  next(err);
});

// Gestionnaire global d'erreurs (doit rester le dernier middleware).
app.use(errorHandler);

module.exports = app;

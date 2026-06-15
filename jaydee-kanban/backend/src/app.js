// Configuration de l'application Express (middlewares + routes).
const express = require('express');
const cors = require('cors');
const boardRoutes = require('./routes/board.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Route de santé : sert au test de communication (Exercice 4).
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'jaydee-kanban-api' });
});

// Routes métier du tableau Kanban.
app.use('/api/board', boardRoutes);

module.exports = app;

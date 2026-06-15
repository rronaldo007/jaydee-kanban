const express = require('express');
const cors = require('cors');
const boardRoutes = require('./routes/board.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'jaydee-kanban-api' });
});

app.use('/api/board', boardRoutes);

app.use((req, res, next) => {
  const err = new Error('Ressource introuvable.');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;

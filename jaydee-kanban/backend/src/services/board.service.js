// Service : logique métier du tableau Kanban.
const { columns, tasks } = require('../data/seed');
const { createTask } = require('../models/task');

function getBoard() {
  return { columns, tasks };
}

// Crée une tâche après validation métier (id généré, colonne existante).
// createTask lève une erreur explicite si les données sont incohérentes.
function addTask({ name, color, columnId }) {
  const columnIds = columns.map((c) => c.id);
  const nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  const task = createTask({ id: nextId, name, color, columnId }, columnIds);
  tasks.push(task);
  return task;
}

module.exports = { getBoard, addTask };

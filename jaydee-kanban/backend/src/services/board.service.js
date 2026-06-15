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

// Modifie une tâche existante. Lève une erreur 404 si l'identifiant est inconnu,
// et délègue la validation des champs au modèle (erreur explicite si incohérent).
function updateTask(id, { name, color, columnId }) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error(`Tâche introuvable : ${id}.`);
    err.status = 404;
    throw err;
  }
  const columnIds = columns.map((c) => c.id);
  const updated = createTask({ id, name, color, columnId }, columnIds);
  tasks[index] = updated;
  return updated;
}

module.exports = { getBoard, addTask, updateTask };

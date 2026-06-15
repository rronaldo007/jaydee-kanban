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

// Champs d'affichage optionnels conservés lors d'une modification.
const DISPLAY_FIELDS = ['priority', 'reference', 'dueDate', 'progress', 'assignee'];

// Modifie une tâche existante. Lève une erreur 404 si l'identifiant est inconnu,
// délègue la validation des champs cœur au modèle, et conserve les champs
// d'affichage existants (sauf si la requête en fournit de nouveaux). Ainsi un
// simple changement de colonne ne fait pas perdre la priorité, la référence, etc.
function updateTask(id, payload = {}) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error(`Tâche introuvable : ${id}.`);
    err.status = 404;
    throw err;
  }
  const columnIds = columns.map((c) => c.id);
  const { name, color, columnId } = payload;
  const base = createTask({ id, name, color, columnId }, columnIds);

  const existing = tasks[index];
  const updated = { ...base };
  for (const field of DISPLAY_FIELDS) {
    const value = payload[field] !== undefined ? payload[field] : existing[field];
    if (value !== undefined) updated[field] = value;
  }

  tasks[index] = updated;
  return updated;
}

module.exports = { getBoard, addTask, updateTask };

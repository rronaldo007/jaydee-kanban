// Service : logique métier du tableau Kanban.
const { columns, tasks } = require('../data/seed');
const { createTask } = require('../models/task');

// Champs d'affichage optionnels (hors validation métier).
const DISPLAY_FIELDS = ['priority', 'reference', 'dueDate', 'progress', 'assignee'];

// Fusionne les champs d'affichage : valeur de la requête si fournie, sinon valeur existante.
function withDisplayFields(base, payload, existing = {}) {
  const result = { ...base };
  for (const field of DISPLAY_FIELDS) {
    const value = payload[field] !== undefined ? payload[field] : existing[field];
    if (value !== undefined) result[field] = value;
  }
  return result;
}

function getBoard() {
  return { columns, tasks };
}

// Crée une tâche après validation métier (id généré, colonne existante).
// createTask lève une erreur explicite si les données cœur sont incohérentes ;
// les champs d'affichage fournis sont conservés.
function addTask(payload = {}) {
  const { name, color, columnId } = payload;
  const columnIds = columns.map((c) => c.id);
  const nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  const base = createTask({ id: nextId, name, color, columnId }, columnIds);
  const task = withDisplayFields(base, payload);
  tasks.push(task);
  return task;
}

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
  const updated = withDisplayFields(base, payload, tasks[index]);

  tasks[index] = updated;
  return updated;
}

module.exports = { getBoard, addTask, updateTask };

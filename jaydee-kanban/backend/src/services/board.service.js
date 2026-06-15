const { columns, tasks } = require('../data/seed');
const { createTask } = require('../models/task');

const DISPLAY_FIELDS = ['priority', 'reference', 'dueDate', 'progress', 'assignee'];

// garde la valeur envoyée si elle existe, sinon celle déjà en place
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

function addTask(payload = {}) {
  const { name, color, columnId } = payload;
  const columnIds = columns.map((c) => c.id);
  const nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  const base = createTask({ id: nextId, name, color, columnId }, columnIds);
  const task = withDisplayFields(base, payload);
  tasks.push(task);
  return task;
}

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

// Logique d'initialisation : génère les colonnes et un jeu de tâches de démo.
// Tout passe par les modèles, donc la cohérence est validée au démarrage.

const { createColumn } = require('../models/column');
const { createTask } = require('../models/task');

// Colonnes du flux de production.
const columns = [
  createColumn({ id: 'todo', name: 'À faire' }),
  createColumn({ id: 'doing', name: 'En cours' }),
  createColumn({ id: 'review', name: 'À contrôler' }),
  createColumn({ id: 'done', name: 'Terminé' })
];

const columnIds = columns.map((c) => c.id);

// Données de démonstration brutes.
const demoTasks = [
  { id: 1, name: 'Boîtier automobile', color: '#EF4444', columnId: 'todo' },
  { id: 2, name: 'Support châssis S-44', color: '#3B82F6', columnId: 'todo' },
  { id: 3, name: 'Moule M-202 clavier', color: '#F59E0B', columnId: 'todo' },
  { id: 4, name: 'Couvercle pompe P-05', color: '#14B8A6', columnId: 'doing' },
  { id: 5, name: 'Axe rotatif R-12', color: '#EF4444', columnId: 'doing' },
  { id: 6, name: 'Vanne de contrôle V-4', color: '#F59E0B', columnId: 'review' },
  { id: 7, name: 'Châssis Alu-Z', color: '#3B82F6', columnId: 'review' },
  { id: 8, name: 'Carter B-21', color: '#22C55E', columnId: 'done' },
  { id: 9, name: 'Joint torique J-08', color: '#22C55E', columnId: 'done' }
];

// Contrôle de cohérence : on rejette les identifiants dupliqués.
const seenIds = new Set();
const tasks = demoTasks.map((raw) => {
  if (seenIds.has(raw.id)) {
    throw new Error(`Identifiant de tâche dupliqué : ${raw.id}.`);
  }
  seenIds.add(raw.id);
  return createTask(raw, columnIds);
});

module.exports = { columns, tasks };

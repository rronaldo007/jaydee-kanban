// Logique d'initialisation : génère les colonnes et un jeu de tâches de démo.
// Les champs cœur (id, nom, couleur, colonne) passent par le modèle, donc la
// cohérence est validée au démarrage. Des champs d'affichage optionnels
// (priorité, référence OF, échéance, progression, assigné) enrichissent les cartes.

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

// Données de démonstration brutes (cœur + champs d'affichage).
const demoTasks = [
  { id: 1, name: 'Boîtier automobile', color: '#EF4444', columnId: 'todo', priority: 'CRITIQUE', reference: 'OF-1043', dueDate: '26 juin', assignee: 'ML' },
  { id: 2, name: 'Support châssis S-44', color: '#3B82F6', columnId: 'todo', priority: 'STANDARD', reference: 'OF-1051', dueDate: '28 juin', assignee: 'AK' },
  { id: 3, name: 'Moule M-202 clavier', color: '#F59E0B', columnId: 'todo', priority: 'ROUTINE', reference: 'OF-1067', dueDate: '30 juin', assignee: 'RR' },
  { id: 4, name: 'Couvercle pompe P-05', color: '#14B8A6', columnId: 'doing', priority: 'EN COURS', reference: 'OF-1029', progress: 60, assignee: 'RR' },
  { id: 5, name: 'Axe rotatif R-12', color: '#EF4444', columnId: 'doing', priority: 'CRITIQUE', reference: 'OF-1033', progress: 30, assignee: 'AK' },
  { id: 6, name: 'Vanne de contrôle V-4', color: '#F59E0B', columnId: 'review', priority: 'QUALITÉ', reference: 'OF-1018', dueDate: 'auj.', assignee: 'ML' },
  { id: 7, name: 'Châssis Alu-Z', color: '#3B82F6', columnId: 'review', priority: 'DIMENSIONNEL', reference: 'OF-1009', dueDate: 'auj.', assignee: 'RR' },
  { id: 8, name: 'Carter B-21', color: '#22C55E', columnId: 'done', priority: 'TERMINÉ', reference: 'OF-0998', dueDate: '24 juin', assignee: 'AK' },
  { id: 9, name: 'Joint torique J-08', color: '#22C55E', columnId: 'done', priority: 'TERMINÉ', reference: 'OF-0991', dueDate: '23 juin', assignee: 'ML' }
];

// Contrôle de cohérence : identifiants uniques + validation par le modèle.
const seenIds = new Set();
const tasks = demoTasks.map((raw) => {
  if (seenIds.has(raw.id)) {
    throw new Error(`Identifiant de tâche dupliqué : ${raw.id}.`);
  }
  seenIds.add(raw.id);
  // createTask valide les champs cœur ; on conserve les champs d'affichage.
  const base = createTask(raw, columnIds);
  return {
    ...base,
    priority: raw.priority,
    reference: raw.reference,
    dueDate: raw.dueDate,
    progress: raw.progress,
    assignee: raw.assignee
  };
});

module.exports = { columns, tasks };

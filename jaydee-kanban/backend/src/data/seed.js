// Jeu de données de démonstration minimal (enrichi en Exercice 5).
const columns = [
  { id: 'todo', name: 'À faire' },
  { id: 'doing', name: 'En cours' },
  { id: 'review', name: 'À contrôler' },
  { id: 'done', name: 'Terminé' }
];

const tasks = [
  { id: 1, name: 'Boîtier automobile', color: '#EF4444', columnId: 'todo' },
  { id: 2, name: 'Couvercle pompe P-05', color: '#14B8A6', columnId: 'doing' }
];

module.exports = { columns, tasks };

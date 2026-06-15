// Modèle Tâche (structure + contrôle de cohérence enrichis en Exercice 5).
function createTask({ id, name, color, columnId }) {
  return { id, name, color, columnId };
}

module.exports = { createTask };

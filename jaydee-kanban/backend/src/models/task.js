// Modèle Tâche : carte du tableau Kanban.
// Chaque tâche a : un identifiant unique, un nom, une couleur, une colonne.
// La fonction valide la cohérence des données avant de créer l'objet.

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

function createTask({ id, name, color, columnId } = {}, validColumnIds = []) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Tâche invalide : identifiant manquant ou incorrect.');
  }
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Tâche invalide : nom manquant.');
  }
  if (typeof color !== 'string' || !HEX_COLOR.test(color)) {
    throw new Error('Tâche invalide : couleur hexadécimale attendue (#RRGGBB).');
  }
  if (typeof columnId !== 'string' || columnId.trim() === '') {
    throw new Error('Tâche invalide : colonne manquante.');
  }
  if (validColumnIds.length > 0 && !validColumnIds.includes(columnId)) {
    throw new Error(`Tâche invalide : colonne inconnue "${columnId}".`);
  }
  return { id, name: name.trim(), color, columnId };
}

module.exports = { createTask };

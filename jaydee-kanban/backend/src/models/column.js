// Modèle Colonne : représente une étape du flux de production.
// Intègre un contrôle de cohérence (champs obligatoires).

function createColumn({ id, name } = {}) {
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error('Colonne invalide : identifiant manquant.');
  }
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Colonne invalide : nom manquant.');
  }
  return { id: id.trim(), name: name.trim() };
}

module.exports = { createColumn };

// Gestionnaire global d'erreurs (Exercice 9).
// Assure un traitement cohérent des exceptions et empêche toute fuite
// d'information technique (stack, détails internes) vers le client.

// La signature à 4 arguments est obligatoire pour qu'Express reconnaisse
// ce middleware comme gestionnaire d'erreurs.
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  // Pour les erreurs maîtrisées (4xx), on renvoie le message explicite.
  // Pour les erreurs serveur (5xx), on masque le détail technique.
  const message = status < 500 ? err.message : 'Une erreur interne est survenue.';

  res.status(status).json({ error: message });
};

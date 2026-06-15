// signature à 4 arguments pour qu'Express le voie comme gestionnaire d'erreurs
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = status < 500 ? err.message : 'Une erreur interne est survenue.';
  res.status(status).json({ error: message });
};

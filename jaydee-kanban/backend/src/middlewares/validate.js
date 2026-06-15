const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

function validateTask(req, res, next) {
  const { name, color, columnId } = req.body || {};
  const errors = [];

  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('le nom est obligatoire');
  }
  if (typeof color !== 'string' || !HEX_COLOR.test(color)) {
    errors.push('la couleur doit être au format hexadécimal #RRGGBB');
  }
  if (typeof columnId !== 'string' || columnId.trim() === '') {
    errors.push('la colonne (columnId) est obligatoire');
  }

  if (errors.length > 0) {
    return next(badRequest(`Données invalides : ${errors.join(', ')}.`));
  }

  next();
}

module.exports = { validateTask, badRequest };

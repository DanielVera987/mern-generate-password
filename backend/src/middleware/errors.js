import createError from 'http-errors';

export const error404Handler = (req, res, next) => {
  next(createError(404, 'Not Found'));
}

export const errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || 500);
  res.json({ message: err.message });
}


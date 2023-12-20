import { HttpError } from '../../models/HttpError.js';

function errorHandler (error, req, res, next) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).send({
      ok: false,
      data: null,
      message: null,
      error: error.message
    });
  }

  return res.status(500).send({
    ok: false,
    message: null,
    error: error.message,
    data: null
  });
}

export default errorHandler;

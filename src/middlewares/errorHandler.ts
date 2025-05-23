import { Request, Response, NextFunction } from 'express';

enum HttpStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error capturado por el middleware:', err);

  switch (err.status) {
    case HttpStatus.BAD_REQUEST:
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
        error: err.message || 'Solicitud incorrecta.',
      });
      break;

    case HttpStatus.NOT_FOUND:
      res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: 'Not Found',
        error: err.message || 'El recurso solicitado no fue encontrado.',
      });
      break;

    case HttpStatus.UNAUTHORIZED:
      res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
        error: err.message || 'No autorizado.',
      });
      break;

    case HttpStatus.FORBIDDEN:
      res.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Forbidden',
        error: err.message || 'Acceso denegado.',
      });
      break;

    case HttpStatus.INTERNAL_SERVER_ERROR:
    default:
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        error: err.message || 'Error interno del servidor.',
      });
      break;
  }
};
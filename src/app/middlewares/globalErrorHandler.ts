/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import config from '../config';
import { TErrorSources } from '../interface/error';
import AppError from '../errors/AppError';
import { ZodError } from 'zod';
import HandleZodError from '../errors/HandleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('-------------------------------------->', err);
  let statusCode = 500;
  let message = 'An unexpected error occurred!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'An unexpected error occurred!',
    },
  ];
  if (err instanceof ZodError) {
    const simplifiedError = HandleZodError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorSources,
    // err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

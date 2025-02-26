import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const register = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await AuthServices.registerUser(userData);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: { _id: result._id, name: result.name, email: result.email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { accessToken, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    message: 'Login Successful',
    statusCode: httpStatus.OK,
    data: { token: accessToken },
  });
});

export const AuthControllers = {
  register,
  login,
};

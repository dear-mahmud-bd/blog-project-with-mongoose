import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const register = catchAsync(async (req: Request, res: Response) => {
  const userdata = req.body;
  const result = await AuthServices.registerUser(userdata);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: { _id: result._id, name: result.name, email: result.email },
  });
});

export const AuthControllers = {
  register,
};

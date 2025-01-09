import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AdminServices } from './admin.service';
import { AuthenticatedUser } from '../auth/auth.interface';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const adminData = req.user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await AdminServices.blockUserFromSystem(
    userId,
    adminData as AuthenticatedUser,
  );
  sendResponse(res, {
    success: true,
    message: 'User Blocked Successfully',
    statusCode: httpStatus.OK,
  });
});

export const AdminControllers = {
  blockUser,
};

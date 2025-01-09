import { Types } from 'mongoose';
import { User } from '../user/user.model';
import { AuthenticatedUser } from '../auth/auth.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { USER_ROLE } from '../user/user.constant';

const blockUserFromSystem = async (
  userId: string,
  admin: AuthenticatedUser,
) => {
  if (admin.role !== USER_ROLE.admin) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
  }

  const user = await User.findById({
    _id: new Types.ObjectId(userId),
  });
  if (!user || user == null) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  const result = await User.updateOne(
    { _id: new Types.ObjectId(userId) },
    { $set: { isBlocked: true } },
  );

  if (result.modifiedCount === 0) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'User is not blocked');
  }

  return {};
};
export const AdminServices = {
  blockUserFromSystem,
};

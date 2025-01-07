import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const registerUser = async (payload: TUser) => {
  if (await User.isEmailExist(payload.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'There is already a user registered with this email.',
    );
  }
  const result = await User.create(payload);
  return result;
};

export const AuthServices = { registerUser };

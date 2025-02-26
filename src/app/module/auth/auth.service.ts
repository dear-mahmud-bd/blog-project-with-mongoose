import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';

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

const loginUser = async (payload: TUser) => {
  const user = await User.isEmailExist(payload.email);
  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid Credentials', // 'Enter your email and password correctly.',
    );
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are blocked!');
  }

  const isMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid Credentials', // 'Enter your email and password correctly.',
    );
  }

  const JwtPayload = {
    email: payload.email,
    role: user.role,
  };
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expires as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_token_expires as string,
  );

  return { accessToken, refreshToken };
};

export const AuthServices = {
  registerUser,
  loginUser,
};

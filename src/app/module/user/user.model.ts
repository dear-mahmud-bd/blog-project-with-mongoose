import { model, Schema } from 'mongoose';
import { TUser, UserModel, UserType } from './user.interface';

export const UserSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.user,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.statics.isEmailExist = async function (email) {
  return await this.findOne({ email }); //.select('+password'); // for send password through api
};

export const User = model<TUser, UserModel>('User', UserSchema);

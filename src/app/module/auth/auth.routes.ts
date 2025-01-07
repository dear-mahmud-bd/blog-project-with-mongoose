import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../utils/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.register,
);

export const AuthRoutes = router;

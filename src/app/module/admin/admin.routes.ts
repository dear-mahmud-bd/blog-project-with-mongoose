import { Router } from 'express';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

const router = Router();

router.patch(
  '/users/:userId/block',
  AuthGuard(USER_ROLE.admin),
  AdminControllers.blockUser,
);

export const AdminRoutes = router;

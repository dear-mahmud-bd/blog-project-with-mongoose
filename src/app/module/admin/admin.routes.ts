import { Router } from 'express';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';
import { BlogControllers } from '../blog/blog.controller';

const router = Router();

router.patch(
  '/users/:userId/block',
  AuthGuard(USER_ROLE.admin),
  AdminControllers.blockUser,
);
router.delete(
  '/blogs/:id',
  AuthGuard(USER_ROLE.admin),
  BlogControllers.deleteBlog,
);

export const AdminRoutes = router;

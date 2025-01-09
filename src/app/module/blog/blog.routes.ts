import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidation } from './blog.validation';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  AuthGuard(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);
router.get('/', BlogControllers.getAllBlogs);
router.patch(
  '/:id',
  AuthGuard(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);
router.delete(
  '/:id',
  AuthGuard(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.deleteBlog,
);

export const BlogRoutes = router;

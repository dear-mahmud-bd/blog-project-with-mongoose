import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.routes';
import { BlogRoutes } from '../module/blog/blog.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

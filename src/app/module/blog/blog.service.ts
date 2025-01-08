import { TBlogPostRequest } from './blog.interface';
import { Blog } from './blog.model';
import { AuthenticatedUser } from '../auth/auth.interface';

const createBlogIntoDB = async (
  payload: TBlogPostRequest,
  user: AuthenticatedUser,
) => {
  const newBlog = new Blog({ ...payload, author: user?._id });
  // console.log(newBlog);
  const result = await Blog.create(newBlog);
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
};

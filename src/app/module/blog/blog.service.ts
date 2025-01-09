import { TBlog, TBlogPostRequest } from './blog.interface';
import { Blog } from './blog.model';
import { AuthenticatedUser } from '../auth/auth.interface';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createBlogIntoDB = async (
  payload: TBlogPostRequest,
  user: AuthenticatedUser,
) => {
  const newBlog = new Blog({ ...payload, author: user?._id });
  // console.log(newBlog);
  const result = await Blog.create(newBlog);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  console.log('Q u e r y ->', query);
  const queryObj = { ...query };

  // Searching functionality
  const blogSearchableFields = ['title', 'content'];
  let search = '';
  if (query?.search) {
    search = query.search as string;
  }
  const searchQuery = Blog.find({
    $or: blogSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  // Fintering functionality
  const excludeFields = ['search', 'sortBy', 'sortOrder'];
  excludeFields.forEach((el) => delete queryObj[el]);
  // from frontend req as filter=id but it need to convert author=id
  const filter: Record<string, unknown> = {};
  if (queryObj?.filter) {
    filter.author = queryObj.filter as string;
  }

  // main operation
  const result = await searchQuery.find(filter).populate('author', {
    _id: 1,
    name: 1,
    email: 1,
  });
  return result;
};

const updateBlogFromDB = async (
  id: string,
  updates: Partial<TBlog>,
  user: AuthenticatedUser,
) => {
  const blogData = await Blog.findById({
    _id: new Types.ObjectId(id),
  });
  if (blogData == null) {
    throw new AppError(httpStatus.NOT_FOUND, 'BLog not found');
  }

  const isUpdatable = blogData.author.toString() === user._id.toString();
  // console.log('is blog updatable: : ', isUpdatable);
  if (!isUpdatable) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  const result = await Blog.findByIdAndUpdate(
    new Types.ObjectId(id),
    { $set: updates },
    { new: true, runValidators: true }, // for validation
  ).select('-isDeleted');
  if (!result) {
    throw new Error('Product not found');
  }

  return result;
};

const deleteBlogFromDB = async (id: string, user: AuthenticatedUser) => {
  const blogData = await Blog.findById({
    _id: new Types.ObjectId(id),
  });
  if (blogData == null) {
    throw new AppError(httpStatus.NOT_FOUND, 'BLog not found');
  }

  const isUpdatable = blogData.author.toString() === user._id.toString();
  if (!isUpdatable) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  const result = await Blog.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: { isDeleted: true } },
  );
  if (result.modifiedCount === 0) {
    throw new Error('Blog is not deleted');
  }

  return {};
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};

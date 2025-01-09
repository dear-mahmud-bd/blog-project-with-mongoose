import { TBlog, TBlogPostRequest } from './blog.interface';
import { Blog } from './blog.model';
import { AuthenticatedUser } from '../auth/auth.interface';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { USER_ROLE } from '../user/user.constant';

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
  // console.log('Q u e r y ->', query);
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
  const filterQuery = searchQuery.find(filter).populate('author', {
    _id: 1,
    name: 1,
    email: 1,
  });

  // sorting functionality
  let sortBy = 'createdAt';
  if (query?.sortBy) {
    sortBy = query.sortBy as string;
  }
  // accending or decending order
  if (query?.sortOrder) {
    const validSortOrders = ['asc', 'desc'];
    if (!validSortOrders.includes(query.sortOrder as string)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid sortOrder value. It must be 'asc' or 'desc'.",
      );
    }
    const sortOrder = query.sortOrder === 'desc' ? '-' : '';
    sortBy = `${sortOrder}${sortBy as string}`;
  }
  const result = await filterQuery.sort(sortBy);

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

  // admin control...
  // console.log(user.role === USER_ROLE.admin);
  if (user.role == USER_ROLE.admin) {
    const result = await Blog.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { isDeleted: true } },
    );
    if (result.modifiedCount === 0) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Blog is not deleted',
      );
    }

    return {};
  } else {
    // user control...
    const isUpdatable = blogData.author.toString() === user._id.toString();
    if (!isUpdatable) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }

    const result = await Blog.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { isDeleted: true } },
    );
    if (result.modifiedCount === 0) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Blog is not deleted',
      );
    }

    return {};
  }
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};

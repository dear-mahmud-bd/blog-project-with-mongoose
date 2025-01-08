import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthenticatedUser } from '../auth/auth.interface';
import { BlogServices } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req, res) => {
  // console.log('----------------------------',req.user);
  const blogData = req.body;
  const userData = req.user;
  const result = await BlogServices.createBlogIntoDB(
    blogData,
    userData as AuthenticatedUser,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog Created Successfully',
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: {
        userID: userData._id,
        name: userData.name,
        email: userData.email,
      },
    },
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Fetched Successfully',
    data: result,
  });
});
export const BlogControllers = {
  createBlog,
  getAllBlogs,
};

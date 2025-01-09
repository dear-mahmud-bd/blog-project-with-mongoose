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
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Fetched Successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  // console.log('----------------------------',req.user);
  const { id } = req.params;
  const updatedBlogData = req.body;
  const userData = req.user;
  const result = await BlogServices.updateBlogFromDB(
    id,
    updatedBlogData,
    userData as AuthenticatedUser,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Updated Successfully',
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

const deleteBlog = catchAsync(async (req, res) => {
  // console.log('----------------------------',req.user);
  const { id } = req.params;
  const userData = req.user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await BlogServices.deleteBlogFromDB(
    id,
    userData as AuthenticatedUser,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Updated Successfully',
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};

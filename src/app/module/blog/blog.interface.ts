import { Types } from 'mongoose';

export type TBlogPostRequest = {
  title: string;
  content: string;
};

export interface TBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
  isDeleted: boolean;
}

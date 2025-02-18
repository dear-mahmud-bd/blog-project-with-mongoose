import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

export const BlogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// query middlewire...
BlogSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});
BlogSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});

export const Blog = model<TBlog>('Blog', BlogSchema);

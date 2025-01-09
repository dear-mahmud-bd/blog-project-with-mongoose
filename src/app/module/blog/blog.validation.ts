import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(10, 'Title must be at least 10 characters long'),
    content: z
      .string({ required_error: 'Content is required' })
      .min(20, 'Content must be at least 20 characters long'),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .min(10, 'Title must be at least 10 characters long')
        .optional(),
      content: z
        .string()
        .min(20, 'Content must be at least 20 characters long')
        .optional(),
    })
    .refine(
      // at least one must be provided
      (data) => data.title || data.content,
      {
        message: 'Either title or content is required',
        path: ['body'],
      },
    ),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};

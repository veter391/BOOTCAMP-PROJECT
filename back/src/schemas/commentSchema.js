import { z } from 'zod';

const CreateCommentSchema = z.object({
  user_id: z.string(),
  post_id: z.string(),
  comment_text: z.string()
});

const GetCommentByIdSchema = z.object({
  id: z.string()
});

const GetAllCommentsSchema = z.array(
  z.object({
    id: z.string(),
    user_id: z.string(),
    post_id: z.string(),
    comment_text: z.string(),
    created_at: z.string()
  })
);

const UpdateCommentSchema = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  post_id: z.string().optional(),
  comment_text: z.string().optional()
});

const DeleteCommentSchema = z.object({
  id: z.string()
});

const commentSchemas = {
  CreateCommentSchema,
  GetCommentByIdSchema,
  GetAllCommentsSchema,
  UpdateCommentSchema,
  DeleteCommentSchema,
};

export default commentSchemas;
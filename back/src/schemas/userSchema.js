import { z } from 'zod';

const CreateUserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3).max(8),
  city: z.string(),
  avatar: z.string().optional(), 
});

const GetUserByIdSchema = z.object({
  id: z.string(),
});

const GetAllUsersSchema = z.array(
  z.object({
    id: z.string(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3).max(8),
    city: z.string(), 
    avatar: z.string().optional(), 
  })
);

const UpdateUserSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(3).max(8).optional(),
  city: z.string().optional(), 
  avatar: z.string().optional(), 
});

const DeleteUserSchema = z.object({
  id: z.string(),
});

const userSchemas = {
  CreateUserSchema,
  GetUserByIdSchema,
  GetAllUsersSchema,
  UpdateUserSchema,
  DeleteUserSchema,
};

export default userSchemas;

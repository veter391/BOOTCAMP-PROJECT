import { z } from 'zod';

const CreateUserSchema = z.object({
  first_name: z.string().min(2).max(20),
  last_name: z.string().min(2).max(20),
  email: z.string().email(),
  city: z.string().min(2).max(20),
  password: z.string().min(3).max(20),
  type: z.string().max(5)
});

const GetUserByIdSchema = z.object({
  id: z.string()
});

const GetAllUsersSchema = z.array(
  z.object({
    id: z.string(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3).max(8),
    city: z.string(),
    avatar: z.string().optional()
  })
);

const UpdateUserSchema = z.object({
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(3).max(8).optional(),
  city: z.string().optional(),
});

const DeleteUserSchema = z.object({
  id: z.string()
});

// Exportando el objeto de los esquemas
export {
  CreateUserSchema,
  GetUserByIdSchema,
  GetAllUsersSchema,
  UpdateUserSchema,
  DeleteUserSchema
};

import { z } from 'zod';

const CreateUserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  last_update: z.string(),
  usertype: z.string()
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
    last_update: z.string(),
    usertype: z.string()
  })
);

const UpdateUserSchema = z.object({
  id: z.string(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3).max(8),
  last_update: z.string(),
  usertype: z.string()
});

const DeleteUserSchema = z.object({
  id: z.string()
});

// Exportando el objeto de los esquemas
const userSchemas = {
  CreateUserSchema,
  GetUserByIdSchema,
  GetAllUsersSchema,
  UpdateUserSchema,
  DeleteUserSchema
};

export default userSchemas;

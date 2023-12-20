import { z } from 'zod';

const CreateOrganizationSchema = z.object({
  org_name: z.string().min(4).max(30),
  email: z.string().email(),
  password: z.string().min(3).max(20),
  city: z.string().min(2).max(20),
  address: z.string().min(5).max(45),
  cif: z.string().length(9),
  type: z.string().max(5)
});

const GetOrganizationByIdSchema = z.object({
  id: z.string()
});

const GetAllOrganizationsSchema = z.array(
  z.object({
    id: z.string(),
    org_name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3).max(20),
    description: z.string(),
    city: z.string(),
    avatar: z.string().optional(),
    cif: z.string().length(9)
  })
);

const UpdateOrganizationSchema = z.object({
  id: z.string(),
  org_name: z.string().min(2).optional(30),
  email: z.string().email().optional(),
  password: z.string().min(3).max(20).optional(),
  description: z.string().optional(),
  city: z.string(),
  avatar: z.string().optional(),
  cif: z.string().length(9).optional()
});

const DeleteOrganizationSchema = z.object({
  id: z.string()
});

export {
  CreateOrganizationSchema,
  GetOrganizationByIdSchema,
  GetAllOrganizationsSchema,
  UpdateOrganizationSchema,
  DeleteOrganizationSchema
};

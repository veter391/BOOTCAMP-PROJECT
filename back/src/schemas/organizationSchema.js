import { z } from 'zod';

const CreateOrganizationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3).max(8),
  description: z.string(),
  city: z.string(),
  address: z.string(),
  cif: z.string().length(9),
  avatar: z.string().optional()
});

const GetOrganizationByIdSchema = z.object({
  id: z.string()
});

const GetAllOrganizationsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3).max(8),
    description: z.string(),
    city: z.string(),
    avatar: z.string().optional(),
    cif: z.string().length(9)
  })
);

const UpdateOrganizationSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(3).max(8).optional(),
  description: z.string().optional(),
  city: z.string(),
  avatar: z.string().optional(),
  cif: z.string().length(9).optional()
});

const DeleteOrganizationSchema = z.object({
  id: z.string()
});

const organizationSchemas = {
  CreateOrganizationSchema,
  GetOrganizationByIdSchema,
  GetAllOrganizationsSchema,
  UpdateOrganizationSchema,
  DeleteOrganizationSchema
};

export default organizationSchemas;

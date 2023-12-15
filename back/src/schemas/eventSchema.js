import { z } from 'zod';

const CreateEventSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  foto: z.string().optional(),
  city: z.string(),
  address: z.string(),
  user_id: z.number()
});

const GetEventByIdSchema = z.object({
  id: z.string()
});

const GetAllEventsSchema = z.array(
  z.object({
    id: z.string(),
    user_id: z.string(),
    organization_id: z.string(),
    name: z.string(),
    description: z.string(),
    date: z.string(),
    city: z.string(),
    address: z.string(),
    is_finished: z.boolean(),
    created_at: z.string(),
    last_update: z.string()
  })
);

const UpdateEventSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  date: z.string().optional(),
  foto: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  is_finished: z.boolean().optional()
});

const DeleteEventSchema = z.object({
  id: z.string()
});

const eventSchemas = {
  CreateEventSchema,
  GetEventByIdSchema,
  GetAllEventsSchema,
  UpdateEventSchema,
  DeleteEventSchema
};

export default eventSchemas;

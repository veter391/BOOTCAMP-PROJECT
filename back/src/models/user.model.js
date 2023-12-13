import { z } from 'zod';

const User = z.object({
  username: z.string({
    invalid_type_error: 'Tiene que ser un string',
    required_error: 'Campo obligatorio'
  }).refine((val) => isNaN(val), { message: 'El usuario no puede ser un número' }),
  email: z.string({
    invalid_type_error: 'Tiene que ser un string',
    required_error: 'Campo obligatorio'
  })
    .email({
      message: 'No es un email válido'
    }),
  password: z.string({
    invalid_type_error: 'Tiene que ser un string',
    required_error: 'Campo obligatorio'
  })
    .min(8, {
      message: 'Mínimo 3 caracteres.'
    })
    .max(20, {
      message: 'Máximo 8 caracteres.'
    })
});

const LoginUser = User.omit({ username: true });

export { User, LoginUser };

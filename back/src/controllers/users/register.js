import bcrypt from 'bcrypt';
import crypto from 'node:crypto';

import DB from '../../db/configDB.js';
import { errorMap } from '../../helpers/errorMap.js';
// import { CreateUserSchema } from '../../models/user.model.js';
import { CreateUserSchema } from '../../schemas/userSchema.js';
// import { sendEmail } from '../../helpers/sendEmail.js';

async function registerUser (req, res, next) {
  const { success, error, data } = CreateUserSchema.safeParse(req.body);

  console.log(error);

  if (!success) {
    const errors = errorMap(error);
    return res.send({
      ok: false,
      data: null,
      error: errors
    });
  }

  // Como hemos validado bien, ZOD me devuelve un data
  // console.log(data);
  const { name, last_name, email, password } = data;

  // vamos a encriptar la contraseña
  const salt = 10;
  const hashedPassword = bcrypt.hashSync(password, salt);

  // generamos un confirmation code
  // const confirmationCode = crypto.randomUUID();

  // Añadir a la BBDD el usuario nuevo
  try {
    await DB.sendQuery(DB.query.createUser, [name, last_name, email, hashedPassword]);
  } catch (error) {
    return next(new Error(error.message));
  }

  // const registerEmail = {
  //   to: email,
  //   subject: '¡Bienvenid@! Activa tu cuenta',
  //   content: `
  //     <h1>Hola ${username}, ¡Bienvenid@ a la app de El Prat!</h1>
  //     <h2>Confirma tu cuenta haciendo click en el siguiente enlace</h2>
  //     <a href="http://localhost:5000/users/confirm/${confirmationCode}">Confirmar cuenta</a>
  //   `
  // };

  // await sendEmail(registerEmail);

  res.send({
    ok: true,
    error: null,
    data: null,
    message: 'Usuario registrado correctamente.'
  });
}

export { registerUser };

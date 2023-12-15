import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

import DB from '../../db/configDB.js';
import { errorMap } from '../../helpers/errorMap.js';
// import { CreateUserSchema } from '../../models/user.model.js';
import { CreateUserSchema } from '../../schemas/userSchema.js';
// import { sendEmail } from '../../helpers/sendEmail.js';

async function registerUser (req, res, next) {
  const { success, error, data } = CreateUserSchema.safeParse(req.body);
  console.log(error, data);

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
  const { first_name, last_name, email, password, city } = data;

  // vamos a encriptar la contraseña
  const salt = 10;
  const hashedPassword = bcrypt.hashSync(password, salt);

  // generamos un confirmation code
  // const confirmationCode = crypto.randomUUID();

  // Añadir a la BBDD el usuario nuevo
  try {
    const response = await DB.sendQuery(DB.query.createUser, [first_name, last_name, email, hashedPassword, city]);
    console.log(response);

    //* If user exists in DB generate the tocken for user
    const infoToUser = { id: response.insertId };

    const token = jwt.sign(infoToUser, process.env.JWT_SECRET, { expiresIn: '15 day' });

    infoToUser.exp = Date.now() + (1000 * 60 * 60 * 24);

    if (token !== undefined) {
      res.send({
        ok: true,
        message: 'User is logged!',
        error: null,
        token,
        user: infoToUser
      });
    } else {
      res.status(400).send({
        ok: false,
        message: 'Wrong login'
      });
    }
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

  // res.send({
  //   ok: true,
  //   error: null,
  //   data: null,
  //   message: 'Usuario registrado correctamente.'
  // });
}

export { registerUser };

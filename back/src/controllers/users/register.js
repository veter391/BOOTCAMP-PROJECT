// import bcrypt from 'bcrypt';
// import crypto from 'node:crypto'

// import { sendQuery } from '../../db/connectDB.js';
// import { zodErrorMap } from '../../helpers/zodErrorMap.js';
// import { User } from '../../schemas/User.js';
// import { query } from '../../db/queries.js';
// import { sendEmail } from '../../helpers/sendEmail.js';

// async function registerUser (req, res, next) {
//   const { success, error, data } = User.safeParse(req.body);

//   if (!success) {
//     const errors = zodErrorMap(error);
//     return res.send({
//       ok: false,
//       data: null,
//       error: errors
//     });
//   }

//   // Como hemos validado bien, ZOD me devuelve un data
//   const { username, email, password } = data;

//   // vamos a encriptar la contraseña
//   const salt = 10;
//   const hashedPassword = bcrypt.hashSync(password, salt);

//   // generamos un confirmation code
//   const confirmationCode = crypto.randomUUID();

//   // Añadir a la BBDD el usuario nuevo
//   try {
//     await sendQuery(query.addUser, [username, email, hashedPassword, confirmationCode]);
//   } catch (error) {
//     return next(new Error(error.message));
//   }

//   const registerEmail = {
//     to: email,
//     subject: '¡Bienvenid@! Activa tu cuenta',
//     content: `
//       <h1>Hola ${username}, ¡Bienvenid@ a la app de El Prat!</h1>
//       <h2>Confirma tu cuenta haciendo click en el siguiente enlace</h2>
//       <a href="http://localhost:5000/users/confirm/${confirmationCode}">Confirmar cuenta</a>
//     `
//   };

//   await sendEmail(registerEmail);

//   res.send({
//     ok: true,
//     error: null,
//     data: null,
//     message: 'Usuario registrado correctamente.'
//   });
// }

// export { registerUser };

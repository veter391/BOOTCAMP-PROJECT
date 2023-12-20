import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import crypto from 'node:crypto';
// import nodemailer from '../../helpers/nodemailer.js';

import DB from '../../db/configDB.js';
import { errorMap } from '../../helpers/errorMap.js';
import { CreateUserSchema } from '../../schemas/userSchema.js';
import { CreateOrganizationSchema } from '../../schemas/organizationSchema.js';
// import emailService from '../../helpers/nodemailer.js';

async function registerUser (req, res, next) {
  // N: chack if object has cif and return true or false
  const isCompany = Object.hasOwn(req.body, 'cif');
  // return company or user valid data
  const { success, error, data } = isCompany ? CreateOrganizationSchema.safeParse(req.body) : CreateUserSchema.safeParse(req.body);

  console.log(success, error, data);

  if (!success) {
    const errors = errorMap(error);
    return res.send({
      ok: false,
      data: null,
      error: errors
    });
  }

  // valid data from zod
  const {
    first_name,
    last_name,
    org_name,
    email,
    password,
    description,
    city,
    address,
    avatar,
    cif,
    type
  } = data;

  // hashing password
  const salt = 10;
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Add new user/org to BD
  try {
    // N: send query to BD
    const response = await DB.sendQuery(DB.query.createUser, [
      first_name,
      last_name,
      org_name,
      email,
      hashedPassword,
      description,
      city,
      address,
      avatar,
      cif,
      type
    ]
    );

    //* If user exists in DB generate the tocken for user
    const infoToUser = {
      id: response.insertId,
      type: type,
      avatar: avatar,
      city: city,
      name: org_name || `${first_name} ${last_name || ''}`,
      follows: '',
      reactions: ''
    };

    const token = jwt.sign(infoToUser, process.env.JWT_SECRET, { expiresIn: '15 day' });

    infoToUser.exp = Date.now() + (1000 * 60 * 60 * 24);
    // generate confirmation code
    // const confirmationCode = crypto.randomUUID();

    // const emailData = {
    //   to: email,
    //   confirmationCode,
    //   usuario: `${first_name} ${last_name}`
    // };

    // emailService.sendConfirmationEmail(emailData);

    console.log(token);
    if (token) {
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

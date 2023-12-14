// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB from '../../db/configDB.js';
import { HttpError } from '../../models/HttpError.js';
import { errorMap } from '../../helpers/errorMap.js';
import { LoginUser } from '../../models/user.model.js';
// import { LoginUser } from '../../schemas/User.js';

async function logIn (req, res, next) {
  // N: validate user when login
  const { success, error, data } = LoginUser.safeParse(req.body);

  if (!success) {
    const errors = errorMap(error);
    return res.status(400).send({
      ok: false,
      data: null,
      message: null,
      error: errors
    });
  }

  const { email, password: realPassword } = data;

  try {
    // Check if user exists in BD
    const [user] = await DB.sendQuery(DB.query.checkEmail, [email]);

    if (!user) {
      return next(new HttpError(400, 'Something wrong email is fail'));
    }

    // Compare passwords
    // const isValidPassword = await bcrypt.compare(realPassword, user.pass);
    const isValidPassword = await realPassword === user.password;

    if (!isValidPassword) {
      return next(new HttpError(400, 'Something wrong password is fail'));
    }
    //* If user exists in DB generate the tocken for user
    const infoToUser = { id: user.id };

    const token = jwt.sign(infoToUser, process.env.JWT_SECRET, { expiresIn: '15 day' });

    infoToUser.exp = Date.now() + (1000 * 60 * 60 * 24);

    if (token !== undefined) {
      res.send({
        ok: true,
        message: 'User is logged!',
        error: null,
        token,
        user
      });
    } else {
      res.send({
        ok: false,
        message: 'Wrong login'
      });
    }
  } catch (error) {
    return next(error);
  }
}

export { logIn };

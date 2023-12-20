import bcrypt from 'bcrypt';
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

    const follows = await DB.sendQuery(DB.query.getFollowers, [user.id]);
    const reactions = await DB.sendQuery(DB.query.getReactions, [user.id]);
    // console.log(Object.values(JSON.parse(follows)), Object.values(JSON.parse(reactions)));
    console.log(follows.map(e => e.user_id));

    // Compare passwords
    const isValidPassword = await bcrypt.compare(realPassword, user.password);
    // const isValidPassword = true;

    if (!isValidPassword) {
      return next(new HttpError(400, 'Something wrong password is fail'));
    }
    //* If user exists in DB generate the tocken for user
    const infoToUser = {
      id: user.id,
      avatar: user.avatar,
      city: user.city,
      type: user.type,
      name: user.org_name || `${user.first_name} ${user.last_name ? user.last_name : ''}`,
      follows: follows.map(e => e.user_id),
      reactions: reactions.map(e => e.event_id)
    };

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
    return next(error);
  }
}

export { logIn };

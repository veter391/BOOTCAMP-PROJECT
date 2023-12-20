import jwt from 'jsonwebtoken';

function userAuth (req, res, next) {
  // const token = req.headers.authorization.slice(7);
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  console.log('user auth');

  try {
    const infoUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = infoUser;
    next();
  } catch (error) {
    return res.status(401).send({
      ok: false,
      message: null,
      error: 'Token inválido o expirado',
      data: null
    });
  }
}

export default userAuth;

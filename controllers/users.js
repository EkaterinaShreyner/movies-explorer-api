const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { SUCCESS_CREATE__REQUEST, errorMessage } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

// создание нового пользователя
function createUser(req, res, next) {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(SUCCESS_CREATE__REQUEST).send(
      {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
    ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessage.userData));
      }
      if (err.code === 11000) {
        return next(new ConflictError(errorMessage.userEmail));
      }
      return next(err);
    });
}

// запрос текущего пользователя
function getCurrentUser(req, res, next) {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessage.userId);
      }
      return res.send(user);
    })
    .catch((err) => next(err));
}

// создание контроллера аутентификации
function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создание токена
      const token = jwt.sign(
        { _id: user._id }, // зашифрованный в строку объект пользователя
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
}

// замена данных пользователя
function patchUser(req, res, next) {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessage.userData));
      }
      if (err.code === 11000) {
        return next(new ConflictError(errorMessage.userEmail));
      }
      return next(err);
    });
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
  patchUser,
};

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, _res, next) {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что token есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessage.userAuth);
  }
  // извлеваем токен, в переменную token запишется только JWT
  const token = authorization.replace('Bearer ', '');
  // верифицируем токен, вернёт пейлоуд токена
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError(errorMessage.userAuth));
  }
  // записываем пейлоуд в объект запроса
  req.user = payload;
  // пропускаем запрос дальше
  next();
}

module.exports = auth;

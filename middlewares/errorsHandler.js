const { errorMessage } = require('../utils/constants');

function errorsHandler(err, _req, res, next) {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500
      ? errorMessage.server
      : message,
  });
  next();
}

module.exports = errorsHandler;

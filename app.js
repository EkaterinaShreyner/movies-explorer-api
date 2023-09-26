/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const auth = require('./middlewares/auth');
const limiter = require('./middlewares/rateLimit');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const authorizationRouter = require('./routes/authorization');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const { errorMessage } = require('./utils/constants');

const { PORT = 4000 } = process.env;
const { bitfilmsdb } = process.env;
const app = express();

app.use(cors({ origin: ['http://localhost:3001', 'https://my-movies.nomoredomainsicu.ru'] }));
// app.use(cors({ origin: ['http://localhost:3000', 'https://my-movies.nomoredomainsicu.ru'] }));

app.use(helmet());

mongoose.connect(bitfilmsdb, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('БД подключена');
  })
  .catch((err) => {
    console.error(`Ошибка при подключении к БД: ${err.massage}`);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use('/', authorizationRouter);

app.use(auth);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use('/*', (_req, _res, next) => {
  next(new NotFoundError(errorMessage.notFound));
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

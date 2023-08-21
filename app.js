const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
// const moviesRouter = require('./routes/movies');
const authorizationRouter = require('./routes/authorization');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(MONGO_URL, {
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

app.use('/', authorizationRouter);

app.use('/users', usersRouter);
// app.use('/movies', moviesRouter);

app.use('/*', (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
const SUCCESS__REQUEST = 200;
const SUCCESS_CREATE__REQUEST = 201;

const errorMessage = {
  userData: 'Переданы некорректные данные',
  userEmail: 'Пользователь с таким email уже существует',
  userId: 'Пользователь c таким id не найден',
  langRu: 'Название должно быть на русском языке',
  langEn: 'Название должно быть на английском языке',
  url: 'Некорректный URL',
  email: 'Некорректный Email',
  userCredentials: 'Неправильные email или пароль',
  userAuth: ' Необходима авторизация',
  server: 'На сервере произошла ошибка',
  movieId: 'Фильм с таким id не найдена',
  movieOwner: 'Попытка удаление чужого фильма невозможна',
  movieData: 'Переданы некорректные данные фильма',
  movieDataId: 'Переданы некорректные данные id фильма',
  notFound: 'Страница не найдена',
};

const regex = /https?:\/\/(www\.)?[a-z0-9-]+\.[a-z0-9-.,;_:/?!%@$&#[\]()+-=]+/i;

module.exports = {
  SUCCESS__REQUEST,
  SUCCESS_CREATE__REQUEST,
  regex,
  errorMessage,
};

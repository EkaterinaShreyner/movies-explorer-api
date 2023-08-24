const Movie = require('../models/movie');
const { SUCCESS_CREATE__REQUEST, errorMessage } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// запрос всех фильмов
function getMovies(req, res, next) {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
}

// запрос на создание нового фильма
function createNewMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const userId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((movie) => res.status(SUCCESS_CREATE__REQUEST).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessage.movieData));
      }
      return next(err);
    });
}

// удаление фильма
function deleteMovieById(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessage.movieId);
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError(errorMessage.movieOwner);
      }
      return Movie.findByIdAndRemove(movieId)
        .then((item) => res.send(item));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorMessage.movieDataId));
      }
      return next(err);
    });
}

module.exports = {
  getMovies,
  createNewMovie,
  deleteMovieById,
};

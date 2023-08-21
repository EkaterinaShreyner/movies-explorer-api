const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/constants');

const {
  getMovies,
  createNewMovie,
  deleteMovieById,
  LikeMovie,
  deleteLikeMovie,
} = require('../controllers/cards');


router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(2).max(6),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(6).max(50),
    image: Joi.string().required().regex(regex),
    trailerLink: Joi.string().required().regex(regex),
    thumbnail: Joi.string().required().regex(regex),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), createNewMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovieById);

router.put('/:movieId/likes', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), LikeMovie);

router.delete('/:movieId/likes', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteLikeMovie);

module.exports = router;
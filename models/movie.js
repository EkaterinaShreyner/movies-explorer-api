const mongoose = require('mongoose');
const validator = require('validator');

const { errorMessage } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: errorMessage.url,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: errorMessage.url,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: errorMessage.url,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (text) => validator.isAlphanumeric(text, 'ru-RU', { ignore: ' -' }),
      message: errorMessage.langRu,
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (text) => validator.isAlphanumeric(text, 'en-US', { ignore: ' -' }),
      message: errorMessage.langEn,
    },
  },
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;

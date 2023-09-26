const router = require('express').Router();

const { createNewMovieValidation, deleteMovieByIdValidation } = require('../middlewares/validation');

const {
  getMovies,
  createNewMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', createNewMovieValidation, createNewMovie);

router.delete('/:movieId', deleteMovieByIdValidation, deleteMovieById);

module.exports = router;

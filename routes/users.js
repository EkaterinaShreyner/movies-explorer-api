const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), patchUser);

module.exports = router;

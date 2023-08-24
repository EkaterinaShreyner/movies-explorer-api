const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

// роут создания нового пользователя
router.post('/signup', createUserValidation, createUser);

// роут аутентификации
router.post('/signin', loginValidation, login);

module.exports = router;

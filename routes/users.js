const router = require('express').Router();

const {
  getCurrentUser,
  patchUser,
} = require('../controllers/users');

const { patchUserValidation } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', patchUserValidation, patchUser);

module.exports = router;

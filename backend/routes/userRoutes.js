const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.post('/signup', authenticationController.signupUser);
router.post('/login', authenticationController.loginUser);
router.post(
  '/update',
  authenticationController.sendProtect,
  authenticationController.updateUser
);

module.exports = router;

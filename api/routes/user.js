const express = require('express');
const router = express.Router();

const userControllers = require('../Controllers/user');
const checkAuth = require('../middleware/check-auth')

router.post('/signup' , userControllers.user_signup);
     
router.post('/login', userControllers.user_login)

router.delete('/:userId', checkAuth, userControllers.user_delet)

module.exports = router;
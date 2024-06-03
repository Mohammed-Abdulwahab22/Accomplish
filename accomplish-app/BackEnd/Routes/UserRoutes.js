const express = require('express');
const router = express.Router();
const { createUser, logingUser } = require('../Controllers/userController');


router.post('/register', createUser);
router.post('/login', logingUser);

module.exports = router;
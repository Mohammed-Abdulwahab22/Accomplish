const express = require('express');
const router = express.Router();
const { createUser, logingUser } = require('../Controllers/userController');
const {createPost} = require('../Controllers/postsController');

router.post('/register', createUser);
router.post('/login', logingUser);
router.post('/posts', createPost);

module.exports = router;
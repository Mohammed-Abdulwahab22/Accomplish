const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../Controllers/userController');
// const { checkUser } = require('../Controllers/AuthController');
// const { setProjectDone } = require('../Controllers/TeamTasksController');

router.post('/register', createUser);
// router.post('/login', loginUser);
// router.get('/checkuser', checkUser);
// router.post('/setprojectdone', setProjectDone);

module.exports = router;
const express = require('express');
const router = express.Router();
const { createUser, logingUser } = require('../Controllers/userController');
// const { checkUser } = require('../Controllers/AuthController');
// const { setProjectDone } = require('../Controllers/TeamTasksController');

router.post('/register', createUser);
router.post('/login', logingUser);
// router.get('/checkuser', checkUser);
// router.post('/setprojectdone', setProjectDone);

module.exports = router;
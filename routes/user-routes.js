const express = require('express');
const router = express.Router();

const UserController = require('../controller/user-controller');

router.post('/signup', UserController.addingUsers);

router.post('/login',UserController.userlogin);

router.get('/users', UserController.getUserDetails);

module.exports = router;
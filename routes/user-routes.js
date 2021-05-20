const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const UserController = require('../controller/user-controller');

router.post('/signup', 
[
    // check('name').not().isEmpty(), 
    // check('email').not().isEmpty(),
    // //check('amount').not().isEmpty(),
    // check('mobile').not().isEmpty(),
    // check('cardNo').not().isEmpty(),
    // //check('cvc').not().isEmpty(),
], 
UserController.addingUsers);

router.post('/login',UserController.userlogin);

router.get('/users', UserController.getUserDetails);

module.exports = router;
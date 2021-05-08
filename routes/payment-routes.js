const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const PaymentControllers = require('../controller/payment-controller');

router.post('/payment', 
[
    // check('name').not().isEmpty(), 
    // check('email').not().isEmpty(),
    // //check('amount').not().isEmpty(),
    // check('mobile').not().isEmpty(),
    // check('cardNo').not().isEmpty(),
    // //check('cvc').not().isEmpty(),
], 
PaymentControllers.createPayment);

router.get('/payment', PaymentControllers.getPayment);

module.exports = router;
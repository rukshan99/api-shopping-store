const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const PaymentControllers = require('../controller/payment-controller');

router.post('/payment', 
[], 
PaymentControllers.createPayment);

router.get('/payment', PaymentControllers.getPayment);

module.exports = router;
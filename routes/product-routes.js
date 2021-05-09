const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const ProductControllers = require('../controller/product-controller');

router.post('/form', 
[
    // check('name').not().isEmpty(), 
    // check('email').not().isEmpty(),
    // //check('amount').not().isEmpty(),
    // check('mobile').not().isEmpty(),
    // check('cardNo').not().isEmpty(),
    // //check('cvc').not().isEmpty(),
], 
ProductControllers.addingProducts);

router.get('/products', ProductControllers.getProductDetails);

module.exports = router;
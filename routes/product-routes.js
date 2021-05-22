const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const upload = require('../products/image-upload');
const ProductControllers = require('../controller/product-controller');

router.post('/form', upload.single('image'),
[], 
ProductControllers.addingProducts);

router.get('/product', ProductControllers.findAll);
router.get('/about', ProductControllers.findAll);
router.get('/product/:id', ProductControllers.findOne);
router.put('/product/:id', ProductControllers.update);
router.delete('/about/:id', ProductControllers.delete);

module.exports = router;
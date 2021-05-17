const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const HttpError = require('../model/http-error');
const products = require('../schema/productSchema');

const getProductDetails = async(req, res) => {
    res.send('Product Details.');

}

const addingProducts = async (req, res, next) => {
    console.log('Adding the product');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs! Please check again.', 422));
    }

 

    //const { name, email, amount, mobile, cardNo, expDate, cvc } = req.body;
    const { productName, displaySize, RAMSize, internalMemory, serialNumber, price, imageName, imageData } = req.body;

    const addedProducts = new products({
        //product_id,
        //uid,
        productName,
        displaySize,
        RAMSize,
        internalMemory,
        serialNumber,
        price,
        imageName,
        imageData
    });
    

    


    try{
        //console.log(addedProducts);
        const session = await mongoose.startSession();
        session.startTransaction();
        await addedProducts.save({ session: session });
        await session.commitTransaction();
    } catch(err) {
        const error = new HttpError(
            'Error occured while saving products details. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({products: addingProducts});
};

exports.addingProducts = addingProducts;
exports.getProductDetails = getProductDetails;

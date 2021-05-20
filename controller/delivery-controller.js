const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../model/http-error');
const delivery = require('../schema/deliverySchema');

const getDeliveryDetails = async(req, res) => {
    res.send('Delivery Details.');

}

const createDelivery = async (req, res, next) => {
    console.log('Adding the delivery details');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs! Please check again.', 422));
    }

 

   
    const { Rname, email, phone, addressLine1, addressLine2, city, zip, State, CompanyName, note } = req.body;

    const addedDelivery = new delivery({
        
        Rname,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        zip,
        State,
        CompanyName,
        note

    });


    try{
        //console.log(addedProducts);
        const session = await mongoose.startSession();
        session.startTransaction();
        await addedDelivery.save({ session: session });
        await session.commitTransaction();
    } catch(err) {
        const error = new HttpError(
            'Error occured while saving products details. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({delivery: createDelivery});
};

exports.createDelivery = createDelivery;
exports.getDeliveryDetails = getDeliveryDetails;
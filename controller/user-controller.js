const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../model/http-error');
const products = require('../schema/userSchema');

const getUserDetails = async(req, res) => {
    res.send('User Details.');

}

const addingUsers = async (req, res, next) => {
    console.log('Adding the user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs! Please check again.', 422));
    }

 

    //const { name, email, amount, mobile, cardNo, expDate, cvc } = req.body;
    const { userName, Email, password } = req.body;

    const addUser = new users({
        //product_id,
        //uid,
        userName,
        Email,
        password
    });


    try{
        //console.log(addedProducts);
        const session = await mongoose.startSession();
        session.startTransaction();
        await addUser.save({ session: session });
        await session.commitTransaction();
    } catch(err) {
        const error = new HttpError(
            'Error occured while saving products details. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({users: addingUsers});
};

exports.addingUsers = addingUsers;
exports.getUserDetails = getUserDetails;

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const HttpError = require('../model/http-error');
const Payment = require('../schema/paymentSchema');
//const User = require();
const GenerateResponse = require('../payment/payment-gateway');
const MailService = require('../service/email-service');
const MessageService = require('../service/message-service');

require('dotenv').config({path: __dirname + '/.env'})

const STRIPE_SECRET_KEY = process.env['STRIPE_SECRET_KEY'];
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const getPayment = async(req, res) => {
    res.send('Payment Gateway.');
}

const createPayment = async (req, res, next) => {
    console.log('creating the payment');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs! Please check again.', 422));
    }
    if(!req.body.mobilePay) {
        try {

            // Create the PaymentIntent
            let intent = await stripe.paymentIntents.create({
              payment_method: req.body.payment_method_id,
              description: "Test payment",
              amount: req.body.amount * 100,
              currency: 'usd',
              confirmation_method: 'manual',
              confirm: true
            });
            
            // Send the response to the client
            res.send(GenerateResponse(intent));
            
          } catch (e) {
            // Display error on client
            return res.send({ error: e.message });
          }
    }
    try {
        MailService(req.body);
        MessageService(req.body.mobile);
        console.log(req.body.mobile);
    } catch (error) {
        console.log(error);
    }
    
    //const { name, email, amount, mobile, cardNo, expDate, cvc } = req.body;
    const { payment_method_id, name, email, amount, mobile } = req.body;

    const createdPayment = new Payment({
        payment_method_id: payment_method_id || uuid(),
        //uid,
        name,
        email,
        amount,
        paymentDate: new Date(),
        mobile
        //cardNo,
        //expDate,
        //cvc
    });

    // let user;
    // try{
    //     user = await User.findById(uid);
    // } catch(err) {
    //     const error = new HttpError(
    //         'Creating place failed, please try again.',
    //         500
    //     );
    //     return next(error);
    // }

    // if(!user) {
    //     const error = new HttpError('User does not exist for the provided id.', 500);
    //     return next(error);
    // }

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdPayment.save({ session: session });
        //user.payments.push(createdPayment);
        //await user.save({ session: session});
        await session.commitTransaction();
    } catch(err) {
        const error = new HttpError(
            'Error occured while saving payment details. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({payment: createPayment});
};

exports.createPayment = createPayment;
exports.getPayment = getPayment;

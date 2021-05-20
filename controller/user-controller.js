const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../model/http-error');
const Register = require('../schema/userSchema');
const users = require('../schema/userSchema');


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
    const { username, email, password } = req.body;

    const addUser = new users({
        //product_id,
        //uid,
        username,
        email,
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
            'Error occured while saving user details. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({users: addingUsers});
};

const userlogin = async(req,res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        // console.log(`${email} and password is ${password}`)
        if(email == "admin@gdc.com" && password == "admin@123"){
            console.log("admin login")
            res.writeHead(302, {
                Location: 'http://localhost:3000/payment'
            });
            res.end();
            

        }

        const useremail = await Register.findOne({email : email});
        

        if(useremail.password === password){
            console.log("matching");
            
        }else{
           console.log("The password is incorrect")
           alert("The product has been added to cart.")
        }


    } catch (error) {
        res.status(400).send("Invalid Email")
    }
}

exports.addingUsers = addingUsers;
exports.getUserDetails = getUserDetails;
exports.userlogin = userlogin;

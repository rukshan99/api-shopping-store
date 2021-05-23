const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../model/http-error');
const Register = require('../schema/userSchema');
const users = require('../schema/userSchema');


const getUserDetails = async (req, res) => {
    res.send('User Details.');

}

const addingUsers = async (req, res, next) => {
    console.log('Adding the user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs! Please check again.', 422));
    }

    const { username, email, password } = req.body;

    const mail = req.body.email;
    const useremail = await Register.findOne({ email: mail });

    if(!useremail){

    const addUser = new users({
        username,
        email,
        password
    });


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await addUser.save({ session: session });
        await session.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Error occured while saving user details. Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ users: addingUsers });
}
res.send("fail");
};

const userlogin = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        // console.log(`${email} and password is ${password}`)
        if (email === "admin@gdc.com" && password === "admin@123") {
            console.log("admin login")
            res.send("Admin");
        }else if(email === "admin@gdc.com" && password !== "admin@123"){
            console.log("The password is incorrect")
            res.send("Fail")

        }


        const useremail = await Register.findOne({ email: email });

        if (useremail.password === password) {
            console.log("matching");
            res.send({result :"Pass",username:useremail.username});
        } else {
            console.log("The password is incorrect")
            res.send("Fail")

        }


    } catch (error) {
        res.status(400).send("Invalid Email")
    }
}

exports.addingUsers = addingUsers;
exports.getUserDetails = getUserDetails;
exports.userlogin = userlogin;

const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');


const productSchema = require('../schema/productSchema');

require('dotenv/config');
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });

module.exports = upload;
const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
  Rname: {
    type: String,
    required: [true, 'Reciver Name is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail date is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  addressLine1: {
    type: String,
    required: [true, 'Address Line 01 is required']
  },
  addressLine2: {
    type: String,
    required: [true, 'Address Line 02 is required']
  },
  city: {
    type: String,
    required: [true, 'city is required']
  },
  zip: {
    type: String,
    required: [true, 'Zip code is required']
  },
  State: {
    type: String,
    required: [true, 'State code is required']
  },
  CompanyName: {
    type: String,
    required: [true, 'Company Name is required']
  },
  note: {
    type: String,
    required: [false, 'note is not required']
  }
  
})

module.exports = deliverySchema;
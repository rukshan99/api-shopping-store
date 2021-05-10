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
  address: {
    type: String,
    required: [true, 'Address date is required']
  },
  city: {
    type: String,
    required: [true, 'city is required']
  },
  zip: {
    type: String,
    required: [true, 'Zip code is required']
  },
  note: {
    type: String,
    required: [false, 'note is not required']
  }
  
})

module.exports = deliverySchema;
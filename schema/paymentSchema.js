const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail date is required']
  },
  cardNo: {
    type: String,
    required: [true, 'Card number is required']
  },
  expDate: {
    type: String,
    required: [true, 'Expiration date is required']
  },
  cvc: {
    type: String,
    required: [true, 'CVC is required']
  }
})

module.exports = paymentSchema;
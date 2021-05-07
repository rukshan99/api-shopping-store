const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: [true, 'Payment ID is required']
  },
  uid: {
    type: String,
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required']
  },
  amount: {
    type: String,
    required: [true, 'Amount is required']
  },
  paymentDate: {
    type: String,
    required: [true, 'Payment date is required']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required']
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

module.exports = mongoose.model('Payment', paymentSchema);
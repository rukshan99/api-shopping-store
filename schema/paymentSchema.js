
const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  payment_method_id: {
    type: String,
    required: [true, 'Payment ID is required']
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
  }

})

module.exports = mongoose.model('Payment', paymentSchema);
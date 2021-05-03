const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail date is required']
  },
  password: {
    type: String,
    required: [true, 'Passowrd is required']
  }
})

module.exports = userSchema;
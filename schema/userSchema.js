const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required']
  },
  password: {
    type: String,
    required: [true, 'Passowrd is required']
  }
})

module.exports = mongoose.model('users', userSchema);
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
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

const Register = new mongoose.model('users', userSchema);

module.exports = Register;
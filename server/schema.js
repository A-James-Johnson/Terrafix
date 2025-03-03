const mongoose = require('mongoose')


const signupdataSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    }
  });
  

  const Signup = mongoose.model('Signupschema', signupdataSchema)

module.exports = { Signup }


 const mongoose = require('mongoose')
  const userSchema = new mongoose.Schema({
      name:{
          type: String,
          required: true,
          min:6
      },
      email:{
        type: String,
        required: true,
        min:6,
        max:255
      },
      password:{
        type: String,
        required: true,
        min:6
      },
      date:{
          type: Date,
          defult: Date.now()
      }
  })

  module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      phonenumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 12
      },
     
      street1: {
        type: String,
        required:true,
      },
      street2: {
        type: String,
      },
      city: {
        type: String,
        required:true,
      },
      state: {
        type: String,
        required:true,
      },
      pincode: {
        type: String,
        required:true,
        minlength: 6,
        maxlength: 6
      },
   
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
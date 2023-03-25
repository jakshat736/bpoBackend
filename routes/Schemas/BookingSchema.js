const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  
    userName: {
    type: String,
    required: true
  },
  userId:{
    type:String,
    required: true
  },
  categoryId:{
    type:String,
    required: true
  },
  subCategoryId:{
    type:String,
    required: true
  },
  bookingDate:{
    type:String,
    required: true
  },
  bookingTime:{
    type:String,
    required: true
  },
  
  bookingAddress:{
    type:String,
    required: true
  },
  userPhoneNumber:{
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12
  },

  
 
  
});

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;

const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
var Bookings=require('./Schemas/BookingSchema')

/* GET home page. */
router.post('/addbooking',upload.single() , async (req, res) => {
  console.log("sssssssssss",req.body)
  try {
    const bookings = new Bookings(req.body);
    const booked=await bookings.save();
    return  res.status(200).json({status:true,booking_id: booked._id})
  } 
  catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    
  }
});
router.get('/displayallbookings', async (req, res) => {
 
  

  try {
    const bookings = await Bookings.find();
    return  res.status(200).json(bookings)
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false})
  }
});


module.exports = router;
const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
var TimeSlot=require('./Schemas/TimeSchema')


router.post('/time-slot',upload.single(), (req, res) => {
    const { date, time } = req.body;
    console.log(date)
    const timeSlot = new TimeSlot({ date, time });
    timeSlot.save()
      .then(() => res.status(201).send('Time slot created'))
      .catch((err) =>
     
       res.status(500).send(err.message)
       );
  });

  router.post('/check-datetime',upload.single() ,async (req, res) => {
    const { date, time } = req.body; // retrieve date and time from the request body sent from frontend
  
    
  
    // check if date and time already exist in the database
    const existingDateTime = await TimeSlot.findOne({ date,  time });
  
    if (existingDateTime) {
      // date and time already exist in the database
      return  res.status(200).json({status:true})
    } else {
      // date and time do not exist in the database
      
      return  res.status(500).json({status:false})
    }
  });
  
  module.exports = router;
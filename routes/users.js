const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
var User=require('./Schemas/UserSchema')

/* GET home page. */
router.post('/adduser', upload.single(), async (req, res) => {
  try {
    const existingUser = await User.findOne({ phonenumber: req.body.phonenumber }); // check if user with given phone number already exists
    if (existingUser) {
      return res.status(200).json({ status: true, user_id: existingUser._id }); // return true and existing user's _id in the response
    } else {
      const newUser = new User(req.body); // create a new user object using the data from the request body
      const savedUser = await newUser.save(); // save the new user to the database and get the saved user object
      return res.status(200).json({ status: true, user_id: savedUser._id }); // return the saved user's _id in the response
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});
router.get('/displayallusers', async (req, res) => {
 
  

  try {
    const users = await User.find();
    return  res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false})
  }
});


module.exports = router;
const { json } = require('express');
var express = require('express');
const upload = require('./multer');
const pool = require('./pool');
var router = express.Router();
var Category=require('./Schemas/CategorySchema')

/* GET home page. */

  router.post('/addcategory',upload.single() , async (req, res) => {
    console.log("sssssssssss",req.body)
    try {
      const category = new Category(req.body);
      await category.save();
      return  res.status(200).json({status:true})
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({status:false})
      
    }
  });
  router.post('/getcategoriesbylanguage',upload.single() , async (req, res) => {
    const { language } = req.body;
    console.log(req.body)
    try {
      const categories = await Category.find({ language: language }).exec();
      return res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err });
    }
  });
  
  router.get('/displayallcategories', async (req, res) => {
   
    

    try {
      const categories = await Category.find();
      return  res.status(200).json(categories)
    } catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    }
  });

  router.post('/:id/update', getCategory, async (req, res) => {
    try {
      res.category.name = req.body.categoryName;
      await res.category.save();
      return  res.status(200).json({status:true});
    } catch (err) {
      res.status(500).json({ status:false });
    }
  });

  router.post('/:id/delete', getCategory, async (req, res) => {
    try {
      await res.category.remove();
      return  res.status(200).json({ status:true});
    } catch (err) {
      res.status(500).json({ status:false});
    }
  });
  async function getCategory(req, res, next) {
    let category;
  
    try {
      category = await Category.findById(req.params.id);
  
      if (category == null) {
        return res.status(404).json({ message: 'Cannot find category' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.category = category;
    next();
  }
module.exports = router;
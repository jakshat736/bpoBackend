const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
var SubCategory=require('./Schemas/SubCategorySchema')

/* GET home page. */

router.post('/addsubcategory',upload.single() , async (req, res) => {
  console.log("sssssssssss",req.body)
  try {
    const category = new SubCategory(req.body);
    await category.save();
    return  res.status(200).json({status:true})
  } 
  catch (error) {
      console.log(error)
      return res.status(500).json({status:false})
    
  }
});

router.post('/getsubcategoriesbycategory',upload.single() , async (req, res) => {
  const { categoryId } = req.body;
  console.log(req.body)
  try {
    const subcategories = await SubCategory.find({ categoryId: categoryId }).exec();
    return res.status(200).json(subcategories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
});

router.get('/displayallsubcategories', async (req, res) => {
   
    

  try {
    const subcategories = await SubCategory.find();
    return  res.status(200).json(subcategories)
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false})
  }
});



router.post('/:id/update', getSubCategory, async (req, res) => {
  try {
    res.subcategory.name = req.body.subcategoryName;
    res.subcategory.price=req.body.price;
    res.subcategory.categoryId=req.body.categoryId;
    await res.subcategory.save();
    return  res.status(200).json({status:true});
  } catch (err) {
    res.status(500).json({ status:false });
  }
});

router.post('/:id/delete', getSubCategory, async (req, res) => {
  try {
    await res.subcategory.remove();
    return  res.status(200).json({ status:true});
  } catch (err) {
    res.status(500).json({ status:false});
  }
});
async function getSubCategory(req, res, next) {
  let subcategory;

  try {
    subcategory = await SubCategory.findById(req.params.id);

    if (subcategory == null) {
      return res.status(404).json({ message: 'Cannot find sub category' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subcategory = subcategory;
  next();
}
module.exports = router;
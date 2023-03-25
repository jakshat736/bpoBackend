const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  
    categoryId: {
    type: String,
    required: true
  },
    subcategoryName: {
    type: String,
    required: true
  },
    price: {
    type: String,
    required: true
  },
  
 
  
});

const SubCategory = mongoose.model('SubCategory', subcategorySchema);

module.exports = SubCategory;
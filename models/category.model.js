let mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    CategoryName: String
  },
  { timestamps: true },
);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;

let mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;

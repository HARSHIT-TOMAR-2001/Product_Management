let mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    qtyPerUnit: Number,
    unitPrice: Number,
    unitInStock: Number,
    discontinued: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
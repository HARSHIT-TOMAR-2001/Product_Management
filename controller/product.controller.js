require('dotenv').config();

const mongoose = require('mongoose');
const Category = require('../models/category.model');
const Product = require('../models/product.model');
const ObjectId = mongoose.Types.ObjectId;

const createProduct = async (req, res) => {
  const { productName, qtyPerUnit, unitPrice, discontinued, categoryName } = req.body;
  const id = req.body._id ? req.body._id : new mongoose.Types.ObjectId();
  try {
    // 1-check if category name is there in the request
    if (categoryName) {
        
      //1.1-check if category already exist
      const categoryName_lowerCase = categoryName.toLowerCase();
      const category = await Category.find({
        CategoryName: categoryName_lowerCase,
      });

      // 1.2-if not exist , create a new category.
      if (!category.length) {
        const newCategory = new Category({
          CategoryName: categoryName_lowerCase,
        });
        const newCategoryCreated = await newCategory.save();

        const product = new Product({
          _id: id,
          productName,
          qtyPerUnit,
          unitPrice,
          discontinued,
          categoryId: newCategoryCreated.id,
        });
        await product.save();
        res
          .status(200)
          .send({ success: true, message: 'Product added successfully' });
      }
      // 1.3-if already exist use the existing category Id.
      else {
        const product = new Product({
          _id: id,
          productName,
          qtyPerUnit,
          unitPrice,
          discontinued,
          categoryId: category[0].id,
        });
        await product.save();
        res
          .status(200)
          .send({ success: true, message: 'Product added successfully' });
      }
    }
    // 2-If no category is mentioned in the request, save it as null.
     else {
      const product = new Product({
        _id: id,
        productName,
        qtyPerUnit,
        unitPrice,
        discontinued,
        categoryId:null
      });
      await product.save();
      res
        .status(200)
        .send({ success: true, message: 'Product added successfully' });
    }
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { productName, qtyPerUnit, unitPrice, discontinued, categoryName } = req.body;
  const { productId } = req.params;
  try {
    const product = await Product.findById(ObjectId(productId));
    if (!product) {
      return res
        .status(400)
        .send({ success: false, message: 'No Product exist with this Id' });
    }

    if (categoryName) {
      const categoryName_lowerCase = categoryName.toLowerCase();
      const category = await Category.find({
        CategoryName: categoryName_lowerCase,
      });
      if (!category.length) {
        const newCategory = new Category({
          CategoryName: categoryName_lowerCase,
        });
        const newCategoryCreated = await newCategory.save();
        const product = await Product.findByIdAndUpdate(productId, {
          productName,
          qtyPerUnit,
          unitPrice,
          discontinued,
          categoryId: newCategoryCreated.id,
        });
        await product.save();
        res
          .status(200)
          .send({ success: true, message: 'Product updated successfully' });
      } else {
        const product = await Product.findByIdAndUpdate(productId, {
          productName,
          qtyPerUnit,
          unitPrice,
          discontinued,
          categoryId: category[0].id,
        });
        await product.save();
        res
          .status(200)
          .send({ success: true, message: 'Product updated successfully' });
      }
    } else {
      const product = await Product.findByIdAndUpdate(productId, {
        productName,
        qtyPerUnit,
        unitPrice,
        discontinued,
        categoryId: null,
      });
      await product.save();
      res
        .status(200)
        .send({ success: true, message: 'Product updated successfully' });
    }
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

const readProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(ObjectId(productId)).populate(
      'categoryId'
    );
    if (!product) {
      return res
        .status(400)
        .send({ success: false, message: 'No Product exist with this Id' });
    }

    return res
      .status(200)
      .send({ success: true, message: 'Product found', details: product });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

const readAllProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const products = await Product.find({}).populate('categoryId');
    if (!products) {
      return res
        .status(400)
        .send({ success: false, message: 'There are no products' });
    }

    return res
      .status(200)
      .send({ success: true, message: 'Products found', list: products });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(ObjectId(productId));
    if (!product) {
      return res
        .status(400)
        .send({ success: false, message: 'No Product exist with this Id' });
    }
    await Product.findByIdAndRemove(productId);

    return res
      .status(200)
      .send({ success: true, message: 'Product deleted Successfully' });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  readProduct,
  readAllProduct,
  deleteProduct,
};

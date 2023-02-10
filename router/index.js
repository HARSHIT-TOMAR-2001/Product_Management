const productRouter = require('./product.router');
const Router = require('express').Router();

Router.use('/product', productRouter);

module.exports = Router;

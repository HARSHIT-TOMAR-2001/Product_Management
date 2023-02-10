const {createProduct, updateProduct, readProduct, readAllProduct, deleteProduct} = require('../controller/product.controller');

const productRouter = require('express').Router();

productRouter.post('/create', createProduct );
productRouter.put('/:productId/update',updateProduct );
productRouter.get('/:productId/read',readProduct );
productRouter.get('/readAll', readAllProduct);
productRouter.delete('/:productId/delete', deleteProduct);

module.exports = productRouter;

const express = require('express');
const { getProducts, addProduct, deleteProduct } = require('../controllers/product')

const router = express.Router();

// Write the code to specify the route of getProduct, addProduct and deleteProduct method
router.route('/:userId').post(addProduct);
router.route('/:userId').get(getProducts);
router.route('/:productId').delete(deleteProduct);

module.exports = router
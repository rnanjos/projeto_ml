const { Router } = require('express');

const productController = require('../controllers/ProductController');

const router = Router();

/** Routes products */
router.get('/items', productController.index);
router.get('/items/:id', productController.show);

module.exports = router;


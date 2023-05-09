const express =  require('express');

const router =  express.Router();

const productController =   require('../controllers/productController');
const AuthController  =  require('../controllers/AuthController');


router.use(AuthController.protect);

router.post('/new_product', productController.createProduct);
router.patch('/update_product/:id', productController.updateProduuct);
router.get('/all_products', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.patch('/soft_delete/:id', productController.softDeleteProduct);


module.exports =  router;
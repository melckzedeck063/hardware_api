const express = require('express');

const router = express.Router({ mergeParams : true });

const AuthController = require('../controllers/AuthController');
const SalesController = require('../controllers/salesController');


router.route('/monthly').get(SalesController.monthlyReport);
router.use(AuthController.protect);

router.route('/sale_now').post(SalesController.createSale);

// router.use(AuthController.restrictTo('admin', 'bursar'))
router.route('/all_sales').get(SalesController.getSales);


module.exports = router;
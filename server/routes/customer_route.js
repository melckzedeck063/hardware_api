const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');
const CustomerController = require('../controllers/customerController');

router.use(AuthController.protect);

router.post('/new_customer',CustomerController.registerCustomer );
router.get('/customers', CustomerController.getCustomers);
router.get('/customer/:id', CustomerController.getCustomer);
router.patch('/update_customer/:id', CustomerController.upateCustomer)

module.exports = router;
const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');
const DashboardController = require('../controllers/dashboard_controller');


router.route('/all').get(DashboardController.productSummary)

module.exports = router;
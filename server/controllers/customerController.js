const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('../controllers/factoryController');
const  Customer =  require('../models/customerModel')

exports.registerCustomer = factory.createOne(Customer);

exports.getCustomers = factory.getAll(Customer);

exports.getCustomer = factory.getOne(Customer);

exports.upateCustomer = factory.updateOne(Customer);
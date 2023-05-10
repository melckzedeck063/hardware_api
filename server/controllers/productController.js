const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');


const Product =  require('../models/productModel');

const sendResponse = (statusCode, res, message, data) =>{
    res.status(statusCode).json({
        status : "Success",
        message : message,
        data : data
    })
}

exports.createProduct = catchAsync( async (req,res,next) => {
    const new_product = await Product.create({
        productName : req.body.productName,
        buyingPrice  :  req.body.buyingPrice,
        sellingPrice  :  req.body.sellingPrice,
        wholeSale :  req.body.sellingPrice,
        memberPrice : req.body.memberPrice,
        quantity : req.body.quantity,
        date_published :  req.body.date_published,
        created_by :  req.user.id,
        deleted : req.body.deleted,
    });

    if(!new_product){
        return  next(new AppError("Failed to create new product please try again", 400))
    }

    sendResponse(201,res, "new product created succesfully", new_product);

})


exports.getAllProducts =  catchAsync( async (req,res, next) => {
    const all_products = await Product.find({deleted : false});

    if(!all_products) {
        return  next(new AppError("No data found in this document", 404))
    }

    sendResponse(200, res, "data found succesfully", all_products)
})

exports.getProductById = catchAsync( async (req,res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new AppError("No data found with that id", 404))
    }

    sendResponse(200, res, "data found", product)
})

exports.updateProduuct =  catchAsync(async (req,res,next) =>  {
    const current_product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new :  true,
        runValidators : true
    })

    if(!current_product){
        return  next(new  AppError("No data found with that ID", 404))
    }

    sendResponse(203, res, "Product succesfully  updated", current_product)
})

exports.softDeleteProduct =  catchAsync (async (req,res,next) => {
    const product =   await Product.findByIdAndUpdate(req.params.id,{
        deleted : req.body.deleted
    }, 
    {
        new :  true,
        runValidators  :  true
    }
    )

    if(!product){
        return  next(new AppError("No data found  with that ID", 404))
    }

    sendResponse(203, res, "Soft delete succesfull", product)
})
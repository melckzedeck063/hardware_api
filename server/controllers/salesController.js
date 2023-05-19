const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('../controllers/factoryController')
const Sales = require('../models/salesModel');
// const url = require('url');


const notify = (data, statusCode, res, message) => {
    res.status(statusCode).json({
        status: 'success',
        message: message,
        empty: false,
        data: {
            data
        }
     })
}

exports.createSale = catchAsync(async (req, res, next) => {

    if (!req.body.sold_by) req.body.sold_by = req.user.id;
    if (!req.body.product) req.body.product = req.params.id;

    const new_sale = await Sales.create(req.body);
    if (!new_sale) {
        return next(new AppError('Failed to create new sale', 400));
    }

    
    notify(new_sale, 201, res, 'New sell recorded succesfull');

})

exports.getSales = catchAsync( async (req,res,next) =>  {
    const all_sales = await Sales.find();

    if(!all_sales){
        return next (new  AppError("No data  found in this  document", 404))
    }

    res.status(200).json({
        status : "Success",
        message : "Data found",
        data : {
            all_sales
        }
    })
})

exports.monthlyReport = catchAsync(async (req, res, next) => {
    
    const start = `${req.query.start}T00:00:00`;
    const end = `${req.query.end}T23:59:59`;
    console.log(start);
    console.log(end);
    console.log(new Date())


    const monthly_report = await Sales.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: "_id",
                as : "products"
            }
            
        },
        {
            $lookup: {
                from: "users",
                localField: "sold_by",
                foreignField: "_id",
                as :"seller"
            }   
        },
        {
            $unwind : '$date_sold'
        },
        {
            $match: {
                date_sold: {
                    $gte: new Date(`${start}`),
                    $lte : new Date(`${end}`)
                }
            }
        },
       
        {
            $group: {
                _id: "",
                total_sales: { $sum: { $multiply: [{ $toInt: '$price' }, { $toInt: '$amount' }] } },
                price: { $push: '$price' },
                amount: { $push: "$amount" },
                supplier : {$push : '$supplier'},
                date : {$push : '$date_sold'},
                cost: { $sum: { $multiply: [{ $toInt: "$amount" }, { $toInt: "$price" }] } },
                product: { $push: '$products' },
                seller: { $push: '$seller' },
                // data :  { $concatArrays : ['$product', '$seller'] }
            }
        }, 


        
        
        
    ])

    if (!monthly_report) {
        return next ( new AppError('No found within the specified month', 404))
    }


    res.status(200).json({
        status: 'success',
        message: "data found",
        empty: false,
        data: {
            monthly_report
        }
    })
})

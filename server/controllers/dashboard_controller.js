const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/catchAsync');

const Sales = require('../models/salesModel');
const Product = require('../models/productModel');
//const Category = require('../models/category_model');



const response = (data, statusCode, res, message) =>{

    res.status(statusCode).json({
        status: 'success',
        message: message,
        empty: false,
        data : {
            data
        }
    })
}

exports.productSummary = catchAsync(async (req, res, next) => {
    const product_data = await Product.aggregate([
        {
            $group: {
                _id: "",
                total_products: { $sum: 1 }
            },
        }
    ])

    const product_monthly = await Product.aggregate([
        {
            $unwind : '$date_created'
        },
        {
            $match: {
                date_created: {
                        $gte: new Date(`2022-01-01`),
                        $lte : new Date(`2022-12-31`)
                    }
            }
        }, 
        {
            $group: {
                _id : { $month : '$date_created' },
                all_products : {$sum : 1}
            }
        },
        {
            $addFields : {month : '$_id'}
        },
        {
            $project: {
                products : '$all_products',
                Month: {
                    $arrayElemAt: [
                        [
                            "",
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                        ],
                        "$_id",
                    ],
                }
            }
        },
        {
            $sort : {Month : -1}
        }
    ])

    const total_sales = await Sales.aggregate([
        {
            $unwind : '$date_sold'
        },
        {
            $match: { 
                date_sold: {
                    $gte: new Date('2023-01-01'),
                    $lte : new Date('2023-12-31')
                }
            }
        },
        {
            $group: {
                _id: { $month : '$date_sold' },
                total_amount : {  $sum : { $multiply: [ {$toInt: '$sellingPrice'}, {$toInt: '$amount'} ] } }
            }
        },
        {
            $addFields : {month : '$_id'}
        },
        {
            $project: {
                sales: "$total_amount",
                Month: {
                    $arrayElemAt: [
                        [
                            "",
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                        ],
                        "$_id",
                    ],
                }
            }
        },
        {
            $sort : {Month : -1}
        }
    ])

    

    if (!product_data || !product_monthly || !total_sales) {
        return next( new AppError('No data found in this document', 404) )
    }


    res.status(200).json({
        status: 'success',
        message: 'data found',
        empty: false,
        data : {
            product_data,
            product_monthly,
            total_sales
        }
    })

})


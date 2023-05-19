const { ObjectId } = require('mongodb');
const mongooose = require('mongoose');


const ProductSchema =  mongooose.Schema({
    productName : {
        type : String,
        required : [true, "product name is required"],
        trim : true
    },
    buyingPrice : {
        type : String,
        required : [true, "buying price is required"],
        trim : true
    },
    wholeSale : {
        type : String,
        required : [true, "whole sale is required"],
        trim : true
    },
    memberPrice : {
        type : String,
        required : [true, "members price is required"],
        trim : true
    },
    sellingPrice : {
        type : String,
        required : [true, "members price is required"],
        trim : true
    },
    quantity : {
        type : String,
        required : [true, "quantity is required"],
        trim : true
    },
   unit: {
        type : String,
        default : "pic"
    },
    date_published : {
        type  :  Date,
        default :  Date.now()
    },
    created_by : {
        type : mongooose.Schema.ObjectId,
        ref : 'User',
        required : [true, "creator name is required"],
        trim  : true
    },
    deleted :  {
        type  : String,
        default  : false
    },

}) 

ProductSchema.pre(/^find/, function(next) {
    this.populate({
        path : 'created_by',
        select : '-password -__v -role'

    })
    next();
})

const Product =  mongooose.model('Product', ProductSchema);

module.exports =  Product
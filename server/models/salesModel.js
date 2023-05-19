const mongoose = require('mongoose');

const SalesSchema = mongoose.Schema({
    amount: {
        type: String,
        required: [true, 'product amount is required'],
        trim : true
    },
    sellingPrice: {
        type: String,
        required: [true, 'product price is required'],
        trim : true
    },
    supplier: {
        type: String,
        default : 'Clinton Solution',
    },
    discount: {
        type: String,
        default : 0
    },
   Unit: {
        type: String,
        default : 'pic'
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'product sold is required'],
        trim : true
    },
    sold_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'seller name is required'],
        trim : true
    },
    date_sold: {
        type: Date,
        default : Date.now()
    },
    price : String,
})

SalesSchema.pre('save', async function (next) {
    const total = this.amount * this.price;
    this.total_cost = total;

    next();
})

SalesSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'product',
        select : '-__V -quantity -date_created -valid_until -created_by'
    }).populate({
        path: 'sold_by',
        select : '-__v -email -role -user_status -createdAt'
    })

    next();
})

SalesSchema.pre(/^match/, function (next) {
    this.populate({
        path: 'product',
        select : '-__V -quantity -date_created -valid_until -created_by'
    }).populate({
        path: 'sold_by',
        select : '-__v -email -role -user_status -createdAt'
    })

    next();
})


const Sales = mongoose.model('Sales', SalesSchema);

module.exports = Sales;
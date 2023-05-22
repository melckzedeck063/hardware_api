const mongoose =require('mongoose');
const validator = require('validator')

const CustomerSchema = mongoose.Schema({
    firstName : { 
        type : String,
        required : [true, 'Please provide your name'],
        trim : true
    },
    lastName : { 
        type : String,
        required : [true, 'Please provide your name'],
        trim : true
    },
    email : {
        type : String,
        unique : [true, "Provided email already exist, try another  one"],
        lowercase : true,
        validate : [validator.isEmail, 'Please provide a valid email']
    },
    telephone : {
        type : String,
        required : [true, "please provide your phone number"],
        unique : [true, "phone number already exists"],
        minlength : [10, "Please provide a valid phone number"],
        maxlength : [10, "Please provide a valid phone number"]
    },
    tin : { 
        type : String,
        default : '00-000',
        trim : true
    },
    vrn : { 
        type : String,
        default : '00-0-00',
        trim : true
    },

    
})

const Customer =  mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
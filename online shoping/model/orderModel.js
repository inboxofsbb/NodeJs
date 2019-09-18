const mongoose = require('mongoose')
const schema = mongoose.Schema

const orderSchema = new schema({
    userid:{
        type:String,required:true
    },
    productid:{ 
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'initialed'
    },date:{
        type:Date,
        default:Date.now
    },
    price:{
        type:Number
    }

}) 

module.exports = orderModel = mongoose.model("order",orderSchema)
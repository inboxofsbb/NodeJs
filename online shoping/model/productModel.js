const mongoose = require('mongoose')
const schema = mongoose.Schema 

const productSchema = new schema({

    name:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:Array,
        required:true
    },
    description:{
        type:String,
        
    },
    cost:{
        type:Number,
        required:true
    },
    initialCost:{
        type:Number
    },
    image:{
        type:Array
    },
    outofStock:{
        type:Boolean,
        default:false,
    },
    active:{
        type:Boolean,
        default:true
        
    }



})
module.exports = ProductSchema = mongoose.model("product",productSchema)
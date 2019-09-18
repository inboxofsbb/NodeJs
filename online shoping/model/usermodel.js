const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userschema = new schema({
    name:{type:String},
    email:{
        type:String
    },phone:{
        type:String
    },
    password:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    _coordinates: {
        type: [Number],
        index: '2dsphere',
        default: [0, 0],
    },
    wishlist:{
        type:Array
    },
    cart:{
        type:Array
    },
    role:{
        type:String,
        default:'U'
    }

});

module.exports = user =mongoose.model('usermodel',userschema);
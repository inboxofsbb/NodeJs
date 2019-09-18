const isEmpty = require('is-empty')
const productModel = require('./../model/productModel')

module.exports.createProductValidation = function(data){
    var errors={}
    if(data.name===""||data.name===undefined){
        errors.name="name field reqired"
    }

    if(data.qty===""||data.qty===undefined){errors.qty="qty field reqired"}
    if(data.color===""||data.color===undefined){
        errors.color="color field reqired"
    }
    if(data.size===""||data.size===undefined){
        errors.size="size field reqired"
    }
    if(data.size===""||data.size===undefined){
        errors.size="size field reqired"
    }
    if(data.cost===""||data.cost===undefined){
        errors.cost="cost field reqired"
    }
    
    
    return {errors,isValid:isEmpty(errors)}
    
}

module.exports.productCheck= function(res,data){
    productModel.findOne({name:data.name}).then(data=>{
        if(!isEmpty(data)){
            ReE(res,{message:"item name exists"})
        }
    }).catch(err=>{return ReE(res,err)})
}
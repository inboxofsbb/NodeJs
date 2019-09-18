const isEmpty = require('is-empty')
const productModel = require('./../model/productModel')
module.exports.registerValidation = (data)=>{
    let errors={}
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(data.name===""||data.name===undefined){
        errors.name="name field required"
    }else if(data.name.length<2){
        errors.name="name field required atleast 2 letters"

    }
    if(data.email===""||data.email===undefined){
        errors.email="email field required"
    }else if (reg.test(data.email) == false) 
        {
          
            errors.email="invalid email address"
        }

    if(data.password===""||data.password===undefined){
        errors.password="password required"
    }else if(data.password.length<5){
        errors.password="password required min 6 letters"
    }
    return {errors,isValid:isEmpty(errors)}
}

module.exports.LoginValidation = (data)=>{
    let errors={}
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(data.email===""||data.email===undefined){
        errors.email="email field required"
    }else if (reg.test(data.email) == false) 
        {
          
            errors.email="invalid email address"
        }

    if(data.password===""||data.password===undefined){
        errors.password="password required"
    }
    return {errors,isValid:isEmpty(errors)}
}

module.exports.addLocation = function(data){
    let errors={}
    if(data._coordinates===""||data._coordinates===undefined){
        errors._coordinates="_coordinate field required"
    }
    return {errors ,isValid:isEmpty(errors)}  
}

module.exports.addWishList = function(data){
    let errors={};
    
    if(data.productId===""||data.productId===undefined){
        errors.productid="productId requireds"
    }
  
    return {errors ,isValid:isEmpty(errors)}  


}
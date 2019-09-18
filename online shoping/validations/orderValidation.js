const isEmpty = require('is-empty')

module.exports.addOrderValidation = function(data){
let errors = {} 
   if(data.qty===""||data.qty===undefined){
    errors.qty="qty field required"
 }else if(data.qty<1||data.qty>100){
     errors.qty="quantity field data must between 1 - 100"
 }
 return {errors,isValid:isEmpty(errors)}   
 
}

module.exports.upateOrderValidation  = function(data){
    flag=false;
    stat = ['initilized','delivered','packed','cancelled','returned']
    for(i=0;i<stat.length;i++){
        if(stat[i]===data.status){
            flag=true
        }
    }
    let errors={}
    if(data.status===""||data.status===undefined){
        errors.status="status field required"
    }else if(!flag){
        errors.status="invalid status valid statuses are initilized delivered packed cancelled returned"
    }



    return {errors,isValid:isEmpty(errors)}   


}
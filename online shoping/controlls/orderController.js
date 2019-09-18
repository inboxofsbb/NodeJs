const isEmpty=require('is-empty')
const userSchema = require('./../model/usermodel')
const productSchema = require('./../model/productModel')
const orderSchema = require('./../model/orderModel')
const orederValidation = require('./../validations/orderValidation')
/* ----------------------------------------- ADD TO ORDERS -------------------------------------*/
const addtoOrders = async function(req,res){
    const {errors,isValid}= orederValidation.addOrderValidation(req.body)
    if(!isValid){
        ReE(res,{message:errors})
    }
    const newOrderSchema = new orderSchema ({
            userid:req.user.id,
            productid:req.params.productId,
            qty:req.body.qty
    })
    productSchema.findOne({_id:req.params.productId}).then(product=>{
        if(isEmpty(product)){
            ReE(res,{message:"product not exists"})
        }else{
           newOrderSchema.price= parseFloat(product.cost)*parseFloat(req.body.qty)
           newOrderSchema.save().then(datas=>{ReS(res,datas)}).catch(err=>{ReE(res,err)})

        }
    }).catch(err=>{ReE(res,err)})

    
}

/* ----------------------------------------- MY ORDERS -------------------------------------*/

const myOrders = async function(req,res){
    userId = req.user._id
        orderSchema.find({userid:userId}).then(data=>{
        if(isEmpty(data)){
            ReE(res,{message:"you have no orders yet...!"})
        }
        else{
            let total = 0;
            let total_quantity=0

            for(i=0;i<data.length;i++){ 
                total+=parseFloat(data[i].price)
                total_quantity+=parseFloat(data[i].qty)
            }
            ReS(res,{message:{total:total,total_quantity:total_quantity}})
        }


    }).catch(err=>{ReE(res,err)})

}


const updateorder = async function(req,res){
    const {errors,isValid}= orederValidation.upateOrderValidation(req.body)
    if(!isValid){
        ReE(res,{message:errors})
    }

    orderSchema.updateOne({_id:req.params.orderid},{$set:{status:req.body.status}}).then(data=>{
            ReS(res,{message:data})
    }).catch(err=>{ReE(res,err)})
}


module.exports={
    addtoOrders:addtoOrders,
    myOrders:myOrders,
    updateorder:updateorder
}
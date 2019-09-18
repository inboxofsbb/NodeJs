const modelSchema = require('./../model/productModel');
const validation = require('./../validations/product')
const isEmpty=require('is-empty')
const create = async function(req,res){
    let reqData = req.body
    const {errors,isValid}=validation.createProductValidation(reqData)
    if(!isValid){
        let err={message:errors}
        return ReE(res,err)}
    validation.productCheck(res,req.body)
    const newSchema = new modelSchema({
        name:reqData.name,
        qty:reqData.qty,
        color:reqData.color,
        size:reqData.size,
        description:reqData.description,
        cost:reqData.cost,
        initialCost:reqData.initialCost,
        image:reqData.image
    });
    newSchema.save().then(data=>{return ReS(res,data)}).catch(err=>{return ReE(res,err)})}   

    const search = async function(req,res){
        var Item=req.params.item
        var lmt = 5
        modelSchema.find({name:Item}).limit({lmt})
        .then(data=>{
        if(isEmpty(data)||data.outofStock===true){return res.json("item not found")}
        return ReS(res,data)})
        .catch(err=>{return ReE(res,err)})
   }

   const show = async function(req,res){
       modelSchema.find().then(data=>{ReS(res,data)}).catch(err=>{ReE(res,err)})
   }

   const deleted = async function(req,res){
       var item = req.params.productid
       modelSchema.findByIdAndDelete(item,(err,data)=>{
        if(err){
            ReE(res,err)
        }
        else{
            console.log(data)
            ReS(res,{message:"item removed successfully id :"+item})
        }
        
       })
       
   }

module.exports = {
    create:create,
    search:search,
    show:show,
    delete:deleted
}
const bcrypt = require('bcryptjs')
const userModel = require('./../model/usermodel') 
const isEmpty=require('is-empty')
const jwt=require('jsonwebtoken')
const keys = require('./../config/config')
const userValidation = require('./../validations/userValidation')
const productModel = require('./../model/productModel')

/////////////////////////////////////////////  REGISTER SESSION  ////////////////////////////////////////

const register = async function(req,res){
    console.log("request get")
    console.log(req.body)
  const {errors,isValid}=userValidation.registerValidation(req.body)
  if(!isValid){
      ReE(res,{message:errors})
  }
        var reqBody=req.body
        var newUserModel = new userModel({
        name:reqBody.name,
        email:reqBody.email,
        password:reqBody.password     
    })
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return res.json("error in hashing1")
            }
        bcrypt.hash(newUserModel.password,salt,(err,hash)=>{
        if(err){
                return res.json("error in hashing2")
              }
            newUserModel.password=hash
            
            newUserModel.save().then(data=>{
               res.json({
                    status:"success",
                    data:data
                })
            }).catch(err=>{return ReE(res,err)})

        })
    }) 
   
}

/////////////////////////////////////////////  LOGIN SESSION  ////////////////////////////////////////


const login = async function(req,res){
    var reqBody = req.body
    const {errors,isValid}=userValidation.LoginValidation(req.body)
  if(!isValid){
      ReE(res,{message:errors})
  }
    userModel.findOne({
       email:reqBody.email 
    }).then(data=>{
        if(isEmpty(data)){
            res.json({
                status:"failed",
                message:"email or password incorrect"
            })
        }
        bcrypt.compare(reqBody.password,data.password).then(match=>{
            if(match){
               
            const payload = {id:data.id,name:data.name} 
            
                jwt.sign(payload , keys.secretOrKey,
                    {expiresIn:31556926},
                    (err,token)=>{ ReS(res,{token:"Bearer "+token,role:data.role})})}
                else{ReE(res,{message:"email or password incorrect"})}
                }).catch(err=>{return ReE(res,err)})})
                .catch(err=>{return ReE(res,err)})}

/*  ----------------- add location ----------------- */

const addLocation = async function(req,res){
    var {errors,isValid}=userValidation.addLocation(req.body)
    if(!isValid){
        data={message:errors}
        return ReE(res,data)}
    var userId = req.user._id
    userModel.findByIdAndUpdate(userId,{$set:{_coordinates:req.body._coordinates}},{new:true})
    .then(data=>{return ReS(res,data)}).catch(err=>{return ReE(res,err)})}

/* --------------- add wishList --------------- */
const addWishList = async function(req,res){
    var {errors,isValid}=userValidation.addWishList(req.params)
    if(!isValid){data={message:errors}
        return ReE(res,data)}
        productModel.findOne({_id:req.params.productId}).then(product=>{
            if(isEmpty(product)){
                ReE(res,{message:"product not found"})
            }
        }).catch(err=>{ReE(res,{message:"item not found"})})
        
    userModel.findOne({_id:req.user._id,wishlist:{$in:[req.params.productId]}})
    .then(data=>{
        if(isEmpty(data)){
            userModel.updateOne({_id:req.user._id},{$push:{wishlist:req.params.productId}},{new:true}).then(data=>{
                return ReS(res,data)
            }).catch(err=>{return ReE(res,err)})}
        else{ReE(res,{message:"item already exists"})}})}

///////////////////////////////////// REMOVE FROM WISHLIST ////////////////////////////////      
const removefromwishlist = async function(req,res){
    var userId = req.user._id
    var {errors,isValid}=userValidation.addWishList(req.params)
    if(!isValid){data={message:errors}
        return ReE(res,data)}
    userModel.findOne({_id:userId,wishlist:{$in:[req.params.productId]}})
    .then(datas=>{
        if(isEmpty(datas)){
            ReE(res,{message:"item not exists in wish list"})
            
        }
        else{
            userModel.updateOne({_id:req.user._id},{$pull:{wishlist:req.params.productId}},{new:true}).then(data=>{
                return ReS(res,{message:"item removed successfully"})
            }).catch(err=>{return ReE(res,err)}) }
    })

}

const addToCart = async function(req,res){
    var {errors,isValid}=userValidation.addWishList(req.params)
    if(!isValid){data={message:errors}
        return ReE(res,data)}
        // -----------find product id exists ---------------------

        productModel.findOne({_id:req.params.productId}).then(product=>{
            if(isEmpty(product)){
                ReE(res,{message:"product not found"})
            }
        }).catch(err=>{ReE(res,{message:"item not found"})})

        // ----------------------------- add to cart ---------------------

        userModel.findOne({_id:req.user._id,cart:{$in:[req.params.productId]}})
        .then(data=>{
            if(isEmpty(data)){
                userModel.updateOne({_id:req.user._id},{$push:{cart:req.params.productId}},{new:true}).then(data=>{
                    userModel.findOne({_id:req.user._id,wishlist:{$in:[req.params.productId]}}).then(wishdata=>{
                        if(!isEmpty(wishdata)){
                            userModel.updateOne({_id:req.user._id},{$pull:{wishlist:req.params.productId}}).then().catch(err=>{
                                console.log(err)
                            })
                        }
                    }).catch(err=>{
                        console.log(err.message)
                    })
                    
                    return ReS(res,data)
                }).catch(err=>{return ReE(res,err)})
            }
            else{
                res.json("item already exist in Cart")
            }
        })
        




}

const mycart = async function(req,res){
    userModel.find({_id:req.user._id},{_id:0,cart:1}).then(data=>{ReS(res,data)}).catch(err=>{ReE(res,err)})
}

const removeFromCart = async function(req,res){
    var userId = req.user._id
    var {errors,isValid}=userValidation.addWishList(req.params)
    if(!isValid){data={message:errors}
        return ReE(res,data)}
    userModel.findOne({_id:userId,cart:{$in:[req.params.productId]}})
    .then(datas=>{
        if(isEmpty(datas)){
            ReE(res,{message:"item not exists in wish list"})
            
        }
        else{
            userModel.updateOne({_id:req.user._id},{$pull:{cart:req.params.productId}},{new:true}).then(data=>{
                return ReS(res,{message:"item removed successfully"})
            }).catch(err=>{return ReE(res,err)}) }
    })


}
const mywishlist = async function(req,res){
    userModel.find({_id:req.user._id},{_id:0,wishlist:1}).then(data=>{ReS(res,data)}).catch(err=>{ReE(res,err)})

}

module.exports = {
    register:register,
    login:login,
    addLocation:addLocation,
    addWishList:addWishList,
    removefromwishlist:removefromwishlist,
    addToCart:addToCart,
    mycart:mycart,
    mywishlist:mywishlist,
    removeFromCart:removeFromCart
}
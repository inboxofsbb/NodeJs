ReE = function(res,err){
    return res.json({
        status:"failed",
        message:err.message
    })
}

ReS = function(res,data){
    res.json({
        status:"success",
        message:data
    })
}
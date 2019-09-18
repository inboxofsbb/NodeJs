const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./config/config').db
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const passport = require('passport')
require('./global')
require('./config/passport')(passport)
const api = require('./api/routes')
mongoose.connect(db,{useNewUrlParser:true},).then(()=>{
    console.log("mongo connected successfully")
}).catch(err=>{console.log(err)})
mongoose.set('useFindAndModify', false);
app.use('/app',api)
const port = 4000
app.listen(port,()=>{console.log(`system start in ${port}`)})
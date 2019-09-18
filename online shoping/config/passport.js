const jwtstrategy = require('passport-jwt').Strategy;
const extractjwt = require('passport-jwt').ExtractJwt;
const user = require('./../model/usermodel')
const config = require('../config/config');
const opts={};
opts.jwtFromRequest = extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretOrKey;

module.exports = passport =>{
    passport.use(
        new jwtstrategy(opts,(jwt_payload,done)=>{
            user.findById(jwt_payload.id).then(user=>{
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            }).catch(err=>{
                return console.log(err.message)
            })
        })
    )
}
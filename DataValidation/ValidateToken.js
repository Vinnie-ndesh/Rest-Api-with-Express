const jwt = require ('jsonwebtoken')
// this i  midleware that we will add on the private routes
require('dotenv').config()
 module.exports  = function (req,res,next) {
     const token  = req.header("Token")
      if(!token) return res.status(401).send('Acess denied')

      try{
          const verified = jwt.verify(token,process.env.TokenSecrete)
          res.user = verified
          next();
      }catch(err){
        return res.status(401).send('Acess denied invalid token')
      }
 }


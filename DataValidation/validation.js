
 const Joi = require('joi');


 // register validation 

  const  registervalidation = (data)=>{

 
 const schema = Joi.object({
     name: Joi.string() .min(3)
     .max(30)
     .required(),
     email: Joi.string() .min(3).email()
     .max(30)
     .required(),
     password: Joi.string() .min(6)
     .max(30)
     .required(),
 })
 // validating tha data 
return schema.validate({name: data.name,email:data.email,password: data.password})
  
 if(error)return res.status(400).send(error.details[0].message)
}


// login validation
const  loginValidation = (data)=>{

 
    const schema = Joi.object({
      
        email: Joi.string() .min(3).email()
        .max(30)
        .required(),
        password: Joi.string() .min(6)
        .max(30)
        .required(),
    })
    // validating tha data 
   return schema.validate({email: data.email,password: data.password})
     
   
   }
   module.exports.loginValidation = loginValidation
module.exports.registervalidation = registervalidation
const router = require ('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const  jwt = require('jsonwebtoken');

require('dotenv').config()
 //validation imports
 const  {registervalidation,loginValidation} = require('../DataValidation/validation')




router.post('/register', async (req,res)=>{
// vallidating the inputs
    const {error} = registervalidation(req.body)

    if(error)return res.status(400).send(error.details[0].message)

        // checking id user
         const userExist = await User.findOne({email: req.body.email})
          if( userExist) return res.status(400).send('The Email is already used')
    

          // hashing the password
           //*** 1. creating a salt */
           const salt = await bcrypt.genSalt(10)
             //*** 2. creating a hashpassword */
            const hashPassword = await bcrypt.hash(req.body.password, salt)

        
   const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashPassword
   })

   try{
//saving the user to db
const saveUser =  await user.save()
res.send('User created sucessifullly with email ' + saveUser.email)
   }catch(err){
       res.status(400).send(err)
   }
})

// log in router
router.post('/login' ,async (req,res)=>{
    // validating the login data
    const {error} = loginValidation(req.body)
   if (error) return res.status(401).send(error.details[0].message)

    // cheking if the email exist
    const user =await User.findOne({email: req.body.email})
    if(! user)  return res.status(401).send('Invalid  email or email')

    //cheking the password 

    const passvalid  = await bcrypt.compare(req.body.password, user.password)
     if(!passvalid) return res.status(401).send('Invalid  email  or  password')
// if user and password create toke for user

var token = jwt.sign({ _id: user._id }, process.env.TokenSecrete);
res.header("Token").send(token)
console.log(token)
})


module.exports =  router
const router = require ('express').Router()
const ValidateToken = require('../DataValidation/ValidateToken')
const User = require('../model/User')
router.get('/post', ValidateToken, (req,res)=>{
    const userId = req.body.email
 
    res.send({
        
        status: 'sucessifully posted',
        postedBy: userId
    
    })
})



module.exports = router
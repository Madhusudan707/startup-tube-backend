const express = require("express");
const router = express.Router();
const {Users} =  require("../models/users.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await Users.find({})
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to find user",errorMessage:err.message})
    }
})

.post(async (req,res)=>{
    try{
        const users = req.body;
        const NewUser = new Users(users)
        const savedUser = await NewUser.save()
        console.log(savedUser)
        res.json({success:true,users:savedUser})
    }catch(err){
        res.status(500).json({ success: false, message: "unable to register", errorMessage: err.message})
    }
})
// router.route("/fb/:fbid")
// .get(async(req,res)=>{
//     try{
//         const fbid = req.params.fbid
//         const data = await Users.findOne({fb_id:fbid})
//         res.json({success:true,data})
//     }catch(err){
//         res.status(500).json({success:false,message:"Unable to find user using fb id",errorMessage:err.message})
//     }
// })

// router.route("/mobile/:mobile")
// .get(async(req,res)=>{
//     try{
//         const mobile = req.params.mobile
//         const data = await Users.findOne({mobile:mobile})
//         res.json({success:true,data})
//     }catch(err){
//         res.status(500).json({success:false,message:"Unable to find user using mobile no",errorMessage:err.message})
//     }
// })

module.exports = router
const express = require("express");
const router = express.Router();
const {userInfos} =  require("../models/userInfo.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await userInfos.find({})
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to load data",errorMessage:err.message})
    }
})

.post(async (req,res)=>{
    try{
        const userInfo = req.body;
        const NewuserInfo = new userInfos(userInfo)
        const savedNewuserInfo = await  NewuserInfo.save()
        res.json({success:true,userInfo:savedNewuserInfo})
    }catch(err){
        res.status(500).json({ success: false, message: "unable to send data", errorMessage: err.message})
    }
})
module.exports = router
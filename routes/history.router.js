const express = require("express");
const router = express.Router();
const {Histories} =  require("../models/history.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await Histories.find({})
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to load history",errorMessage:err.message})
    }
})

.post(async (req,res)=>{
    try{
        const histories = req.body;
        const NewHistory = new Histories(histories)
        const savedHistory = await NewHistory.save()
        res.json({success:true,histories:savedHistory})
    }catch(err){
        res.status(500).json({ success: false, message: "unable to add history", errorMessage: err.message})
    }
})
module.exports = router
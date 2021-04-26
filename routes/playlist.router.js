const express = require("express");
const router = express.Router();
const {Playlists} =  require("../models/playlist.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await Playlists.find({})
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to load playlist",errorMessage:err.message})
    }
})

.post(async (req,res)=>{
    try{
        const playlists = req.body;
        const NewPlaylist = new Playlists(playlists)
        const savedPlaylist = await NewPlaylist.save()
        res.json({success:true,playlists:savedPlaylist})
    }catch(err){
        res.status(500).json({ success: false, message: "unable to add playlist", errorMessage: err.message})
    }
})


router.route("/name/:name")
.get(async(req,res)=>{
   
    try{
        const byName = req.params.name
        const data = await (await Playlists.findOne({name:byName})).populate('Videos').exec((err,Videos)=>{
            console.log("Populated Data " + Videos)
        })
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to load playlist",errorMessage:err.message})
    }
})
module.exports = router
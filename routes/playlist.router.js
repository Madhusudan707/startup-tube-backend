const express = require("express");
const router = express.Router();
const {Playlist} =  require("../models/playlist.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await Playlist.find({})
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to load playlist",errorMessage:err.message})
    }
})

.post(async (req,res)=>{
    try{
        const playlists = req.body;
        const NewPlaylist = new Playlist(playlists)
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
        const playlistName = await Playlist.findOne({name:byName}).populate('vid')
        res.json({success:true,playlistName})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to load playlist",errorMessage:err.message})
    }
})
module.exports = router
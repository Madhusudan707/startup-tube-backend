const express = require("express");
const { extend } = require("lodash")
const router = express.Router();
const {Videos} =  require("../models/videos.model")

router.route("/")
.get(async(req,res)=>{
    try{
        const data = await Videos.find({})
        res.json({success:true,data})
    }catch(err){
        res.status(500).json({success:false,message:"Unable to load videos",errorMessage:err.message})
    }
})

.post(async(req,res)=>{
    try{
        const video = req.body;
        const NewVideo = new Videos(video)
        const savedVideo = await NewVideo.save()
        res.json({success:true,video:savedVideo})
    }catch(err){
        res.status(500).json({ success: false, message: "unable to add video", errorMessage: err.message}) 
    }
})

router.param("videoId",async(req,res,next,videoId)=>{
    try{
        const video = await Videos.findById(videoId)
        if(!video){
         return  res.status(400).json({success:false,message:"Current video is not in our server"})
        }
        req.video= video
         next();
      }catch(err){
        res.status(400).json({success:false,message:"Unable to get the video you requested"})
      }
     
    })

router.route("/:videoId")
.get((req, res) => {
  let {video} = req;
  video._v = undefined /* if you want any key value pair to be discarded like password n all*/
  res.json({success:true,video})
})

.post(async (req, res) => {
    const videoUpdates  = req.body;
    let { video} = req;
  
    video = extend(video, videoUpdates);
    video = await video.save();
  
    res.json({ success: true, video })
  
  })



module.exports = router
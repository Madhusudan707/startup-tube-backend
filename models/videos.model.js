const mongoose = require("mongoose");

const VideosSchema = new mongoose.Schema({
  id: String,
  title: {type:String,required:[true,'Title is Mandatory']},
  category:String ,
  url: String ,
  thumbnail: String ,
  favorite:  String ,
  current:  String ,
  duration:  String ,
  isMenuOpen:false,
  tags:[],
  description:  String ,
  views:  String ,
  timestamp:  String ,
});

const Videos = mongoose.model("Videos",VideosSchema)
module.exports = {Videos}

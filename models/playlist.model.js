const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    uid:Number,
    vid:[],
    name:String
});

const Playlists = mongoose.model("Playlists",PlaylistSchema)
module.exports = {Playlists}


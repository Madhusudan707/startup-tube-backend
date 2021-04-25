const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    uid:{type:Schema.Types.ObjectId,ref:'Users'},
    vid:[{type:Schema.Types.ObjectId,ref:'Videos'}],
    name:String
});

const Playlists = mongoose.model("Playlists",PlaylistSchema)
module.exports = {Playlists}


const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    uid:Number,
    vid:String,
});

const Histories = mongoose.model("Histories",HistorySchema)
module.exports = {Histories}


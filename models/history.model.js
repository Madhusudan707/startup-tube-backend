const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HistorySchema = new mongoose.Schema({
    uid:{type:Schema.Types.ObjectId,ref:'Users'},
    vid:[{type:Schema.Types.ObjectId,ref:'Videos'}],
});

const Histories = mongoose.model("Histories",HistorySchema)
module.exports = {Histories}


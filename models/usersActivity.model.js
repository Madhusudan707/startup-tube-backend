const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const UsersActivitySchema = new mongoose.Schema({
//     uid:{type:Schema.Types.ObjectId,ref:'Users'},
//     history:[{type:Schema.Types.ObjectId,ref:'Videos'}],
//     like:[{type:Schema.Types.ObjectId,ref:'Videos'}],
//     playlist:[{name:String,vid:[{type:Schema.Types.ObjectId,ref:'Videos'}],}]
// });

const UsersActivitySchema = new mongoose.Schema({
    // _id:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    
    uid:{type:Schema.Types.ObjectId,ref:'Users'},
    history:[{type:Schema.Types.ObjectId,ref:'Videos'}],
    like:[{type:Schema.Types.ObjectId,ref:'Videos'}],
    playlist:[{name:String,vid:[{type:Schema.Types.ObjectId,ref:'Videos'}],}]
});

const UsersActivity = mongoose.model("UsersActivity",UsersActivitySchema)
module.exports = {UsersActivity}


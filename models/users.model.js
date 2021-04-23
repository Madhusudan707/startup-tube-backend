const mongoose = require("mongoose");

let validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema = new mongoose.Schema({
    name:{type:String,trim:true},
    fb_id:{type:String},
    phone:{type:String,unique:true,trim:true},
    image:{type:String},
},{timestamps: true});

const Users = mongoose.model("Users",UserSchema)
module.exports = {Users}


const mongoose = require("mongoose");

let validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true,trim:true},
    email: { type: String, unique: true,trim:true,lowercase:true,required:'Email address is required', validate:[validateEmail,'Please fill a valid email address'] },
    password:{type:String,required:true,min:[6, 'password must be  6 character long']},
    
},{timestamps: true});

const Users = mongoose.model("Users",UserSchema)
module.exports = {Users}


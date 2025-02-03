const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    username: {type:String,required:true},
    email: {type: String, unique:true, required:true},
    password: {type: String, required:true}
}, {timestamps:true});

UserSchema.plugin(encrypt, {
    secret: process.env.PRIVATE_KEY,
    encryptedFields:['password'],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

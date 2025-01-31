const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {type:String,required:true},
    sku: {type: String,unique:true, required:true},
    price : {type: Number   , required:true},
    urlImage: {type: String, required:false},
    description: {type: String, required:true},
    userLog: {type: String, required:true}
}, {timestamps:true});

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;

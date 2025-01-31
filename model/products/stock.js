const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    product_sku: {type:String, required:true},
    name: {type:String,required:true},
    qtde: {type:Number, required:true},
    userLog: {type: String, required:true}
}, {timestamps:true});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;

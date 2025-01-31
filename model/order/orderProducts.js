const mongoose = require("mongoose");

const OrderProductsSchema = new mongoose.Schema({
    orderId: {type:String, required:true},
    productIds:{type:String, required:true}
}, {timestamps:true});

const OrderProducts = mongoose.model("OrderProducts", OrderProductsSchema);

module.exports = OrderProducts;

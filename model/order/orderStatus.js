const mongoose = require("mongoose");

const OrderStatusSchema = new mongoose.Schema({
    name: {type:String,required:true},
}, {timestamps:true});

const OrderStatus = mongoose.model("OrderStatus", OrderStatusSchema);

module.exports = OrderStatus;

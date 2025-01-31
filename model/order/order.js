const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    nameCustomer: {type:String,required:true},
    emailCustomer:{type: String, required:true},
    cellphoneCustomer:{type: Number, required:true},
    cpf: {type: String, required:true},
    postcode: {type: String,  required:true},
    address: {type: String, required:true},
    numberHome: {type: String, required:true},
    valueDelivery: {type:Number, required:true},
    valueTotal: {type: Number, required:true},
    idOrderStatus: {type: Number, required:true},
    numberCard: {type: String},
    pixCode:{type: String},
    billetCode:{type: String}
}, {timestamps:true});

const Order = mongoose.model("Orders", OrderSchema);

module.exports = Order;

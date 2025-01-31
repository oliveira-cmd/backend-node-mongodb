const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    email: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    cellphone: {type: Number, required:true},
    typePerson: {type: Number, required:true},
    cpf: {type: String, unique:true, required:true},
    postcode: {type: String,  required:true},
    address: {type: String, required:true},
    numberHome: {type: String, required:true},
}, {timestamps:true});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;

const Customer = require('../model/customer/customer');

async function saveCustomer(data){
    try {
        const customer = new Customer(data);
        const verifyUserExist = await Customer.findOne({cpf: data.cpf});
        if(!verifyUserExist){
            customer.save();
            return customer;
        } else {
            let message = {
                'registered': "false",
                'message': "There is already a Customer with this email registered"
            };

            return message;
        }
        
    } catch (error) {
        console.error(error);
    }
}

function findCustomerById(id){
    try{
        if(id.length == 24){
            const customer = Customer.findById(id);
            if(!customer){
                return '{message: "Customer not found"}';
            } else {
                return customer;
            }
        } else {
            return '{message:"Invalid Id"}';
        }
    } catch(error){
        console.error(error);
    }
}

function findAllCustomers(){
    try{
        const customer = Customer.find();
        return customer;
    } catch(error){
        console.error(error)
    }

}

function updateCustomerById(id, data){
    try{
        const verifyUserExist = Customer.findOne({cpf: data.cpf});
        if(!verifyUserExist){
            return '{message: "user not found"}'
        } else {
            const newCustomer = Customer.findByIdAndUpdate(id, data);
            return newCustomer;
        }
    } catch(error){
        console.error(error)
    }
}

function deleteCustomerById(id){
    try{
        const verifyUserExist = Customer.findOne({id: id});
        if(!verifyUserExist){
            return '{message: "Customer not found"}'
        } else {
            const customer = Customer.findByIdAndDelete(id);
            return customer;
        }
    } catch(error){
        console.error(error)
    }

}

module.exports = {saveCustomer, findCustomerById, findAllCustomers, updateCustomerById, deleteCustomerById};
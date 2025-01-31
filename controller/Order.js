const Order = require('../model/order/order');

async function saveOrder(data){
    try {
        const order = new Order(data);
        order.save();
        return order;
    } catch(error){
        console.error(error)
    }
}

async function getOrderById(id){
    
    try {
        const order = await Order.findById(id);
        return order;
    } catch(error){
        console.log(error)
    }
}

async function getAllOrders(){
    try{
        const orders = await Order.find();
        return orders;
    } catch(error){
        console.log(error)
    }
}

async function updateOrderById(id, data){
    try{
        const verifyOrderExist = Order.findById(id);
        if(!verifyOrderExist){
            return '{message: "order not found"}'
        } else {
            const newOrder = Order.findByIdAndUpdate(id, data);
            return newOrder;
        }
    } catch(error){
        console.error(error);
    }
}
module.exports = {saveOrder, getOrderById,getAllOrders, updateOrderById}
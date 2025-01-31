const OrderStatus = require('../model/order/orderStatus');

async function saveOrderStatus(data){
    
    try{
        const verifyOrderStatusExist = await OrderStatus.find({name:data.name});
        
        if(verifyOrderStatusExist){
            const orderStatus = new OrderStatus(data);
            orderStatus.save();
            return orderStatus;
        }
    } catch(error){
        console.error(error)
    }
}

module.exports = {saveOrderStatus}
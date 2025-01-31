const OrderProducts = require('../model/order/orderProducts');

async function saveOrderProducts(data){
    try{
        const orderProducts = new OrderProducts(data);
        orderProducts.save();
        return orderProducts;
    } catch(error){
        console.error(error)
    }
}

async function getAllProductIds(order_id){
    try{
        const products = await OrderProducts.find({orderId: order_id});
        return products;
    } catch(error){
        console.error(error)
    }
}

module.exports = {saveOrderProducts,getAllProductIds}
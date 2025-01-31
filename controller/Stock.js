const Stock = require('../model/products/stock');
const Product = require('../model/products/products');

async function saveStock(data){
    
    const verifyProductExist = await Product.find({sku: data.product_sku});
    if(!verifyProductExist){
        return 'message: Product not found';
    } else {
        const stock =  new Stock(data);
        stock.save();
        return stock;
    }
}

async function getStockById(id){
    const stock = await Stock.findById(id);
    if(!stock){
        return 'message: Stock not found';
    } else {
        return stock;
    }
}

async function getAllStock(){
    const stock = await Stock.find();
    return stock;
}

async function updateStockById(id, data){
    const stock = Stock.findById(id);
    if(!stock){
        return 'message: Stock not found';
    } else {
        const newStock = Stock.findByIdAndUpdate(id, data);
        return newStock;
    }
}

async function deleteStockById(id){
    const stock = Stock.findById(id);
    if(!stock){
        return 'message: Stock not found';
    } else {
        const stock = Stock.findByIdAndDelete(id);
        return stock;
    }
}

module.exports = {saveStock,getStockById, getAllStock, updateStockById, deleteStockById}
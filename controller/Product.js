const Product = require('../model/products/products');

async function saveProduct(data){
    
    try{
        const verifyProductBySku = await Product.findOne({sku: data.sku});
        
        if(!verifyProductBySku){
            const product = new Product(data);
            product.save();
            return product;
        } else {
            let message = {
                'registered': "false",
                'message': "There is already a product with this sku registered"
            };

            return message;

        }
    } catch(error){
        console.error(error)
    }
}

async function getProductById(id){
    try{
        const product = await Product.findById(id);
        if(!product){
            return "message: Product not found";
        } else {
            return product;
        }
    } catch(error){
        console.error(error);
    }
}


async function getAllProduct() {
    
    try{
        const product = await Product.find();
        return product;
    } catch(error){
        console.error(error)
    }
}

async function updateProductById(id, data){

    try{
        const verifyProductExist = await Product.findById(id);
        if(!verifyProductExist){
            return '{message: "product not found"}'
        } else {
            const newProduct = Product.findByIdAndUpdate(id, data);
            return newProduct;
        }
    } catch(error){
        console.error(error)
    }
}

async function deleteProductById(id){
    try{
        const verifyProductExist = await Product.findById(id);

        if(!verifyProductExist){
            return '{message: "product not found"}'
        } else {
            const product = Product.findByIdAndDelete(id);
            return product;
        }
    } catch(error){
        console.error(error)
    }

}
module.exports = {saveProduct, getProductById, getAllProduct, updateProductById, deleteProductById}
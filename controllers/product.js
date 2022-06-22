const User = require('../model/user')
const Product = require('../model/product')

const getProducts = async (req, res) => {
    
    // Write the code to get the product details
    const {userId} =  req.params;
    console.log(userId);
    var user = User.findOne({email: userId});
    if(!user){
        return res.status(404).send("Product not found");
    }
    else{
        return res.status(200).send(result);
    }
}

const addProduct = async (req, res) => {
    // Write the code to add the product details
    try {
        const {
            productId,
            productName,
            productDisc,
            inStock
        } = req.body;

        const {userId} = req.params;

        if (!productId && !productName && !productDisc && !inStock) {
            return res.status(400).send("All input are required");
        }
        const existingProduct = await Product.findOne({productId});
        if(existingProduct){
            return res.status(404).send("Product already exists");
        }
        const user = await User.findOne({email: userId});

        const product = await Product.create({
            productId: productId,
            productName: productName,
            productDisc: productDisc,
            inStock: inStock
        });
        user.productList.push(product);
        await user.save();

        return res.status(200).send("Product Saved");
    } catch (error) { 
        console.log(error);
    }
}

const deleteProduct = async (req, res) => {
    
    // Write the code to delete the product details
    const {productId} =  req.params;
    Product.deleteOne({productId: productId}, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
}

module.exports = { getProducts, addProduct, deleteProduct };
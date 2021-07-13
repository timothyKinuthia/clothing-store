const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");


exports.addToCart = async (req, res, next) => {
    
    try {   
        const { prodId } = req.body;

        const product = await Product.findOne({ _id: prodId });
        
        const cart = await Cart.findOne({ user: req.user._id, "cartItems.product": prodId });

        if (cart) {
            await Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": prodId }, { $inc: { "cartItems.$.count": 1, "cartItems.$.price": product.price } });
        } else {
            await Cart.updateOne({ user: req.user._id }, { $push: { cartItems: { product: prodId, count: 1, price: product.price } } }, { upsert: true });
        };
        
        res.status(201).json({ msg: "updated cart successfully" });
        
    } catch (err) {
        next(err)
    }
}
const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: "User"
    },
    cartItems: [
        {
            product: {
                type: mongoose.Types.ObjectId, ref: "Product"
            },
            count: { type: Number },
            price: { type: Number }
        }
    ],
    totalPrice: {
        type: Number
    },
    totalAfterDiscount: Number
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
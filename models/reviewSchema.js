const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    description: {
        type: String
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    reviewBy: {
        type: mongoose.Types.ObjectId, ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory"
    },
    subSubCategory: {
        type: mongoose.Types.ObjectId,
        ref: "SubSubCategory"
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    images: [
        { type: String }
    ],
    color: {
        type: String,
        required: true
    },
    offer: { type: Number },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
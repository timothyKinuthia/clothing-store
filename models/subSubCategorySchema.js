

const mongoose = require('mongoose');


const subSubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of the sub-sub-category is required"],
    },
    slug: {
        type: String,
        unique: [true, "sub-sub-category name should be unique"]
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory"
    }
}, { timestamps: true });

module.exports = mongoose.model("SubSubCategory", subSubCategorySchema);
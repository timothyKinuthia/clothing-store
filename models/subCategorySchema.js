
const mongoose = require('mongoose');


const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of the sub-category is required"],
    },
    slug: {
        type: String,
        unique: [true, "Sub-category name should be unique"]
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: true });

module.exports = mongoose.model("SubCategory", subCategorySchema);
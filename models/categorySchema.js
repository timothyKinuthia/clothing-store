const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of the category is required"]
    },
    slug: {
        type: String,
        unique: [true, "Category name should be unique"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
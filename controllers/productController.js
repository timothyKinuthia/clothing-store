const slugify = require("slugify");
const Product = require("../models/productSchema");
const ErrorResponse = require("../util/errorResponse");


exports.createProduct = async (req, res, next) => {
    
    try {
        const { name, category, subCategory, price, quantity, description, images, offer } = req.body;
        const found = await Product.findOne({ name });
        if (found) {
            return next(new ErrorResponse("Product already exists!", 400));
        };

        const product = {
            name, slug: slugify(name), category, subCategory, price, quantity, description, images, offer, createdBy: req.user._id
        }

        await Product.create(product);

        res.status(201).json({ msg: "product created successfully" });

    } catch (err) {
        next(err)
    }
};
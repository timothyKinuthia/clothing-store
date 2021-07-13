const Category = require('../models/categorySchema');
const slugify = require('slugify');

const ErrorResponse = require('../util/errorResponse');

exports.createCategory = async (req, res, next) => {
    
    try {
        const found = await Category.findOne({ name: req.body.name });

        if (found) {
            return next(new ErrorResponse("Category name should be unique", 400));
        }

        const category = await Category.create({ name: req.body.name, slug: slugify(req.body.name) });

        res.status(201).json({ category });
     } catch (err) {
        next(err)
    }
}

exports.getCategories = async (req, res, next) => {
    
    try {

        const categories = await Category.find({}).sort('-createdAt');

        res.status(200).json({ categories });
    } catch (err) {
        next(err)
    }
};

exports.deleteCategory = async (req, res, next) => {
    
    try {
        await Category.findOneAndDelete({ slug: req.params.slug });

        res.status(204).json({ msg: "deleted category" });

    } catch (err) {
        next(err)
    }
};

exports.updateCategory = async (req, res, next) => {
    
    try {
        const { name } = req.body;
        
        const newCategory = await Category.findOneAndUpdate({ _id: req.params.id }, { name, slug: slugify(name) }, { new: true });

        res.status(201).json({ newCategory });

     } catch (err) {
        next(err)
    }
}

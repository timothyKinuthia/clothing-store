
const SubSubCategory = require("../models/subSubCategorySchema")
const slugify = require("slugify");

const ErrorResponse = require('../util/errorResponse');

exports.createSubSubCategory = async (req, res, next) => {
    
    try {
        const found = await SubSubCategory.findOne({ name: req.body.name });

        if (found) {
            return next(new ErrorResponse("Sub-sub-category name should be unique", 400));
        }

        const subsub = await SubSubCategory.create({ name: req.body.name, slug: slugify(req.body.name), parent: req.body.parent });

        res.status(201).json({ subsub });

    } catch (err) {
        next(err)
    }
};

exports.getSubSubCategories = async (req, res, next) => {
    
    try {
        const subsubs = await SubSubCategory.find({}).sort("-createdAt");

        res.status(200).json({ subsubs });
    } catch (err) {
        next(err)
    }
};

exports.updateSubSub = async (req, res, next) => {
    
    try {
        const { name, parent } = req.body;

        const newSubSub = await SubSubCategory.findOneAndUpdate({ _id: req.params.id }, { name, slug: slugify(name), parent }, { new: true });

        res.status(201).json({ newSubSub });

    } catch (err) {
        next(err)
    }
};

exports.deleteSubSub = async (req, res, next) => {
    
    try {
        await SubSubCategory.findOneAndDelete({ slug: req.params.slug });

        res.status(204).json({ msg: "deleted sub-sub-category" });
        
    } catch (err) {
        next(err)
    }
}
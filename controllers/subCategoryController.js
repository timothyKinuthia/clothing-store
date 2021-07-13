
const SubCategory = require("../models/subCategorySchema");
const slugify = require("slugify");

const ErrorResponse = require('../util/errorResponse');

exports.createSubCategory = async (req, res, next) => {
    
    try {
        const found = await SubCategory.findOne({ name: req.body.name });

        if (found) {
            return next(new ErrorResponse("Sub-category name should be unique", 400));
        }

        const sub = await SubCategory.create({ name: req.body.name, parent: req.body.parent, slug: slugify(req.body.name) });

        res.status(201).json({ sub });

    } catch (err) {
        next(err)
    }
};

exports.getSubCategories = async (req, res, next) => {
    
    try {
        const subs = await SubCategory.find({}).sort("-createdAt");

        res.status(200).json({ subs });
    } catch (err) {
        next(err)
    }
};

exports.updateSub = async (req, res, next) => {
    
    try {
        const { name, parent } = req.body;

        const newSub = await SubCategory.findOneAndUpdate({ _id: req.params.id }, { name, parent, slug: slugify(name) }, { new: true });

        res.status(201).json({ newSub });

    } catch (err) {
        next(err)
    }
};

exports.deleteSub = async (req, res, next) => {
    
    try {
        await SubCategory.findOneAndDelete({ slug: req.params.slug });

        res.status(204).json({ msg: "deleted sub-category" });
        
    } catch (err) {
        next(err)
    }
}
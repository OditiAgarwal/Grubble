const Category = require('../models/category')
const mongoose = require('mongoose')
const Course = require('../models/course') // assuming Course model is in '../models/course'

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const categoryDetails = await Category.create({
            name: name, description: description
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ delete Category ================
exports.deleteCategory = async (req, res) => {
    try {
        // extract data
        const { categoryId } = req.body;

        // validation
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: 'categoryId is required'
            });
        }

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    }
    catch (error) {
        console.log('Error while deleting Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while deleting Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        // get all category from DB
        const allCategories = await Category.find({}, { name: true, description: true });

        // return response
        res.status(200).json({
            success: true,
            data: allCategories,
            message: 'All allCategories fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching all allCategories');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching all allCategories'
        })
    }
}



// ================ Get Category Page Details ================
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Log all existing categories
        const allCategories = await Category.find({});
        // Commented out to prevent terminal clutter
        // console.log('ALL CATEGORIES:', JSON.stringify(allCategories.map(cat => ({
        //     _id: cat._id,
        //     name: cat.name
        // })), null, 2));

        // Check if category exists
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ 
                success: false, 
                message: "Category not found",
                allCategories: allCategories.map(cat => ({
                    _id: cat._id,
                    name: cat.name
                }))
            });
        }

        // Find courses in the system
        const systemWideCourses = await Course.find({}).select('courseName status category');
        // Commented out to prevent terminal clutter
        // console.log('ALL COURSES IN SYSTEM:', JSON.stringify(systemWideCourses, null, 2));

        // Find courses specifically for this category
        const coursesInCategory = await Course.find({ 
            category: categoryId 
        }).select('courseName status');
        
        // Commented out to prevent terminal clutter
        // console.log('COURSES IN THIS CATEGORY:', JSON.stringify(coursesInCategory, null, 2));

        // Detailed category lookup
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                select: 'courseName status'
            })
            .exec();

        // Commented out to prevent terminal clutter
        // console.log('SELECTED CATEGORY DETAILS:', JSON.stringify(selectedCategory, null, 2));

        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "No published courses found for the selected category.",
                categoryDetails: selectedCategory,
                allCoursesInCategory: coursesInCategory
            });
        }

        // Rest of the existing logic remains the same
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        });

        let differentCategory = null;
        if (categoriesExceptSelected.length > 0) {
            const randomCategoryIndex = getRandomInt(categoriesExceptSelected.length);
            differentCategory = await Category.findById(categoriesExceptSelected[randomCategoryIndex]._id)
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                })
                .exec();
        }

        const allCategoriesWithCourses = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec();

        const allCourses = allCategoriesWithCourses.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => (b.sold || 0) - (a.sold || 0))
            .slice(0, 10);

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });
    } catch (error) {
        console.error("FULL ERROR IN getCategoryPageDetails:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
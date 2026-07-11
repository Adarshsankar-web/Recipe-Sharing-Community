const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();

        res.status(200).json(recipes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getRecipeById = async (req, res) => {
    try {

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json(recipe);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const addRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body);
       

        res.status(201).json({
            message: "Recipe Added Successfully",
            recipe
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateRecipe = async (req, res) => {
    try {

        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe Updated Successfully",
            recipe
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const deleteRecipe = async (req, res) => {
    try {

        const recipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe
};
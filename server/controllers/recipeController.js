const Recipe = require("../models/Recipe");

const addRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.create({
            title: "Chicken Biryani",
            description: "Traditional Kerala Style Biryani",
            ingredients: "Rice, Chicken, Spices",
            category: "Dinner",
            image: "",
            rating: 5
        });

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

module.exports = {
    addRecipe
};
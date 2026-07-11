const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    ingredients: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    rating: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
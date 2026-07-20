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

    preparation: {
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
    default: 0,
    min: 0,
    max: 5
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
const express = require("express");

const router = express.Router();

const { 
    getRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe

} = require("../controllers/recipeController");
    
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);


module.exports = router;  
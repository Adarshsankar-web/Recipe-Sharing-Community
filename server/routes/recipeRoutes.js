const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");



const { 
    getRecipes,
    getRecipeById,
    addRecipe,
    updateRecipe,
    deleteRecipe

} = require("../controllers/recipeController");
    
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.post("/", protect, upload.single("image"), addRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);


module.exports = router;  
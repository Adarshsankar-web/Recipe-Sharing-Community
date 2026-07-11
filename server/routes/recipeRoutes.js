const express = require("express");

const router = express.Router();

const { addRecipe } = require("../controllers/recipeController");

router.post("/", addRecipe);

module.exports = router;
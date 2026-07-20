const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getRecipes,
  getMyRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");


router.get("/", getRecipes);

router.get("/my", protect, getMyRecipes);
router.get("/:id", getRecipeById);

router.post(
  "/",
  protect,
  upload.single("image"),
  addRecipe
);


router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateRecipe
);


router.delete(
  "/:id",
  protect,
  deleteRecipe
);

module.exports = router;
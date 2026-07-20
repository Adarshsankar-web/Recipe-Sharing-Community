const Recipe = require("../models/Recipe");

const getRecipes = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "";

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    let query = Recipe.find(filter).populate("user", "name email");

    if (sort === "newest") {
      query = query.sort({ createdAt: -1 });
    } else if (sort === "rating") {
      query = query.sort({ rating: -1 });
    }

    const recipes = await query;

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      user: req.user.id,
    }).populate("user", "name email");

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      preparation,
      category,
      rating,
    } = req.body;

    const image = req.file ? req.file.filename : "";

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      preparation,
      category,
      image,
      rating,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Recipe Added Successfully",
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients;
    recipe.preparation = req.body.preparation;
    recipe.category = req.body.category;
    recipe.rating = req.body.rating;

    if (req.file) {
      recipe.image = req.file.filename;
    }

    await recipe.save();

    res.status(200).json({
      message: "Recipe Updated Successfully",
      recipe,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await recipe.deleteOne();

    res.status(200).json({
      message: "Recipe Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  getMyRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
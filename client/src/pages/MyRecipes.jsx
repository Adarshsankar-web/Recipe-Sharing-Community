import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Home.css";
import "../styles/MyRecipes.css";

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const res = await api.get("/recipes/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRecipes(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch recipes");
    }
  };

  const deleteRecipe = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Recipe deleted successfully!");

      fetchMyRecipes();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

 return (
  <div className="home-container">
    <h1 className="home-title">My Recipes</h1>

    <div className="recipe-grid">
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => {
          const imageUrl = recipe.image
            ? `http://localhost:5000/uploads/${encodeURIComponent(
                recipe.image
              )}`
            : "";

          return (
            <div
              key={recipe._id}
              className="recipe-card"
              style={{
                backgroundImage: recipe.image
                  ? `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url("${imageUrl}")`
                  : "linear-gradient(rgba(60,60,60,.8), rgba(20,20,20,.8))",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="recipe-content">
                <h2>{recipe.title}</h2>

                <p>{recipe.description}</p>

                <p>🏷 {recipe.category}</p>

                <p>⭐ {recipe.rating}/5</p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <Link to={`/edit/${recipe._id}`}>
                    <button className="edit-btn">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
    );     
    }

export default MyRecipes;    
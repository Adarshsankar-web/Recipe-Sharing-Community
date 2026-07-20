import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import "../styles/RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Recipe not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="details-page">
      <div className="details-card">

        {recipe.image && (
          <img
            src={`http://localhost:5000/uploads/${recipe.image}`}
            alt={recipe.title}
            className="details-image"
          />
        )}

        <div className="details-content">

          <h1>{recipe.title}</h1>

          <p className="description">
            {recipe.description}
          </p>

          <div className="info-box">
            <p><strong>👨 Author:</strong> {recipe.user?.name}</p>

            <p><strong>🏷 Category:</strong> {recipe.category}</p>

            <p><strong>⭐ Rating:</strong> {recipe.rating}/5</p>

            <p>
              <strong>📅 Uploaded:</strong>{" "}
              {new Date(recipe.createdAt).toLocaleDateString()}
            </p>
          </div>

          <h3>🥘 Ingredients</h3>

          <p>{recipe.ingredients}</p>

          <h3>👨‍🍳 Preparation</h3>

          <p>{recipe.preparation}</p>

        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/AddRecipe.css";

function AddRecipe() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    preparation: "",
    category: "",
    rating: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("ingredients", formData.ingredients);
      data.append("preparation", formData.preparation);
      data.append("category", formData.category);
      data.append("rating", formData.rating);

      if (image) {
        data.append("image", image);
      }

      await api.post("/recipes", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Recipe Added Successfully!");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add recipe");
    }
  };

  return (
    <div className="add-page">
      <div className="add-card">
        <h2>🍳 Add New Recipe</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Short description of your recipe..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <textarea
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />

          <textarea
            name="preparation"
            placeholder="Preparation steps..."
            value={formData.preparation}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (Indian, Italian, Dessert...)"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />

          <div className="file-upload">
            <label>
              <strong>📷 Upload Recipe Image</strong>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {image && (
              <p style={{ marginTop: "10px", color: "#555" }}>
                Selected: <strong>{image.name}</strong>
              </p>
            )}
          </div>

          <button className="add-btn" type="submit">
            Add Recipe
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
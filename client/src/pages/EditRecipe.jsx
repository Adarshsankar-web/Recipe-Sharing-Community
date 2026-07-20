import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/AddRecipe.css";

function EditRecipe() {
  const { id } = useParams();
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
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/recipes/${id}`);

      setFormData({
        title: res.data.title,
        description: res.data.description,
        ingredients: res.data.ingredients,
        preparation: res.data.preparation,
        category: res.data.category,
        rating: res.data.rating,
      });

      setCurrentImage(res.data.image);
    } catch (err) {
      alert("Recipe not found");
    }
  };

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

      await api.put(`/recipes/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Recipe Updated Successfully!");

      navigate("/myrecipes");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="add-page">
      <div className="add-card">
        <h2>✏️ Edit Recipe</h2>

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
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />

          <textarea
            name="preparation"
            placeholder="Preparation Steps"
            value={formData.preparation}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />

          {currentImage && (
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <p><strong>Current Image</strong></p>

              <img
                src={`http://localhost:5000/uploads/${currentImage}`}
                alt="Recipe"
                style={{
                  width: "250px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}

          <div className="file-upload">
            <label>
              <strong>📷 Replace Image (Optional)</strong>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {image && (
              <p style={{ marginTop: "10px" }}>
                Selected: <strong>{image.name}</strong>
              </p>
            )}
          </div>

          <button className="add-btn" type="submit">
            Update Recipe
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditRecipe;
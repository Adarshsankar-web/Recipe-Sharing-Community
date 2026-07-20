import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Home.css";
import Loading from "../components/Loading";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, [search, category, sort]);

  const fetchRecipes = async () => {
    setLoading(true);

    try {
      const res = await api.get("/recipes", {
        params: {
          search,
          category,
          sort,
        },
      });

      setRecipes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Recipe Sharing Community</h1>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
          <option value="Dessert">Dessert</option>
          <option value="Snacks">Snacks</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <div className="recipe-grid">
        {recipes.length === 0 ? (
         <div
          style={{
              textAlign: "center",
              width: "100%",
              padding: "60px",
            }}
>
          <h2>🍽 No Recipes Found</h2>
           <p>Try changing the search or category filter.</p>
      </div>
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
                    ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url("${imageUrl}")`
                    : "linear-gradient(rgba(60,60,60,.8), rgba(20,20,20,.8))",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="recipe-content">
                  <h2>{recipe.title}</h2>

                  <p>{recipe.description}</p>

                  <p>🏷 <strong>{recipe.category}</strong></p>

                  <p>⭐ {recipe.rating}/5</p>

                  <p>👤 {recipe.user?.name}</p>

                  <Link
                    className="view-btn"
                    to={`/recipe/${recipe._id}`}
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
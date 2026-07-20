import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🍽️ Recipe Sharing Community
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {localStorage.getItem("token") && (
          <>
            <Link to="/add">Add Recipe</Link>
            <Link to="/myrecipes">My Recipes</Link>
          </>
        )}

        {localStorage.getItem("token") ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
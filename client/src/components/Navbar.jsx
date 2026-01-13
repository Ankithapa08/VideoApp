import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // --- STYLES ---
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center", // This vertically centers everything
      padding: "15px 40px",
      backgroundColor: "#0f0f0f",
      borderBottom: "1px solid #333",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    brand: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textDecoration: "none",
      color: "#ff4b2b", // Branding color
    },
    linksContainer: {
      display: "flex",
      alignItems: "center", // Ensures links and button are on the same baseline
      gap: "25px", // Consistent spacing between elements
    },
    link: {
      color: "#ccc",
      textDecoration: "none",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "color 0.2s",
    },
    logoutBtn: {
      backgroundColor: "transparent",
      border: "1px solid #ff4b2b",
      color: "#ff4b2b",
      padding: "6px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        VideoApp
      </Link>

      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>

        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/upload" style={styles.link}>Upload</Link>
            <button 
              onClick={handleLogout} 
              style={styles.logoutBtn}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#ff4b2b";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#ff4b2b";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={{...styles.link, color: "#fff", backgroundColor: "#333", padding: "6px 12px", borderRadius: "6px"}}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  // --- STYLES ---
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#0f0f0f",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#1e1e1e",
      padding: "40px",
      borderRadius: "16px",
      border: "1px solid #333",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      textAlign: "center",
    },
    title: { fontSize: "2rem", marginBottom: "10px", fontWeight: "700", color: "#fff" },
    subtitle: { color: "#aaa", marginBottom: "30px", fontSize: "0.9rem" },
    input: {
      width: "100%",
      padding: "12px 16px",
      marginBottom: "15px",
      backgroundColor: "#2a2a2a",
      border: "1px solid #444",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "1rem",
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      backgroundColor: loading ? "#555" : "#ff4b2b",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background 0.3s ease",
    },
    errorBox: {
      backgroundColor: "rgba(255, 75, 43, 0.1)",
      color: "#ff4b2b",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "0.85rem",
      border: "1px solid rgba(255, 75, 43, 0.2)",
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      const user = res?.data?.data?.user;

      if (!user) throw new Error("Invalid login response");

      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Log in to manage your video channel</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button 
            type="submit" 
            style={styles.button} 
            disabled={loading || !email || !password}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
        
        <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#777" }}>
          Don't have an account? <span style={{ color: "#ff4b2b", cursor: "pointer" }}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
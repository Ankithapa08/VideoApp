import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- STYLES ---
  const styles = {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#0f0f0f",
      padding: "40px 20px",
    },
    card: {
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#1e1e1e",
      padding: "40px",
      borderRadius: "16px",
      border: "1px solid #333",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    },
    title: { fontSize: "2rem", marginBottom: "10px", fontWeight: "700", color: "#fff", textAlign: "center" },
    subtitle: { color: "#aaa", marginBottom: "30px", fontSize: "0.9rem", textAlign: "center" },
    input: {
      width: "100%",
      padding: "12px 16px",
      marginBottom: "15px",
      backgroundColor: "#2a2a2a",
      border: "1px solid #444",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "0.95rem",
      outline: "none",
      boxSizing: "border-box",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "0.85rem",
      color: "#ccc",
      fontWeight: "500"
    },
    fileInput: {
      marginBottom: "20px",
      color: "#888",
      fontSize: "0.85rem"
    },
    button: {
      width: "100%",
      padding: "14px",
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
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "0.85rem",
      border: "1px solid rgba(255, 75, 43, 0.2)",
      textAlign: "center"
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      if (avatar) formData.append("avatar", avatar);
      if (coverImage) formData.append("coverImage", coverImage);

      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join the VideoApp creator community</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            name="fullName"
            style={styles.input}
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            style={styles.input}
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            name="username"
            style={styles.input}
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            style={styles.input}
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <div style={{ marginTop: "10px" }}>
            <label style={styles.label}>Avatar Image</label>
            <input 
              type="file" 
              style={styles.fileInput} 
              onChange={(e) => setAvatar(e.target.files[0])} 
            />

            <label style={styles.label}>Cover Image</label>
            <input 
              type="file" 
              style={styles.fileInput} 
              onChange={(e) => setCoverImage(e.target.files[0])} 
            />
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#777", textAlign: "center" }}>
          Already have an account? <span 
            style={{ color: "#ff4b2b", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
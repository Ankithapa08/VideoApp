import React from "react";

const Home = () => {
  // Simple styles object to keep the component clean
  const styles = {
    container: {
      backgroundColor: "#121212", // Deep dark background
      color: "#ffffff",
      minHeight: "100vh",
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: "0 20px",
    },
    hero: {
      padding: "100px 0 60px 0",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto",
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "800",
      marginBottom: "10px",
      background: "linear-gradient(90deg, #ff0000, #ff8c00)", // VideoApp branding colors
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#aaaaaa",
      marginBottom: "30px",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      maxWidth: "1100px",
      margin: "40px auto 0",
    },
    card: {
      backgroundColor: "#1e1e1e",
      padding: "30px",
      borderRadius: "12px",
      border: "1px solid #333",
      transition: "transform 0.2s ease",
    },
    featureTitle: {
      fontSize: "1.2rem",
      color: "#ff4b2b",
      marginBottom: "10px",
    },
    featureText: {
      fontSize: "0.95rem",
      color: "#cccccc",
      lineHeight: "1.6",
    }
  };

  const features = [
    { title: "Share", desc: "Upload and share your videos with the world in high definition." },
    { title: "Engage", desc: "Express your thoughts through likes and real-time comments." },
    { title: "Curate", desc: "Organize your favorite content into personalized playlists." },
    { title: "Connect", desc: "Subscribe to your favorite creators and never miss an update." }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>VideoApp</h1>
        <p style={styles.subtitle}>Your ultimate video sharing platform</p>
        <button style={{
          padding: "12px 24px",
          borderRadius: "30px",
          border: "none",
          backgroundColor: "#ff4b2b",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Explore Now
        </button>
      </section>

      {/* Features Section */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "700" }}>Platform Features</h2>
        <div style={styles.featureGrid}>
          {features.map((f, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureText}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
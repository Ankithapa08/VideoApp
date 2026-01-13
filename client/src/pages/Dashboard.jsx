import { useEffect, useState } from "react";
import axios from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- STYLES ---
  const styles = {
    container: {
      backgroundColor: "#0f0f0f",
      color: "#fff",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "system-ui, sans-serif"
    },
    header: { marginBottom: "30px", borderBottom: "1px solid #333", paddingBottom: "10px" },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "50px"
    },
    statCard: {
      backgroundColor: "#1e1e1e",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      border: "1px solid #2e2e2e"
    },
    statValue: { fontSize: "2rem", fontWeight: "bold", color: "#ff4b2b", margin: 0 },
    statLabel: { color: "#aaa", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px" },
    videoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "25px"
    },
    videoCard: {
      backgroundColor: "#1e1e1e",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #2e2e2e"
    },
    videoInfo: { padding: "15px" },
    videoTitle: { margin: "0 0 5px 0", fontSize: "1.1rem" },
    metaText: { color: "#aaa", fontSize: "0.9rem" },
    // NEW: Style for the Cloudinary link to handle long URLs
    urlBox: {
      marginTop: "12px",
      padding: "8px",
      backgroundColor: "#121212",
      borderRadius: "6px",
      border: "1px solid #333",
      fontSize: "0.75rem",
      wordBreak: "break-all", // Ensures the long URL wraps
      color: "#777"
    },
    link: {
      color: "#ff4b2b",
      textDecoration: "none",
      display: "block",
      marginTop: "4px"
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [statsRes, videosRes] = await Promise.all([
          axios.get("/dashboard/stats"),
          axios.get("/dashboard/videos")
        ]);
        setStats(statsRes.data.data);
        setVideos(videosRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div style={styles.container}><h2>Loading...</h2></div>;
  if (error) return <div style={styles.container}><h2>Error: {error}</h2></div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Creator Dashboard</h1>
      </header>

      {/* Stats Section */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Videos</p>
          <h3 style={styles.statValue}>{stats.totalVideos}</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Subscribers</p>
          <h3 style={styles.statValue}>{stats.totalSubscribers}</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Likes</p>
          <h3 style={styles.statValue}>{stats.totalLikes}</h3>
        </div>
      </div>

      {/* Video Section */}
      <h2 style={{ marginBottom: "20px" }}>Your Videos</h2>
      <div style={styles.videoGrid}>
        {videos.map((video) => (
          <div key={video._id} style={styles.videoCard}>
            <video
              src={video.videoFile}
              poster={video.thumbnail}
              width="100%"
              style={{ display: "block", aspectRatio: "16/9", backgroundColor: "#000" }}
              controls
            />
            <div style={styles.videoInfo}>
              <h4 style={styles.videoTitle}>{video.title}</h4>
              <p style={styles.metaText}>{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
              
              {/* DISPLAY CLOUDINARY LINK HERE */}
              <div style={styles.urlBox}>
                <span style={{ fontWeight: "bold", color: "#aaa" }}>Cloudinary URL:</span>
                <a 
                  href={video.videoFile} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.link}
                >
                  {video.videoFile}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
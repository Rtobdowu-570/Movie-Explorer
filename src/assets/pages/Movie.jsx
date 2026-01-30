import React from "react";
import {
  FaSearch,
  FaBell,
  FaListUl,
  FaHeart,
  FaBookmark,
  FaPlay,
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaLink,
} from "react-icons/fa";
import "../styles/movie.css";

const Movie = () => {
  return (
    <div className="page-container">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-logo">Cineverse</div>
        <div className="nav-links">
          <span>Movies</span>
          <span className="text-muted">TV Shows</span>
        </div>
        <div className="nav-actions">
          <FaSearch className="icon" size={20} />
          <FaBell className="icon" size={20} />
          <img
            src="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2"
            className="user-avatar"
            alt="Profile"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-backdrop">
          <img
            src="https://storage.googleapis.com/banani-generated-images/generated-images/e10c7189-62cf-4cd5-81d1-586efa65c96b.jpg"
            alt="Backdrop"
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="poster-wrapper">
            <img
              src="https://storage.googleapis.com/banani-generated-images/generated-images/d0a4fd81-6c37-4bad-9246-0e10f0798a01.jpg"
              alt="Poster"
              style={{ width: "100%" }}
            />
          </div>

          <div className="movie-details">
            <h1 className="movie-title">Dune: Part Two</h1>
            <div className="movie-meta">
              <span className="certification">PG-13</span>
              <span>2024 • 2h 46m • Sci-Fi • Adventure</span>
            </div>

            <div className="user-score-row">
              <div className="score-circle">86%</div>
              <div className="action-buttons">
                <button className="icon-btn">
                  <FaListUl size={18} />
                </button>
                <button className="icon-btn">
                  <FaHeart size={18} />
                </button>
                <button className="icon-btn">
                  <FaBookmark size={18} />
                </button>
                <button className="play-btn">
                  <FaPlay size={18} fill="black" /> Play Trailer
                </button>
              </div>
            </div>

            <p className="tagline">Long live the fighters.</p>
            <h3>Overview</h3>
            <p className="overview-text">
              Paul Atreides unites with Chani and the Fremen while on a warpath
              of revenge...
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="content-wrapper">
        <div className="left-column">
          <h3 className="section-title">Top Billed Cast</h3>
          <div className="cast-scroller">
            <CastCard
              name="Timothée Chalamet"
              char="Paul Atreides"
              img="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FNorth%20American%2F1"
            />
            <CastCard
              name="Zendaya"
              char="Chani"
              img="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FAfrican%2F3"
            />
            <CastCard
              name="Austin Butler"
              char="Feyd-Rautha"
              img="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FNorth%20American%2F8"
            />
          </div>
        </div>

        <aside className="sidebar">
          <div className="social-links">
            <FaFacebookSquare size={20} /> <FaTwitter size={20} />{" "}
            <FaInstagram size={20} /> <FaLink size={20} />
          </div>
          <FactItem label="Status" value="Released" />
          <FactItem label="Budget" value="$190,000,000.00" />
          <div className="fact-item">
            <div className="fact-label">Keywords</div>
            <div className="keyword-list">
              <span className="keyword-tag">desert</span>
              <span className="keyword-tag">sandworm</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

// Reusable Sub-components
const CastCard = ({ name, char, img }) => (
  <div className="cast-card">
    <img
      src={img}
      alt={name}
      style={{ width: "100%", height: "180px", objectFit: "cover" }}
    />
    <div style={{ padding: "12px" }}>
      <div style={{ fontWeight: "700", fontSize: "15px" }}>{name}</div>
      <div style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
        {char}
      </div>
    </div>
  </div>
);

const FactItem = ({ label, value }) => (
  <div className="fact-item" style={{ marginBottom: "20px" }}>
    <div className="fact-label" style={{ fontWeight: "600" }}>
      {label}
    </div>
    <div className="fact-value" style={{ color: "var(--muted-foreground)" }}>
      {value}
    </div>
  </div>
);

export default Movie;

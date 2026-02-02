import React from "react";
import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import "../styles/home.css";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Homenav = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <nav className="home-nav">
        <div className="home-left-nav">
          <div className="home-text">
            <Link to="/" className="head">
              <h1>MovieHook</h1>
            </Link>
          </div>
        </div>
        <div className="home-center-nav">
          <div className="home-search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div className="search-button">
            <button className="search-text" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="home-right-nav">
          <div className="home-notification">
            <FaBell className="notification-icon" />
          </div>

          <div className="user-image">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              alt="user.name"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Homenav;

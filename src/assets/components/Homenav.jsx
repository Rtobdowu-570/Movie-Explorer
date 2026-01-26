import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
const Homenav = () => {
  return (
    <>
      <nav className="home-nav">
        <div className="home-left-nav">
          <div className="home-text">
            <h1>MovieScope</h1>
          </div>
        </div>
        <div className="home-center-nav">
          <div className="home-search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search for movies..." />
          </div>
          <div className="search-button">
            <button className="search-text">Search</button>
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

import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import "../styles/main.css";

const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        <div className="right-nav">
          <ul className="right-nav-list">
            <li>
              <Link className="head" to="/">
                MovieHook
              </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movie">Movies</Link>
            </li>
            <li>
              <Link to="/movie">Tv Shows</Link>
            </li>
          </ul>
        </div>
        <div className="left-nav">
          <ul className="left-nav-list">
            <li>
              <FaSearch className="search-icon" />
            </li>
            <li>
              <a href="#">Sign in</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import "../styles/main.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when viewport exceeds mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

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
            <li className="nav-link-desktop">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link-desktop">
              <Link to="/movie">Movies</Link>
            </li>
            <li className="nav-link-desktop">
              <Link to="/movie">Tv Shows</Link>
            </li>
          </ul>
        </div>
        
        <button 
          className="hamburger-menu-navbar" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

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
      
      {menuOpen && (
        <>
          <div className="nav-overlay-navbar" onClick={toggleMenu} />
          <div className="nav-links-mobile-navbar">
            <Link to="/" className="mobile-nav-link-navbar" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/movie" className="mobile-nav-link-navbar" onClick={toggleMenu}>
              Movies
            </Link>
            <Link to="/movie" className="mobile-nav-link-navbar" onClick={toggleMenu}>
              Tv Shows
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;

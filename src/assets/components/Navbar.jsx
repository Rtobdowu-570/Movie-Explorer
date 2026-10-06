import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

function NavigationLinks({ onNavigate }) {
  return (
    <>
      <NavLink end onClick={onNavigate} to="/">Home</NavLink>
      <NavLink onClick={onNavigate} to="/movie">Discover</NavLink>
    </>
  );
}

export default function Navbar() {
  const [menuOpenAt, setMenuOpenAt] = useState("");
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const menuOpen = menuOpenAt === location.pathname;

  useEffect(() => {
    const closeMenu = () => setMenuOpenAt("");
    window.addEventListener("popstate", closeMenu);
    return () => window.removeEventListener("popstate", closeMenu);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpenAt("");
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    const search = String(new FormData(event.currentTarget).get("q") || "").trim();
    if (!search) return;
    setMenuOpenAt("");
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link aria-label="MovieScope home" className="brand" to="/">
          <span aria-hidden="true" className="brand__mark">M</span>
          <span>Movie<span className="brand__accent">Scope</span></span>
        </Link>

        <nav aria-label="Main navigation" className="site-header__nav">
          <NavigationLinks />
        </nav>

        <form key={location.search} className="site-search" onSubmit={handleSearch} role="search">
          <FaSearch aria-hidden="true" className="site-search__icon" />
          <label className="sr-only" htmlFor="site-search-input">Search films</label>
          <input
            autoComplete="off"
            defaultValue={new URLSearchParams(location.search).get("q") || ""}
            id="site-search-input"
            name="q"
            placeholder="Search films"
            required
            type="search"
          />
          <button aria-label="Submit search" className="site-search__submit" type="submit">
            <FaSearch aria-hidden="true" />
          </button>
        </form>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="site-header__menu-button"
          onClick={() => setMenuOpenAt(menuOpen ? "" : location.pathname)}
          ref={menuButtonRef}
          type="button"
        >
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      <nav
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
        className={`site-header__mobile-nav${menuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
      >
        <NavigationLinks onNavigate={() => setMenuOpenAt("")} />
      </nav>
    </header>
  );
}

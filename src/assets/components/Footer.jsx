import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link aria-label="MovieScope home" className="brand" to="/">
            <span aria-hidden="true" className="brand__mark">M</span>
            <span>Movie<span className="brand__accent">Scope</span></span>
          </Link>
          <p>A considered guide to your next great watch.</p>
        </div>
        <div className="site-footer__meta">
          <nav aria-label="Footer navigation" className="site-footer__links">
            <Link to="/">Home</Link>
            <Link to="/movie">Discover</Link>
            <a href="https://github.com/Rtobdowu-570/Movie-Explorer" rel="noreferrer" target="_blank">Source</a>
          </nav>
          <p>
            Movie data and images by <a href="https://www.themoviedb.org/" rel="noreferrer" target="_blank">TMDB</a>.
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
          <span>© {new Date().getFullYear()} MovieScope</span>
        </div>
      </div>
    </footer>
  );
}

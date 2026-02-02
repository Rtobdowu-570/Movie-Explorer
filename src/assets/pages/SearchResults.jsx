import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";
import "../styles/home.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const movieQuery = searchParams.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${movieQuery}`,
          options,
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (movieQuery) fetchMovies();
  }, [movieQuery]);

  console.log("Rendering results:", results);
  return (
    <div className="search-page">
      <h2 style={{ margin: "20px" }}>Results for: {movieQuery}</h2>
      <div className="popular-movie-grid">
        {results.map((movie) => (
          <div className="popular-movie-info" key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)} style={{ cursor: "pointer" }}>
            <div className="popular-movie-thumbnail">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div className="popular-movie-name">{movie.title}</div>
            <div className="popular-movie-less-info">
              <div className="popular-movie-year">{movie.release_date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

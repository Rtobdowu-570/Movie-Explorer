import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { FaStar } from "react-icons/fa";
import "../styles/home.css";

const Homevidsection = () => {
  const [redirect, Setredirect] = useState(false);
  if (redirect) {
    Navigate("/movie");
  }

  const [trending, setTrending] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [tv, setTv] = useState([]);
  const [popular, setPopular] = useState([]);
  const [movie, setMovie] = useState([]);
  const [showDisplay, setShowDisplay] = useState(false);

  const handleClick = () => {
    !showDisplay ? setShowDisplay(true) : setShowDisplay(false);
  };

  useEffect(() => {
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const fetchMovieData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      };

      try {
        const [tvRes, popularRes, trendingRes, genresRes, movieRes] =
          await Promise.all([
            fetch(
              "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
              options,
            ),
            fetch(
              "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
              options,
            ),
            fetch(
              "https://api.themoviedb.org/3/trending/all/day?language=en-US",
              options,
            ),
            fetch("https://api.themoviedb.org/3/genre/movie/list", options),

            fetch(
              "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
              options,
            ),
          ]);

        const tvData = await tvRes.json();
        const popularData = await popularRes.json();
        const trendingData = await trendingRes.json();
        const genresData = await genresRes.json();
        const movieData = await movieRes.json();

        setTv(tvData.results);
        setPopular(popularData.results);
        setTrending(trendingData.results);
        setGenreList(genresData.genres);
        setMovie(movieData.results);
      } catch (err) {
        console.error("Failed to fetch movie info:", err);
      }
    };

    fetchMovieData();
  }, []);

  return (
    <>
      <main className="main-section">
        <div className="main-text">Trending Movies</div>
        <div className="new-movie-grid">
          {trending.map((movie) => (
            <div
              className="new-movie-info"
              key={movie.id}
              onClick={() => Setredirect(true)}
            >
              <div className="popular-movie-thumbnail">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="movie-rating">
                  <FaStar className="star-icon" />{" "}
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="popular-movie-name">
                {movie.title || movie.name}
              </div>
              <div className="popular-movie-less-info">
                <div className="popular-movie-year">
                  {movie.release_date || movie.first_air_date}
                </div>
                <div className="popular-movie-genre">
                  {genreList
                    .filter((genre) => movie.genre_ids.includes(genre.id))
                    .slice(0, 1)
                    .map(
                      (genre) =>
                        genre.name[0].toUpperCase() + genre.name.slice(1),
                    )
                    .join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="main-text">Popular Movies</div>
        <div className="new-movie-grid">
          {popular.map((movie) => (
            <div
              className="new-movie-info"
              key={movie.id}
              onClick={() => Setredirect(true)}
            >
              <div className="popular-movie-thumbnail">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-rating">
                  <FaStar className="star-icon" />{" "}
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="popular-movie-name">{movie.title}</div>
              <div className="popular-movie-less-info">
                <div className="popular-movie-year">{movie.release_date}</div>
                <div className="popular-movie-genre">
                  {genreList
                    .filter((genre) => movie.genre_ids.includes(genre.id))
                    .slice(0, 1)
                    .map(
                      (genre) =>
                        genre.name[0].toUpperCase() + genre.name.slice(1),
                    )
                    .join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="main-text">TV Shows</div>
        <div className="new-movie-grid">
          {tv.map((movie) => (
            <div
              className="new-movie-info"
              key={movie.id}
              onClick={() => Setredirect(true)}
            >
              <div className="popular-movie-thumbnail">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.name}
                />
                <div className="movie-rating">
                  <FaStar className="star-icon" />{" "}
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="popular-movie-name">{movie.name}</div>
              <div className="popular-movie-less-info">
                <div className="popular-movie-year">{movie.first_air_date}</div>
                <div className="popular-movie-genre">
                  {genreList
                    .filter((genre) => movie.genre_ids.includes(genre.id))
                    .slice(0, 1)
                    .map(
                      (genre) =>
                        genre.name[0].toUpperCase() + genre.name.slice(1),
                    )
                    .join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showDisplay && (
          <>
            <div className="main-text" onLoad={() => setShowDisplay(false)}>
              Movies
            </div>
            <div className="popular-movie-grid">
              {movie.map((movie) => (
                <div
                  className="popular-movie-info"
                  key={movie.id}
                  onClick={() => Setredirect(true)}
                >
                  <div className="popular-movie-thumbnail">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.name}
                    />
                    <div className="movie-rating">
                      <FaStar className="star-icon" />{" "}
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="popular-movie-name">{movie.name}</div>
                  <div className="popular-movie-less-info">
                    <div className="popular-movie-year">
                      {movie.first_air_date}
                    </div>
                    <div className="popular-movie-genre">
                      {genreList
                        .filter((genre) => movie.genre_ids.includes(genre.id))
                        .slice(0, 1)
                        .map(
                          (genre) =>
                            genre.name[0].toUpperCase() + genre.name.slice(1),
                        )
                        .join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="load-more-btn" onClick={handleClick}>
          {showDisplay ? "Show Less" : "Load More Movies"}
        </div>
      </main>
    </>
  );
};

export default Homevidsection;

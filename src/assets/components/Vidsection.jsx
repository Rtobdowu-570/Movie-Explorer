import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import "../styles/home.css";

const Vidsection = () => {
  const navigate = useNavigate();

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

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
        const [trendingRes, upcomingRes] = await Promise.all([
          fetch(
            "https://api.themoviedb.org/3/trending/all/day?language=en-US",
            options,
          ),
          fetch(
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
            options,
          ),
        ]);

        const trendingData = await trendingRes.json();
        const upcomingData = await upcomingRes.json();

        setTrending(trendingData.results);
        setUpcoming(upcomingData.results);
      } catch (err) {
        console.error("Failed to fetch upcoming movies:", err);
      }
    };

    fetchMovieData();
  }, []);

  return (
    <>
      <div className="movie-section">
        <div className="trending-now">
          <div className="title-text">
            <h1>Trending Now</h1> <FaArrowRight className="title-icon" />
          </div>
          <div className="trending-now-container">
            <div className="trending-movie-grid">
              {trending.map((movie) => (
                 <div 
                  className="trending-movie-info" 
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  style={{ cursor: "pointer" }}
                 >
                  <div className="trending-movie-container">
                    <div className="trending-movie-thumbnail">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt=""
                        className="trending-movie-img"
                      />
                    </div>
                    <div className="trending-movie-text">
                      <FaPlay className="play-icon" />
                      <div className="movie-texts"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="browse-by-category">
          <div className="title-text">
            <h1>Browse by Category</h1>
          </div>
          <div className="category-grid">
            <div className="category-name">Action</div>
            <div className="category-name">Comedy</div>
            <div className="category-name">Horror</div>
            <div className="category-name">Sci-fi</div>
          </div>
        </div>

        <div className="new-releases">
          <div className="title-text-releases">
            <h1>Upcoming</h1>
            <span className="view-all">View All</span>
          </div>
          <div
            className="new-movie-grid"
            style={{
              maxWidth: "1400px",
              margin: "auto",
              cursor: "pointer",
            }}
          >
            {upcoming.map((movie) => (
              <div
                className="new-movie-info"
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{
                  padding: "2px",
                  cursor: "pointer",
                  marginRight: "4px",
                }}
              >
                <div className="new-release-thumbnail">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt=""
                  />
                </div>
                <p className="movie-new-release-name">{movie.title}</p>
                <p className="movie-new-release-year">{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vidsection;

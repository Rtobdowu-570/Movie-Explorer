import React from "react";

import { FaArrowRight, FaPlay } from "react-icons/fa";
import movies from "../movies.json";

const Vidsection = () => {
  return (
    <>
      <div className="movie-section">
        <div className="trending-now">
          <div className="title-text">
            <h1>Trending Now</h1> <FaArrowRight className="title-icon" />
          </div>
          <div className="trending-now-container">
            <div className="trending-movie-grid">
              {movies.movie[0].trending.map((movie) => (
                <div className="trending-movie-info" key={movie.id}>
                  <div className="trending-movie-container">
                    <div className="trending-movie-thumbnail">
                      <img
                        src={movie.poster}
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
            <h1>New Releases</h1>
            <span className="view-all">View All</span>
          </div>
          <div className="new-release-grid">
            {movies.movie[0].latestReleases.map((movie) => (
              <div className="new-release-card" key={movie.id}>
                <div className="new-release-thumbnail">
                  <img src={movie.poster} alt="" />
                </div>
                <p className="movie-new-release-name">{movie.name}</p>
                <p className="movie-new-release-year">{movie.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vidsection;

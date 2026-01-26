import React from "react";
import image from "../images/image.jpg";
import { FaStar } from "react-icons/fa";
import "../styles/main.css";

const Homevidsection = () => {
  return (
    <>
      <main className="main-section">
        <div className="main-text">Popular Movies</div>
        <div className="popular-movie-grid">
          <div className="popular-movie-info">
            <div className="popular-movie-thumbnail">
              <img src={image} alt="image.name" />
              <div className="movie-rating">
                <FaStar className="star-icon" /> <span>4.5</span>
              </div>
            </div>
            <div className="popular-movie-name"></div>
            <div className="popular-movie-less-info">
              <div className="popular-movie-year"></div>
              <div className="popular-movie-genre"></div>
            </div>
          </div>
        </div>

        <div className="load-more-btn">Load More Movies</div>
      </main>
    </>
  );
};

export default Homevidsection;

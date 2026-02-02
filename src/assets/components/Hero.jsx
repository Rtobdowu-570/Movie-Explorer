import React from 'react'
import '../styles/main.css'
import {FaPlay, FaInfoCircle} from 'react-icons/fa'


const Hero = ({ movie }) => {
  if (!movie) return null;

  return (
    <>
      <div className="movie-info">
        <div className="movie-heading"><h1>{movie.title}</h1></div>
        <div className="movie-production">
            <div className="movie-released-year"> {movie.release_date} </div> <span className="separator"></span>
            <div className="movie-category">{movie.genre_ids ? movie.genre_ids.join(', ') : ''}</div><span className="separator"></span>
            <div className="movie-quality"> 1080p HD</div>
        </div>
        <div className="movie-description">
            {movie.overview}
        </div>
        <div className="movie-actions">
            <span className="play-btn"><FaPlay /> Watch Trailer</span>
            <span className="more-info"> <FaInfoCircle /> More Info</span>
        </div>
      </div>
    </>
  )
}

export default Hero
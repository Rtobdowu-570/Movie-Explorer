import React from 'react'
import '../styles/main.css'
import {FaPlay, FaInfoCircle} from 'react-icons/fa'

const Hero = () => {
  return (
    <>
    <div className="movie-info">
        <div className="movie-heading"><h1>SpiderMan No Way Home</h1></div>
        <div className="movie-production">
            <div className="movie-released-year"> 2024 </div> <span className="separator"></span>
            <div className="movie-category">Action</div><span className="separator"></span>
            <div className="movie-quality"> 1080p HD</div>
        </div>
        <div className="movie-description">
            With Spider-Man's identity now revealed, Peter asks Doctor Strange for help.
            When a spell goes wrong, dangerous foes from other worlds start to appear.
            Peter Parker's secret identity is revealed to the entire world.
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
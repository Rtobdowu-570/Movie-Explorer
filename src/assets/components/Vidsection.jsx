import React from 'react'
import {FaArrowRight} from 'react-icons/fa'

const Vidsection = () => {
  return (
    <>
    <div className="movie-section">
        <div className="trending-now">
            <div className="title-text">
                <h1>Trending Now</h1> <FaArrowRight  className='title-icon'/>
            </div>
            <div className="trending-now-container">
                <div className="trending-movie-grid"></div>
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
            <div className="title-text">
                <h1>New Releases</h1>
            </div>
            <div className="new-release-info">
                <div className="new-release-grid"></div>
                <div className="movie-new-release-name"></div>
                <div className="movie-new-release-year"></div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Vidsection
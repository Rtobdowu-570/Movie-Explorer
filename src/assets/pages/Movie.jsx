import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-spinner"; 
import {
  FaSearch,
  FaBell,
  FaListUl,
  FaHeart,
  FaBookmark,
  FaPlay,
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaLink,
  FaStar,
} from "react-icons/fa";
import "../styles/movie.css";
import "react-toastify/dist/ReactToastify.css";
import "react-spinner/react-spinner.css";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,reviews,videos,keywords,release_dates,similar&language=en-US`;
      
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_API_KEY}`
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error loading movie:", error);
        toast.error("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
       fetchMovieData();
    }
  }, [id]);

  if (loading) {
     return (
        <div className="page-container" style={{justifyContent:'center', alignItems:'center', height: '100vh'}}>
           <Spinner />
        </div>
     );
  }

  if (!movie) {
    return (
       <div className="page-container" style={{justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <h2>Movie not found.</h2>
       </div>
    );
  }

  // Helpers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatRuntime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const getDirector = () => movie.credits?.crew?.find(person => person.job === "Director");
  const getWriters = () => movie.credits?.crew?.filter(person => ["Screenplay", "Writer", "Story"].includes(person.job)).slice(0, 2);
  
  const certification = movie.release_dates?.results?.find(r => r.iso_3166_1 === "US")?.release_dates[0]?.certification || "NR";
  
  const trailer = movie.videos?.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
  const videos = movie.videos?.results?.slice(0, 5) || [];

  return (
    <div className="page-container">
      <ToastContainer theme="dark" position="bottom-right" />
      
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-left">
          <Link to="/" style={{textDecoration:'none'}}>
            <div className="nav-logo">MovieHook</div>
          </Link>
          <div className="nav-links">
            <span className="nav-link">Movies</span>
            <span className="nav-link">TV Shows</span>
            <span className="nav-link">People</span>
            <span className="nav-link">More</span>
          </div>
        </div>
        <div className="nav-actions">
          <FaSearch className="nav-icon" size={20} />
          <FaBell className="nav-icon" size={20} />
          <img
            src="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FSouth%20Asian%2F2"
            className="user-avatar"
            alt="Profile"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-backdrop">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="Backdrop"
              className="backdrop-image"
            />
          )}
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <div className="poster-box">
             {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
             ) : (
                <div style={{height: '450px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No Image</div>
             )}
          </div>

          <div className="movie-info-col">
            <h1 className="title-year">
              {movie.title} <span style={{ fontWeight: 400 }}>({movie.release_date?.split('-')[0]})</span>
            </h1>

            <div className="movie-facts">
              <span className="certification">{certification}</span>
              <span>{movie.release_date}</span>
              <span className="bullet">•</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span className="bullet">•</span>
              <span>{movie.genres?.map(g => g.name).join(', ')}</span>
            </div>

            <div className="actions-row">
              <div className="score-container">
                <div className="score-text">
                  {Math.round(movie.vote_average * 10)}<span>%</span>
                </div>
              </div>
              <span className="user-score-label">User Score</span>

              <button className="icon-btn-circle" title="Add to list">
                <FaListUl size={14} />
              </button>
              <button className="icon-btn-circle" title="Mark as favorite">
                <FaHeart size={14} />
              </button>
              <button className="icon-btn-circle" title="Add to watchlist">
                <FaBookmark size={14} />
              </button>
              
              <button className="play-trailer-btn" onClick={() => trailer && window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank")}>
                <FaPlay size={14} /> Play Trailer
              </button>
            </div>

            <div className="tagline">{movie.tagline}</div>

            <h3 className="overview-heading">Overview</h3>
            <p className="overview-text">
              {movie.overview}
            </p>

            <div className="crew-grid">
              {getDirector() && (
                  <div className="crew-member">
                    <span className="name">{getDirector().name}</span>
                    <span className="role">Director</span>
                  </div>
              )}
              {getWriters()?.map(writer => (
                  <div className="crew-member" key={writer.id}>
                    <span className="name">{writer.name}</span>
                    <span className="role">{writer.job}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="content-wrapper">
        <div className="left-column">
          <section className="cast-section">
            <div className="panel-header">Top Billed Cast</div>
            <div className="cast-scroller">
              {movie.credits?.cast?.slice(0, 10).map(person => (
                <CastCard
                  key={person.id}
                  name={person.name}
                  char={person.character}
                  img={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                />
              ))}
            </div>
          </section>

          <section className="social-section">
             <div className="panel-header" style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                Social <span style={{fontSize: '14px', marginLeft: '20px', borderBottom: '4px solid #fff', paddingBottom: '13px'}}>Reviews ({movie.reviews?.total_results || 0})</span> 
             </div>
             
             {movie.reviews?.results?.length > 0 ? (
                 <div className="review-card">
                    <div className="review-header">
                      {movie.reviews.results[0].author_details?.avatar_path ? (
                          <img 
                            src={movie.reviews.results[0].author_details.avatar_path.startsWith('/http') 
                                ? movie.reviews.results[0].author_details.avatar_path.substring(1) 
                                : `https://image.tmdb.org/t/p/w185${movie.reviews.results[0].author_details.avatar_path}`} 
                            className="review-avatar" 
                            alt="Reviewer" 
                          />
                      ) : (
                          <div className="review-avatar" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>?</div>
                      )}
                      
                      <div className="review-meta">
                        <h4>{movie.reviews.results[0].author}</h4>
                        <span>{new Date(movie.reviews.results[0].created_at).toLocaleDateString()}</span>
                      </div>
                      {movie.reviews.results[0].author_details?.rating && (
                         <div className="review-rating-badge"><FaStar size={10} style={{marginRight: '4px'}}/> {movie.reviews.results[0].author_details.rating}</div>
                      )}
                    </div>
                    <p style={{fontSize: '14px', lineHeight: '1.5', margin: 0}}>
                       {movie.reviews.results[0].content.length > 300 
                         ? `${movie.reviews.results[0].content.substring(0, 300)}...` 
                         : movie.reviews.results[0].content}
                    </p>
                 </div>
             ) : (
                 <p style={{color: '#999'}}>No reviews found.</p>
             )}
          </section>

          <section className="media-section">
             <div className="panel-header">
                Media 
                <span style={{fontSize: '14px', marginLeft: '20px', borderBottom: '4px solid #fff', paddingBottom: '13px'}}>Videos ({videos.length})</span> 
             </div>
             <div className="media-scroller">
               {videos.map(vid => (
                  <div className="video-card" key={vid.id} onClick={() => window.open(`https://www.youtube.com/watch?v=${vid.key}`, "_blank")}>
                      <img 
                        src={`https://img.youtube.com/vi/${vid.key}/hqdefault.jpg`} 
                        className="video-thumb"
                        alt={vid.name} 
                      />
                      <div className="play-overlay">
                          <FaPlay color="white" />
                      </div>
                      <div className="video-title">{vid.name}</div>
                   </div>
               ))}
             </div>
          </section>
        </div>

        <aside className="sidebar">
          <div className="social-links">
            <FaFacebookSquare size={24} /> 
            <FaTwitter size={24} />
            <FaInstagram size={24} /> 
            <div style={{width: '1px', height: '24px', background: '#333'}}></div>
            <FaLink size={24} />
          </div>
          
          <FactItem label="Status" value={movie.status} />
          <FactItem label="Original Language" value={movie.original_language?.toUpperCase()} />
          <FactItem label="Budget" value={movie.budget > 0 ? formatCurrency(movie.budget) : '-'} />
          <FactItem label="Revenue" value={movie.revenue > 0 ? formatCurrency(movie.revenue) : '-'} />
          
          <div className="fact-item">
            <div className="fact-label">Keywords</div>
            <div className="keyword-list">
              {movie.keywords?.keywords?.map(kw => (
                 <span className="keyword-tag" key={kw.id}>{kw.name}</span>
              ))}
            </div>
          </div>
        </aside>
      </main>
      
      <footer className="footer">
        <div className="footer-logo">MovieHook</div>
        <div className="copyright">© 2024 MovieHook. All rights reserved. Data provided by TMDB.</div>
      </footer>
    </div>
  );
};

// Reusable Components
const CastCard = ({ name, char, img }) => (
  <div className="cast-card">
    <img
      src={img}
      alt={name}
      className="cast-img"
    />
    <div className="cast-info">
      <div className="cast-name">{name}</div>
      <div className="cast-char">{char}</div>
    </div>
  </div>
);

const FactItem = ({ label, value }) => (
  <div className="fact-item">
    <div className="fact-label">
      {label}
    </div>
    <div className="fact-value">
      {value}
    </div>
  </div>
);

export default Movie;

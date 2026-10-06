import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { getDetailsPath } from "../utils/mediaRoutes";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export default function MovieCard({ movie, mediaType, genre }) {
  const [imageFailed, setImageFailed] = useState(false);
  const title = movie.title || movie.name || "Untitled";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const rating = Number(movie.vote_average);
  const isTv = (mediaType || movie.media_type) === "tv";
  const genreLabel = genre || movie.genre || "";
  const posterPath = movie.poster_path || movie.backdrop_path;
  const imageSize = movie.poster_path ? "w342" : "w500";

  return (
    <Link
      aria-label={`View details for ${title}`}
      className="movie-card"
      to={getDetailsPath(movie, mediaType)}
    >
      <div className="movie-card__poster">
        {posterPath && !imageFailed ? (
          <img
            alt={`${title} poster`}
            decoding="async"
            loading="lazy"
            onError={() => setImageFailed(true)}
            src={`${IMAGE_BASE}/${imageSize}${posterPath}`}
          />
        ) : (
          <div aria-hidden="true" className="movie-card__poster-fallback">
            <span>{title.slice(0, 1).toUpperCase()}</span>
          </div>
        )}
        {rating > 0 && (
          <span className="movie-card__rating" aria-label={`Rating ${rating.toFixed(1)} out of 10`}>
            <FaStar aria-hidden="true" /> {rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-card__copy">
        <h3>{title}</h3>
        <div className="movie-card__meta">
          <span>{year || "Release date TBA"}</span>
          {isTv && <span className="movie-card__type">Series</span>}
          {genreLabel && <span className="movie-card__genre">{genreLabel}</span>}
        </div>
      </div>
    </Link>
  );
}

export function MovieGrid({ movies, mediaType, variant = "grid", getGenre }) {
  return (
    <div className={`movie-grid${variant === "rail" ? " movie-grid--rail" : ""}`}>
      {movies.map((movie) => (
        <MovieCard key={`${mediaType || movie.media_type || "movie"}-${movie.id}`} movie={movie} mediaType={mediaType} genre={getGenre?.(movie)} />
      ))}
    </div>
  );
}

export function LoadingGrid({ count = 5, variant = "grid" }) {
  return (
    <div
      aria-label="Loading titles"
      className={`movie-grid${variant === "rail" ? " movie-grid--rail" : ""}`}
      role="status"
    >
      <span className="sr-only">Loading titles…</span>
      {Array.from({ length: count }, (_, index) => (
        <div aria-hidden="true" className="movie-card movie-card--skeleton" key={index}>
          <div className="movie-card__poster skeleton-block" />
          <div className="movie-card__copy">
            <span className="skeleton-block skeleton-block--title" />
            <span className="skeleton-block skeleton-block--meta" />
          </div>
        </div>
      ))}
    </div>
  );
}

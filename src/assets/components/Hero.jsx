import { FaArrowRight, FaStar } from "react-icons/fa";
import Button from "./Button";
import StatusPanel from "./StatusPanel";
import { getDetailsPath } from "../utils/mediaRoutes";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w1280";

export default function Hero({ movie, loading, error, onRetry }) {
  const year = movie?.release_date?.slice(0, 4);
  const rating = Number(movie?.vote_average);

  return (
    <section aria-labelledby="hero-title" className="featured-hero">
      {movie?.backdrop_path && (
        <img
          alt=""
          className="featured-hero__backdrop"
          decoding="async"
          fetchPriority="high"
          src={`${IMAGE_BASE}${movie.backdrop_path}`}
        />
      )}
      <div aria-hidden="true" className="featured-hero__shade" />
      <div className="featured-hero__content">
        {loading ? (
          <div aria-live="polite" className="featured-hero__loading" role="status">
            <span className="sr-only">Loading a featured film</span>
            <p className="eyebrow">YOUR NEXT GREAT WATCH</p>
            <h1 id="hero-title">A story worth staying in for.</h1>
            <span aria-hidden="true" className="hero-skeleton-line" />
            <span aria-hidden="true" className="hero-skeleton-line hero-skeleton-line--short" />
          </div>
        ) : error ? (
          <div className="featured-hero__message">
            <p className="eyebrow">YOUR NEXT GREAT WATCH</p>
            <h1 id="hero-title">The next story is just around the corner.</h1>
            <StatusPanel compact kind="error" message={error} title="We couldn't load the spotlight.">
              <Button onClick={onRetry} variant="secondary">Try again</Button>
            </StatusPanel>
          </div>
        ) : movie ? (
          <div className="featured-hero__copy">
            <p className="eyebrow">IN THE SPOTLIGHT</p>
            <h1 id="hero-title">{movie.title}</h1>
            <div className="featured-hero__meta">
              {year && <span>{year}</span>}
              {rating > 0 && <span className="featured-hero__rating"><FaStar aria-hidden="true" /> {rating.toFixed(1)} <span>/ 10</span></span>}
              <span>Featured film</span>
            </div>
            <p className="featured-hero__overview">
              {movie.overview || "A new favourite is waiting to be discovered."}
            </p>
            <div className="featured-hero__actions">
              <Button to={getDetailsPath(movie, "movie")}>
                Explore this film <FaArrowRight aria-hidden="true" />
              </Button>
              <Button to="/movie" variant="secondary">Browse the collection</Button>
            </div>
          </div>
        ) : (
          <div className="featured-hero__message">
            <p className="eyebrow">YOUR NEXT GREAT WATCH</p>
            <h1 id="hero-title">Stories worth your time.</h1>
            <StatusPanel compact kind="empty" message="Try the full collection while we find something to spotlight." title="No featured film right now." />
            <Button to="/movie" variant="secondary">Explore the collection</Button>
          </div>
        )}
      </div>
      <div aria-hidden="true" className="featured-hero__index"><span>01</span><i /> DISCOVER</div>
    </section>
  );
}

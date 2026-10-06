import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Button from "./Button";
import MediaSection from "./MediaSection";
import { LoadingGrid, MovieGrid } from "./MovieCard";
import StatusPanel from "./StatusPanel";
import {
  getDiscoverMovies,
  getMovieGenres,
  getPopularMovies,
  getPopularTv,
  getTrendingAll,
  getUpcomingMovies,
} from "../api/tmdb";

const sources = [
  ["trending", getTrendingAll],
  ["popular", getPopularMovies],
  ["upcoming", getUpcomingMovies],
  ["tv", getPopularTv],
  ["discover", getDiscoverMovies],
  ["genres", getMovieGenres],
];

export default function Homevidsection() {
  const [catalog, setCatalog] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { hash } = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    async function loadCatalog() {
      const responses = await Promise.allSettled(
        sources.map(([, fetcher]) => fetcher({ signal: controller.signal })),
      );
      if (controller.signal.aborted) return;

      const nextCatalog = {
        trending: [],
        popular: [],
        upcoming: [],
        tv: [],
        discover: [],
        genres: [],
      };
      const nextErrors = {};

      responses.forEach((response, index) => {
        const [key] = sources[index];
        if (response.status === "fulfilled") {
          nextCatalog[key] = key === "genres"
            ? response.value.genres || []
            : response.value.results || [];
        } else if (key !== "genres") {
          nextErrors[key] = response.reason?.message || "Movie data could not be loaded.";
        }
      });

      setCatalog(nextCatalog);
      setErrors(nextErrors);
      setLoading(false);
    }

    loadCatalog();
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (hash !== "#upcoming" || loading) return;
    const target = document.getElementById("upcoming");
    if (!target) return;
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [hash, loading]);



  const retry = () => {
    setCatalog(null);
    setErrors({});
    setLoading(true);
    setAttempt((value) => value + 1);
  };

  const genresById = new Map((catalog?.genres || []).map((genre) => [genre.id, genre.name]));
  const genreFor = (movie) =>
    (movie.genre_ids || []).map((id) => genresById.get(id)).find(Boolean) || "";

  const renderSection = (key, mediaType, includeGenres = false) => {
    if (loading) return <LoadingGrid count={5} />;
    if (errors[key]) {
      return (
        <StatusPanel kind="error" message={errors[key]} title="This collection didn't load.">
          <Button onClick={retry} variant="secondary">
            Try again
          </Button>
        </StatusPanel>
      );
    }

    const titles = catalog?.[key] || [];
    if (!titles.length) {
      return <StatusPanel title="No titles to show just yet." message="Check back soon for new picks." />;
    }

    return (
      <MovieGrid
        getGenre={includeGenres ? genreFor : undefined}
        mediaType={mediaType}
        movies={titles.slice(0, key === "discover" ? 20 : 10)}
      />
    );
  };

  return (
    <main className="catalog-page page-width">
      <header className="page-intro">
        <p className="eyebrow">THE MOVIES & SERIES</p>
        <h1>Find your next favourite.</h1>
        <p>A thoughtful starting point for whatever you feel like watching.</p>
      </header>

      <MediaSection
        description="The films and series finding an audience today."
        eyebrow="IN THE MOMENT"
        title="Trending now"
      >
        {renderSection("trending")}
      </MediaSection>

      <MediaSection
        description="Popular films worth adding to your list."
        eyebrow="WELL LOVED"
        title="Popular films"
      >
        {renderSection("popular", "movie", true)}
      </MediaSection>

      <MediaSection
        className="media-section--upcoming"
        description="A first look at what is on the way."
        eyebrow="COMING SOON"
        id="upcoming"
        title="Upcoming releases"
      >
        {renderSection("upcoming", "movie", true)}
      </MediaSection>

      <MediaSection
        description="Long-form stories, ready for your next night in."
        eyebrow="THE SMALL SCREEN"
        title="Popular series"
      >
        {renderSection("tv", "tv")}
      </MediaSection>

      <div className="catalog-more">
        <Button
          aria-controls="discover-films"
          aria-expanded={showMore}
          onClick={() => setShowMore((value) => !value)}
          variant="secondary"
        >
          {showMore ? "Show fewer films" : "Explore more films"}
        </Button>
      </div>

      <div hidden={!showMore} id="discover-films">
        <MediaSection
          description="More films, selected from TMDB's most popular discoveries."
          eyebrow="KEEP EXPLORING"
          title="More to discover"
        >
          {renderSection("discover", "movie", true)}
        </MediaSection>
      </div>
    </main>
  );
}

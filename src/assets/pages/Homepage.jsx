import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Vidsection from "../components/Vidsection";
import { getTrendingMovies } from "../api/tmdb";

export default function Homepage() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setFeaturedMovie(null);
    setError("");
    setLoading(true);

    async function loadFeatured() {
      try {
        const data = await getTrendingMovies({ signal: controller.signal });
        const candidates = (data.results || []).filter((movie) => movie.backdrop_path);
        if (!controller.signal.aborted && candidates.length) {
          setFeaturedMovie(candidates[Math.floor(Math.random() * candidates.length)]);
        }
      } catch (loadError) {
        if (!controller.signal.aborted) setError(loadError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadFeatured();
    return () => controller.abort();
  }, [attempt]);

  return (
    <main className="home-page">
      <Hero
        error={error}
        loading={loading}
        movie={featuredMovie}
        onRetry={() => setAttempt((value) => value + 1)}
      />
      <Vidsection />
    </main>
  );
}

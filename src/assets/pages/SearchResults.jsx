import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Button from "../components/Button";
import StatusPanel from "../components/StatusPanel";
import { LoadingGrid, MovieGrid } from "../components/MovieCard";
import { searchMovies } from "../api/tmdb";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const movieQuery = (searchParams.get("q") || "").trim();
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setError("");

    if (!movieQuery) {
      setResults([]);
      setTotalResults(0);
      setLoading(false);
      return () => controller.abort();
    }

    setResults([]);
    setTotalResults(0);
    setLoading(true);

    async function loadResults() {
      try {
        const data = await searchMovies(movieQuery, { signal: controller.signal });
        if (!controller.signal.aborted) {
          setResults(data.results || []);
          setTotalResults(Number(data.total_results) || 0);
        }
      } catch (loadError) {
        if (!controller.signal.aborted) setError(loadError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadResults();
    return () => controller.abort();
  }, [movieQuery, attempt]);

  return (
    <main className="search-page page-width">
      <header className="page-intro">
        <p className="eyebrow">SEARCH THE COLLECTION</p>
        <h1>
          {movieQuery ? <>Results for <span>“{movieQuery}”</span></> : "Find your next favourite."}
        </h1>
        <p>Search films by title and follow the story to its details.</p>
      </header>

      {!movieQuery ? (
        <StatusPanel
          message="Use the search field in the top bar to look up a film by name."
          title="Ready when you are."
        />
      ) : loading ? (
        <LoadingGrid count={8} />
      ) : error ? (
        <StatusPanel kind="error" message={error} title="Search couldn't be completed.">
          <Button onClick={() => setAttempt((value) => value + 1)} variant="secondary">Try again</Button>
        </StatusPanel>
      ) : results.length ? (
        <>
          <p className="search-results__count">
            Showing {results.length} of {totalResults.toLocaleString("en-GB")} {totalResults === 1 ? "result" : "results"}
          </p>
          <MovieGrid mediaType="movie" movies={results} />
        </>
      ) : (
        <StatusPanel
          message={`Try another spelling or search a different title from the top bar.`}
          title={`No films found for “${movieQuery}”.`}
        />
      )}
    </main>
  );
}

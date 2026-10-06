import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";
import MediaSection from "./MediaSection";
import { LoadingGrid, MovieGrid } from "./MovieCard";
import StatusPanel from "./StatusPanel";
import { getTrendingAll, getUpcomingMovies } from "../api/tmdb";

const initialSection = { items: [], loading: true, error: "" };

function SectionContent({ section, onRetry, variant = "rail" }) {
  if (section.loading) return <LoadingGrid count={5} variant={variant} />;
  if (section.error) {
    return (
      <StatusPanel kind="error" message={section.error} title="This collection didn't load." compact>
        <Button onClick={onRetry} variant="secondary">Try again</Button>
      </StatusPanel>
    );
  }
  if (!section.items.length) {
    return <StatusPanel title="No titles to show just yet." message="Check back soon for new picks." compact />;
  }
  return <MovieGrid movies={section.items.slice(0, 10)} variant={variant} />;
}

export default function Vidsection() {
  const [trending, setTrending] = useState(initialSection);
  const [upcoming, setUpcoming] = useState({ ...initialSection, loading: true });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadSections() {
      const responses = await Promise.allSettled([
        getTrendingAll({ signal: controller.signal }),
        getUpcomingMovies({ signal: controller.signal }),
      ]);
      if (controller.signal.aborted) return;

      const nextState = responses.map((response) => {
        if (response.status === "rejected") {
          return { items: [], loading: false, error: response.reason?.message || "Movie data could not be loaded." };
        }
        return { items: response.value.results || [], loading: false, error: "" };
      });
      setTrending(nextState[0]);
      setUpcoming(nextState[1]);
    }

    loadSections();
    return () => controller.abort();
  }, [attempt]);

  const retry = () => {
    setTrending({ items: [], loading: true, error: "" });
    setUpcoming({ items: [], loading: true, error: "" });
    setAttempt((value) => value + 1);
  };

  return (
    <div className="home-collections page-width">
      <MediaSection
        action={<Button to="/movie" variant="quiet">Explore the catalogue <FaArrowRight aria-hidden="true" /></Button>}
        description="The films and series everyone is talking about."
        eyebrow="ON THE RADAR"
        title="Trending now"
      >
        <SectionContent onRetry={retry} section={trending} />
      </MediaSection>

      <MediaSection
        action={<Button to="/movie#upcoming" variant="quiet">See upcoming releases <FaArrowRight aria-hidden="true" /></Button>}
        description="A first look at what is heading to the big screen."
        eyebrow="COMING SOON"
        title="On the horizon"
      >
        <SectionContent onRetry={retry} section={upcoming} variant="grid" />
      </MediaSection>
    </div>
  );
}

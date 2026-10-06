import { useEffect, useState } from "react";
import { FaCheck, FaLink, FaPlay, FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import Button from "../components/Button";
import MediaSection from "../components/MediaSection";
import StatusPanel from "../components/StatusPanel";
import { getMovieDetails, getTvDetails } from "../api/tmdb";

const IMAGE_BASE = "https://image.tmdb.org/t/p";

function formatDate(value) {
  if (!value) return "—";
  const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatRuntime(minutes) {
  const value = Number(minutes);
  if (!value || value < 1) return "—";
  const hours = Math.floor(value / 60);
  const remainder = value % 60;
  return hours ? `${hours}h ${remainder}m` : `${remainder} min`;
}

function formatCurrency(value) {
  const amount = Number(value);
  if (!amount) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getCertification(title, isTv) {
  if (isTv) {
    return title.content_ratings?.results?.find((entry) => entry.iso_3166_1 === "US")?.rating || "NR";
  }
  const releases = title.release_dates?.results?.find((entry) => entry.iso_3166_1 === "US")?.release_dates || [];
  return releases.find((entry) => entry.certification)?.certification || "NR";
}

function getKeywords(title) {
  const values = title.keywords?.keywords || title.keywords?.results || [];
  return values.slice(0, 12);
}

function getTrailer(videos) {
  const playableVideos = videos.filter((video) => video.site === "YouTube" && video.key);
  return playableVideos.find((video) => video.type === "Trailer")
    || playableVideos.find((video) => video.type === "Teaser")
    || null;
}

function getImageUrl(path, size = "w342") {
  if (!path) return "";
  return path.startsWith("/http")
    ? path.slice(1)
    : `${IMAGE_BASE}/${size}${path}`;
}

function PersonCard({ person, character }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = getImageUrl(person.profile_path, "w185");
  const initials = person.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="person-card">
      <div className="person-card__portrait">
        {imageUrl && !imageFailed ? (
          <img
            alt={`${person.name}`}
            decoding="async"
            loading="lazy"
            onError={() => setImageFailed(true)}
            src={imageUrl}
          />
        ) : (
          <span aria-label={`No portrait for ${person.name}`} className="person-card__initials">
            {initials}
          </span>
        )}
      </div>
      <h3>{person.name}</h3>
      {character && <p>{character}</p>}
    </article>
  );
}

function Fact({ label, value }) {
  return (
    <div className="detail-fact">
      <dt>{label}</dt>
      <dd>{value || "—"}</dd>
    </div>
  );
}

export default function Movie({ mediaType = "movie" }) {
  const { id } = useParams();
  const isTv = mediaType === "tv";
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    const controller = new AbortController();
    setTitle(null);
    setLoading(true);
    setError("");
    setCopyState("idle");

    async function loadTitle() {
      try {
        const fetchDetails = isTv ? getTvDetails : getMovieDetails;
        const data = await fetchDetails(id, { signal: controller.signal });
        if (!controller.signal.aborted) setTitle(data);
      } catch (loadError) {
        if (!controller.signal.aborted) setError(loadError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    if (id) loadTitle();
    else {
      setError("This title does not have a valid address.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id, isTv, attempt]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  if (loading) {
    return (
      <main className="detail-page page-width">
        <div aria-label="Loading title details" className="detail-loading" role="status">
          <span className="sr-only">Loading title details…</span>
          <div className="detail-loading__poster skeleton-block" />
          <div className="detail-loading__copy">
            <span className="skeleton-block skeleton-block--meta" />
            <span className="skeleton-block skeleton-block--title" />
            <span className="skeleton-block skeleton-block--line" />
            <span className="skeleton-block skeleton-block--line" />
            <span className="skeleton-block skeleton-block--line skeleton-block--short" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !title) {
    return (
      <main className="detail-page detail-page--message page-width">
        <StatusPanel kind="error" message={error || "Try again or return to the catalogue."} title="We couldn't load this title.">
          <Button onClick={() => setAttempt((value) => value + 1)} variant="secondary">Try again</Button>
          <Button to="/movie" variant="primary">Back to discovery</Button>
        </StatusPanel>
      </main>
    );
  }

  const name = title.title || title.name || "Untitled";
  const releaseDate = title.release_date || title.first_air_date;
  const year = releaseDate?.slice(0, 4);
  const genres = title.genres || [];
  const vote = Number(title.vote_average);
  const videos = title.videos?.results || [];
  const trailer = getTrailer(videos);
  const cast = title.credits?.cast || [];
  const crew = title.credits?.crew || [];
  const director = crew.find((member) => member.job === "Director");
  const creators = title.created_by || [];
  const writers = crew.filter((member) => ["Writer", "Screenplay", "Story", "Teleplay"].includes(member.job));
  const review = title.reviews?.results?.[0];
  const keywords = getKeywords(title);
  const runtime = isTv ? title.episode_run_time?.[0] : title.runtime;
  const facts = isTv
    ? [
        { label: "Status", value: title.status },
        { label: "First aired", value: formatDate(title.first_air_date) },
        { label: "Seasons", value: title.number_of_seasons },
        { label: "Episodes", value: title.number_of_episodes },
        { label: "Original language", value: title.original_language?.toUpperCase() },
      ]
    : [
        { label: "Status", value: title.status },
        { label: "Release date", value: formatDate(title.release_date) },
        { label: "Original language", value: title.original_language?.toUpperCase() },
        { label: "Budget", value: formatCurrency(title.budget) },
        { label: "Revenue", value: formatCurrency(title.revenue) },
      ];

  return (
    <main className="detail-page">
      <section aria-labelledby="detail-title" className="detail-hero">
        {title.backdrop_path && (
          <img
            alt=""
            className="detail-hero__backdrop"
            decoding="async"
            fetchPriority="high"
            src={`${IMAGE_BASE}/w1280${title.backdrop_path}`}
          />
        )}
        <div aria-hidden="true" className="detail-hero__scrim" />

        <div className="detail-hero__inner page-width">
          <div className="detail-poster">
            {title.poster_path ? (
              <img
                alt={`${name} poster`}
                decoding="async"
                fetchPriority="high"
                height="750"
                src={`${IMAGE_BASE}/w500${title.poster_path}`}
                width="500"
              />
            ) : (
              <div className="detail-poster__empty">Poster unavailable</div>
            )}
          </div>

          <div className="detail-hero__copy">
            <p className="eyebrow">{isTv ? "SERIES PROFILE" : "FILM PROFILE"}</p>
            <h1 id="detail-title">{name}{year && <span className="detail-year"> ({year})</span>}</h1>
            <div className="detail-meta" aria-label="Title information">
              <span>{getCertification(title, isTv)}</span>
              {releaseDate && <span>{formatDate(releaseDate)}</span>}
              {runtime && <span>{isTv ? `${formatRuntime(runtime)} per episode` : formatRuntime(runtime)}</span>}
              {genres.length > 0 && <span>{genres.map((genre) => genre.name).join(" · ")}</span>}
            </div>

            <div className="detail-actions">
              {vote > 0 && (
                <div
                  aria-label={`TMDB rating ${vote.toFixed(1)} out of 10`}
                  className="score-ring"
                  style={{ "--score": `${Math.round(vote * 10)}%` }}
                >
                  <span>{vote.toFixed(1)}</span>
                </div>
              )}
              {trailer && (
                <a
                  className="button button--primary"
                  href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <FaPlay aria-hidden="true" /> Watch trailer
                </a>
              )}
              <Button className="button--share" onClick={handleCopyLink} variant="secondary">
                {copyState === "copied" ? <FaCheck aria-hidden="true" /> : <FaLink aria-hidden="true" />}
                {copyState === "copied" ? "Copied" : "Copy link"}
              </Button>
            </div>
            {copyState === "failed" && (
              <p className="copy-feedback" role="status">Your browser couldn't copy the link. Copy it from the address bar instead.</p>
            )}

            {title.tagline && <p className="detail-tagline">“{title.tagline}”</p>}
            <div className="detail-overview">
              <h2>Overview</h2>
              <p>{title.overview || "No overview has been added for this title yet."}</p>
            </div>

            <div className="detail-credits">
              {(isTv ? creators.length > 0 : director) && (
                <div>
                  <span>{isTv ? "Created by" : "Directed by"}</span>
                  <p>{isTv ? creators.map((person) => person.name).join(", ") : director.name}</p>
                </div>
              )}
              {writers.length > 0 && (
                <div>
                  <span>Written by</span>
                  <p>{writers.slice(0, 4).map((person) => person.name).join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="detail-content page-width">
        <div className="detail-content__main">
          <MediaSection
            description="The people who brought this story to life."
            eyebrow="CAST"
            title="Top billed"
          >
            {cast.length ? (
              <div aria-label="Cast members" className="person-rail">
                {cast.slice(0, 12).map((person) => (
                  <PersonCard character={person.character} key={person.id} person={person} />
                ))}
              </div>
            ) : (
              <StatusPanel title="Cast details are not available yet." />
            )}
          </MediaSection>

          <MediaSection
            description="Trailers, teasers and clips."
            eyebrow="WATCH"
            title="Videos"
          >
            {videos.length ? (
              <div className="video-grid">
                {videos.slice(0, 5).map((video) => (
                  <a
                    className="video-card"
                    href={video.site === "YouTube" && video.key ? `https://www.youtube.com/watch?v=${encodeURIComponent(video.key)}` : `https://www.themoviedb.org/${isTv ? "tv" : "movie"}/${id}/videos`}
                    key={video.id}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {video.site === "YouTube" && video.key ? (
                      <img
                        alt=""
                        className="video-card__thumbnail"
                        decoding="async"
                        loading="lazy"
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      />
                    ) : (
                      <div className="video-card__thumbnail video-card__thumbnail--empty" />
                    )}
                    <span aria-hidden="true" className="video-card__play"><FaPlay /></span>
                    <span className="video-card__title">{video.name}</span>
                    <span className="video-card__type">{video.type}</span>
                  </a>
                ))}
              </div>
            ) : (
              <StatusPanel title="No videos have been added yet." message="Check back for trailers and clips." />
            )}
          </MediaSection>

          <MediaSection
            description="A note from the people who watched it."
            eyebrow="AUDIENCE NOTES"
            title="Reviews"
          >
            {review ? (
              <article className="review-card">
                <div className="review-card__header">
                  <div className="review-card__identity">
                    <div aria-hidden="true" className="review-avatar">
                      {review.author?.trim()?.[0]?.toUpperCase() || "M"}
                    </div>
                    <div>
                      <h3>{review.author || "TMDB member"}</h3>
                      <p>{formatDate(review.created_at)}</p>
                    </div>
                  </div>
                  {review.author_details?.rating != null && (
                    <span className="review-rating"><FaStar aria-hidden="true" /> {review.author_details.rating}/10</span>
                  )}
                </div>
                <p className="review-card__excerpt">
                  {review.content?.length > 380 ? `${review.content.slice(0, 380).trim()}…` : review.content}
                </p>
                {review.content?.length > 380 && (
                  <details className="review-more">
                    <summary>Read full review</summary>
                    <p>{review.content}</p>
                  </details>
                )}
              </article>
            ) : (
              <StatusPanel title="No reviews yet." message="Be the first to share a reaction on TMDB." />
            )}
          </MediaSection>
        </div>

        <aside className="detail-sidebar">
          <section aria-labelledby="facts-heading" className="detail-facts-panel">
            <p className="eyebrow">AT A GLANCE</p>
            <h2 id="facts-heading">Details</h2>
            <dl>
              {facts.map((fact) => <Fact key={fact.label} label={fact.label} value={fact.value} />)}
              {isTv && runtime && <Fact label="Episode length" value={`${formatRuntime(runtime)}`} />}
            </dl>
          </section>

          {keywords.length > 0 && (
            <section aria-labelledby="keywords-heading" className="detail-keywords">
              <p className="eyebrow">THEMES</p>
              <h2 id="keywords-heading">Keywords</h2>
              <div className="keyword-list">
                {keywords.map((keyword) => (
                  <span className="keyword-chip" key={keyword.id}>{keyword.name}</span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}

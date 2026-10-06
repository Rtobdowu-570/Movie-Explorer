export function getDetailsPath(movie, mediaType) {
  const type = mediaType || movie.media_type || "movie";
  return type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`;
}

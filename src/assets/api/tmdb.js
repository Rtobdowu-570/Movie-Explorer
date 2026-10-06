const API_BASE = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

async function request(path, params = {}, options = {}) {
  if (!API_TOKEN) {
    throw new Error(
      "TMDB access is not configured. Add VITE_TMDB_API_KEY to a local .env.local file and restart the app.",
    );
  }

  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  let response;
  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      signal: options.signal,
    });
  } catch (error) {
    if (options.signal?.aborted) throw error;
    throw new Error("We couldn't reach TMDB right now. Check your connection and try again.");
  }

  if (!response.ok) {
    const message =
      response.status === 401 || response.status === 403
        ? "TMDB could not authorise this request. Check the access token and try again."
        : response.status === 404
          ? "That title could not be found."
          : response.status === 429
            ? "TMDB is receiving too many requests. Please wait a moment and try again."
            : `Movie data is unavailable right now (error ${response.status}). Try again in a moment.`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export const getTrendingMovies = (options) => request("/trending/movie/day", {}, options);
export const getTrendingAll = (options) =>
  request("/trending/all/day", { language: "en-US" }, options);
export const getUpcomingMovies = (options) =>
  request("/movie/upcoming", { language: "en-US", page: 1 }, options);
export const getPopularMovies = (options) =>
  request("/movie/popular", { language: "en-US", page: 1 }, options);
export const getPopularTv = (options) =>
  request(
    "/discover/tv",
    {
      include_adult: false,
      include_null_first_air_dates: false,
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
    },
    options,
  );
export const getDiscoverMovies = (options) =>
  request(
    "/discover/movie",
    {
      include_adult: false,
      include_null_first_air_dates: false,
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
    },
    options,
  );
export const getMovieGenres = (options) =>
  request("/genre/movie/list", { language: "en-US" }, options);
export const searchMovies = (query, options) =>
  request("/search/movie", { include_adult: false, language: "en-US", page: 1, query }, options);

const MOVIE_DETAIL_APPEND = "credits,reviews,videos,keywords,release_dates,similar";
const TV_DETAIL_APPEND = "credits,reviews,videos,keywords,similar,content_ratings";

export const getMovieDetails = (id, options) =>
  request(
    `/movie/${encodeURIComponent(id)}`,
    { append_to_response: MOVIE_DETAIL_APPEND, language: "en-US" },
    options,
  );

export const getTvDetails = (id, options) =>
  request(
    `/tv/${encodeURIComponent(id)}`,
    { append_to_response: TV_DETAIL_APPEND, language: "en-US" },
    options,
  );

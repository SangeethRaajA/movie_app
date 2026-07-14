export type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  number_of_episodes?: number;
  number_of_seasons?: number;
  popularity?: number;
  media_type?: string;
};

export type TmdbListResponse<T> = {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
  genres?: Array<{ id: number; name: string }>;
};

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_API_KEY =
  process.env.TMDB_API_KEY ||
  process.env.NEXT_PUBLIC_TMDB_API_KEY ||
  "f5baf8c74c7d5f00a242c165979d0913";

async function fetchTmdb<T>(path: string, params: Record<string, string | number | undefined> = {}): Promise<T | null> {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`TMDB request failed with ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("TMDB fetch error", error);
    return null;
  }
}

export function getPosterUrl(path?: string | null, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder-poster.png";
}

export function getBackdropUrl(path?: string | null, size = "w1280") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder-backdrop.png";
}

export function getMediaTitle(item: MediaItem) {
  return item.title || item.name || "Untitled";
}

export function getReleaseYear(item: MediaItem) {
  const date = item.release_date || item.first_air_date;
  return date ? new Date(date).getFullYear().toString() : "—";
}

export function formatVoteAverage(value?: number) {
  return value ? value.toFixed(1) : "N/A";
}

export async function getHomePageData() {
  const [trending, popularMovies, popularSeries] = await Promise.all([
    fetchTmdb<TmdbListResponse<MediaItem>>("/trending/all/week"),
    fetchTmdb<TmdbListResponse<MediaItem>>("/movie/popular"),
    fetchTmdb<TmdbListResponse<MediaItem>>("/tv/popular"),
  ]);

  const featuredMovie = popularMovies?.results[0] || null;
  const featuredSeries = popularSeries?.results[0] || null;
  const trendingResults = trending?.results.slice(0, 6) || [];
  const movieHighlights = popularMovies?.results.slice(0, 8) || [];
  const seriesHighlights = popularSeries?.results.slice(0, 4) || [];

  return {
    featuredMovie,
    featuredSeries,
    trendingResults,
    movieHighlights,
    seriesHighlights,
  };
}

export async function getMovieList(category: string, page = 1) {
  return fetchTmdb<TmdbListResponse<MediaItem>>(`/movie/${category}`, { page });
}

export async function getSeriesList(category: string, page = 1) {
  return fetchTmdb<TmdbListResponse<MediaItem>>(`/tv/${category}`, { page });
}

export async function getMovieDetails(id: string) {
  return fetchTmdb<MediaItem>(`/movie/${id}`);
}

export async function getSeriesDetails(id: string) {
  return fetchTmdb<MediaItem>(`/tv/${id}`);
}

export async function getMovieGenres() {
  return fetchTmdb<TmdbListResponse<{ id: number; name: string }>>("/genre/movie/list");
}

export async function getSeriesGenres() {
  return fetchTmdb<TmdbListResponse<{ id: number; name: string }>>("/genre/tv/list");
}

export async function getCountries() {
  return fetchTmdb<Array<{ iso_3166_1: string; english_name: string }>>("/configuration/countries");
}

export async function getDiscoverItems(type: "movie" | "tv" = "movie", page = 1, genre?: string, country?: string) {
  const params: Record<string, string | number | undefined> = { page };
  if (genre) params.with_genres = genre;
  if (country && type === "movie") params.with_origin_country = country;

  const path = type === "movie" ? "/discover/movie" : "/discover/tv";
  return fetchTmdb<TmdbListResponse<MediaItem>>(path, params);
}

export async function getTopImdbMovies(page = 1, genre?: string, country?: string) {
  const params: Record<string, string | number | undefined> = {
    page,
    sort_by: "vote_average.desc",
    "vote_count.gte": 1000,
  };
  if (genre) params.with_genres = genre;
  if (country) params.with_origin_country = country;
  return fetchTmdb<TmdbListResponse<MediaItem>>("/discover/movie", params);
}

export async function searchMedia(query: string, type: "movie" | "tv" = "movie", genre?: string, country?: string, page = 1) {
  if (!query.trim()) {
    return null;
  }

  const params: Record<string, string | number | undefined> = { query, page };
  if (genre) {
    params.with_genres = genre;
  }
  if (country && type === "movie") {
    params.with_origin_country = country;
  }

  return fetchTmdb<TmdbListResponse<MediaItem>>(`/search/${type}`, params);
}

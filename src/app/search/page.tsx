import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import { getCountries, getMovieGenres, getSeriesGenres, searchMedia } from "@/lib/tmdb";

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value ?? "";
}

function buildPaginationLinks(query: string, type: string, genre: string, country: string, page: number, totalPages: number) {
  const pages = [] as number[];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let index = start; index <= end; index += 1) {
    pages.push(index);
  }

  return pages.map((pageNumber) => ({
    pageNumber,
    href: `/search?query=${encodeURIComponent(query)}&type=${type}${genre ? `&genre=${encodeURIComponent(genre)}` : ""}${country ? `&country=${encodeURIComponent(country)}` : ""}&page=${pageNumber}`,
  }));
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = (await searchParams) || {};
  const query = getSingleValue(resolvedParams.query).trim();
  const type = getSingleValue(resolvedParams.type) === "tv" ? "tv" : "movie";
  const genre = getSingleValue(resolvedParams.genre);
  const country = getSingleValue(resolvedParams.country);
  const page = Number(getSingleValue(resolvedParams.page) || 1);

  const genreOptions = type === "tv"
    ? (await getSeriesGenres())?.genres || []
    : (await getMovieGenres())?.genres || [];
  const countryOptions = type === "movie" ? (await getCountries()) || [] : [];

  const results = query ? await searchMedia(query, type, genre || undefined, country || undefined, page) : null;
  const items = results?.results || [];
  const totalPages = results?.total_pages || 0;
  const hasError = Boolean(query) && !results;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#11223d_0%,_#020617_60%,_#01020b_100%)] text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Search</p>
            <h1 className="text-3xl font-semibold text-white">Find titles by mood, genre, or name</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/search?type=movie" className={`rounded-full px-4 py-2 text-sm ${type === "movie" ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-400/30 hover:text-white"}`}>
              Movies
            </Link>
            <Link href="/search?type=tv" className={`rounded-full px-4 py-2 text-sm ${type === "tv" ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-400/30 hover:text-white"}`}>
              Series
            </Link>
          </div>
        </div>

        <form action="/search" method="get" className="rounded-[24px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap gap-3">
            <input
              name="query"
              defaultValue={query}
              placeholder="Search for a movie or show"
              className="min-w-[240px] flex-1 rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
            />
            <select name="type" defaultValue={type} className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
              <option value="movie">Movies</option>
              <option value="tv">Series</option>
            </select>
            <select name="genre" defaultValue={genre} className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
              <option value="">All genres</option>
              {genreOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {type === "movie" ? (
              <select name="country" defaultValue={country} className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                <option value="">All countries</option>
                {countryOptions.map((item) => (
                  <option key={item.iso_3166_1} value={item.iso_3166_1}>
                    {item.english_name}
                  </option>
                ))}
              </select>
            ) : null}
            <button type="submit" className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">
              Search
            </button>
          </div>
        </form>

        <div className="grid gap-3 rounded-[24px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl sm:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm text-zinc-400">
              {query ? `Showing results for “${query}” in ${type === "tv" ? "series" : "movies"}.` : "Use the search bar to look up a title."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/genres" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
              Browse Genres
            </Link>
            <Link href="/country" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
              Search by Country
            </Link>
            <Link href="/top-imdb" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
              Top IMDb
            </Link>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
          {hasError ? (
            <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-8 text-center text-amber-200">
              We couldn’t load results right now. Please try again in a moment.
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <MovieCard key={item.id} item={item} href={type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`} type={type === "tv" ? "tv" : "movie"} />
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {page > 1 ? (
                    <Link href={`/search?query=${encodeURIComponent(query)}&type=${type}${genre ? `&genre=${encodeURIComponent(genre)}` : ""}${country ? `&country=${encodeURIComponent(country)}` : ""}&page=${page - 1}`} className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
                      Previous
                    </Link>
                  ) : null}
                  {buildPaginationLinks(query, type, genre, country, page, totalPages).map((link) => (
                    <Link
                      key={link.pageNumber}
                      href={link.href}
                      className={`rounded-full px-3 py-2 text-sm ${link.pageNumber === page ? "bg-cyan-400 text-slate-950" : "border border-white/10 text-zinc-300 hover:border-cyan-400/30 hover:text-white"}`}
                    >
                      {link.pageNumber}
                    </Link>
                  ))}
                  {page < totalPages ? (
                    <Link href={`/search?query=${encodeURIComponent(query)}&type=${type}${genre ? `&genre=${encodeURIComponent(genre)}` : ""}${country ? `&country=${encodeURIComponent(country)}` : ""}&page=${page + 1}`} className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
                      Next
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center text-zinc-400">
              {query ? "No results matched that search. Try another title, genre, or country." : "Enter a movie or series title to get started."}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

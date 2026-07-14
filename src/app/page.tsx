import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import {
  formatVoteAverage,
  getBackdropUrl,
  getHomePageData,
  getMediaTitle,
  getReleaseYear,
} from "@/lib/tmdb";

const discoveryLinks = [
  { href: "/genres", label: "Genres", description: "Discover by mood and category" },
  { href: "/country", label: "Country", description: "Explore films from around the world" },
  { href: "/top-imdb", label: "Top IMDb", description: "High-rated favorites" },
  { href: "/search", label: "Search", description: "Find exact titles instantly" },
];

export default async function Home() {
  const {
    featuredMovie,
    featuredSeries,
    trendingResults,
    movieHighlights,
    seriesHighlights,
  } = await getHomePageData();

  const featured = featuredMovie || featuredSeries;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#12233d_0%,_#020617_55%,_#01020b_100%)] text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-zinc-950/80 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          <img
            src={getBackdropUrl(featured?.backdrop_path)}
            alt={getMediaTitle(featured || { id: 0, title: "Featured title" })}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30" />
          <div className="relative grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/15 px-3 py-1 text-sm font-medium text-cyan-300">
                    Featured Release
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200">
                    {featured?.media_type === "tv" ? "On TV" : "In Cinemas"}
                  </span>
                </div>
                <div className="max-w-2xl space-y-3">
                  <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                    {getMediaTitle(featured || { id: 0, title: "Featured title" })}
                  </h1>
                  <p className="max-w-xl text-sm leading-7 text-zinc-200 sm:text-base">
                    {featured?.overview || "Discover a fresh selection of blockbuster films, acclaimed series, and hidden gems from TMDB."}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                  <span className="rounded-full bg-white/10 px-3 py-1">★ {formatVoteAverage(featured?.vote_average)}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{getReleaseYear(featured || { id: 0, title: "Featured title" })}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">{featured?.media_type === "tv" ? "Series" : "Movie"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={featured?.media_type === "tv" ? `/tv/${featured.id}` : `/movie/${featured?.id}`}
                  className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  View Details
                </Link>
                <Link
                  href="/search"
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Search Library
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Trending This Week</p>
                  <h2 className="text-xl font-semibold text-white">Popular across the platform</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {trendingResults.slice(0, 5).map((item, index) => (
                  <Link
                    key={item.id}
                    href={item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-cyan-300">0{index + 1}</span>
                      <div>
                        <p className="font-medium text-white">{getMediaTitle(item)}</p>
                        <p className="text-sm text-zinc-400">{item.media_type === "tv" ? "Series" : "Movie"}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm font-semibold text-cyan-300">
                      ★ {formatVoteAverage(item.vote_average)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">What&apos;s Popular</p>
                <h3 className="text-2xl font-semibold text-white">Movies fans are watching now</h3>
              </div>
              <Link href="/movies" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-cyan-400/30 hover:text-white">
                Explore movies
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {movieHighlights.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} item={movie} href={`/movie/${movie.id}`} />
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Discover More</p>
                <h3 className="text-2xl font-semibold text-white">Browse by taste</h3>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {discoveryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Series Spotlight</p>
              <h3 className="text-2xl font-semibold text-white">Popular television</h3>
            </div>
            <Link href="/series" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-cyan-400/30 hover:text-white">
              Explore series
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {seriesHighlights.map((series) => (
              <MovieCard key={series.id} item={series} href={`/tv/${series.id}`} type="tv" />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import { getMovieList } from "@/lib/tmdb";

const categories = [
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "now_playing", label: "Now Playing" },
  { key: "upcoming", label: "Upcoming" },
];

type MoviesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value ?? "";
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const resolvedParams = (await searchParams) || {};
  const category = getSingleValue(resolvedParams.category) || "popular";
  const page = Number(getSingleValue(resolvedParams.page) || 1);
  const response = await getMovieList(category, page);
  const movies = response?.results || [];
  const totalPages = response?.total_pages || 0;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#11223d_0%,_#020617_60%,_#01020b_100%)] text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Movies</p>
            <h1 className="text-3xl font-semibold text-white">Curated movie collections</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Link
                key={item.key}
                href={`/movies?category=${item.key}`}
                className={`rounded-full px-4 py-2 text-sm transition ${category === item.key ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-400/30 hover:text-white"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} item={movie} href={`/movie/${movie.id}`} />
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? (
              <Link href={`/movies?category=${category}&page=${page - 1}`} className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
                Previous
              </Link>
            ) : null}
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Link
                  key={pageNumber}
                  href={`/movies?category=${category}&page=${pageNumber}`}
                  className={`rounded-full px-3 py-2 text-sm ${pageNumber === page ? "bg-cyan-400 text-slate-950" : "border border-white/10 text-zinc-300 hover:border-cyan-400/30 hover:text-white"}`}
                >
                  {pageNumber}
                </Link>
              );
            })}
            {page < totalPages ? (
              <Link href={`/movies?category=${category}&page=${page + 1}`} className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
                Next
              </Link>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}

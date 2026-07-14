import Link from "next/link";
import { MovieCard } from "@/components/MovieCard";
import { getCountries, getDiscoverItems } from "@/lib/tmdb";

type CountryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value ?? "";
}

export default async function CountryPage({ searchParams }: CountryPageProps) {
  const resolvedParams = (await searchParams) || {};
  const country = getSingleValue(resolvedParams.country);
  const page = Number(getSingleValue(resolvedParams.page) || 1);

  const countryOptions = (await getCountries()) || [];
  const results = await getDiscoverItems("movie", page, undefined, country || undefined);
  const items = results?.results || [];
  const totalPages = results?.total_pages || 0;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#11223d_0%,_#020617_60%,_#01020b_100%)] text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Country</p>
            <h1 className="text-3xl font-semibold text-white">Explore movies by country</h1>
          </div>
          <Link href="/country" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
            Refresh
          </Link>
        </div>

        <form action="/country" method="get" className="rounded-[24px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap gap-3">
            <select name="country" defaultValue={country} className="min-w-[240px] rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none">
              <option value="">All countries</option>
              {countryOptions.map((item) => (
                <option key={item.iso_3166_1} value={item.iso_3166_1}>
                  {item.english_name}
                </option>
              ))}
            </select>
            <button type="submit" className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">
              Filter
            </button>
          </div>
        </form>

        <div className="rounded-[24px] border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
          <p className="text-sm text-zinc-400">
            {country ? `Showing movies produced in ${country}.` : "Browse movies from around the world."}
          </p>

          {items.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <MovieCard key={item.id} item={item} href={`/movie/${item.id}`} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center text-zinc-400">
              No movies found for that country. Try another region.
            </div>
          )}

          {totalPages > 1 ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {page > 1 ? (
                <Link href={`/country?country=${country}&page=${page - 1}`} className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
                  Previous
                </Link>
              ) : null}
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <Link
                    key={pageNumber}
                    href={`/country?country=${country}&page=${pageNumber}`}
                    className={`rounded-full px-3 py-2 text-sm ${pageNumber === page ? "bg-cyan-400 text-slate-950" : "border border-white/10 text-zinc-300 hover:border-cyan-400/30 hover:text-white"}`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
              {page < totalPages ? (
                <Link href={`/country?country=${country}&page=${page + 1}`} className="rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-300 hover:border-cyan-400/30 hover:text-white">
                  Next
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

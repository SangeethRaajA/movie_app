import { notFound } from "next/navigation";
import { formatVoteAverage, getBackdropUrl, getMediaTitle, getPosterUrl, getSeriesDetails } from "@/lib/tmdb";

type SeriesDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SeriesDetailsPage({ params }: SeriesDetailsPageProps) {
  const { id } = await params;
  const series = await getSeriesDetails(id);

  if (!series) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#11223d_0%,_#020617_60%,_#01020b_100%)] text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900/70 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="relative h-[360px] w-full sm:h-[460px]">
            <img src={getBackdropUrl(series.backdrop_path)} alt={getMediaTitle(series)} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Series Detail</p>
                <h1 className="text-3xl font-semibold text-white sm:text-5xl">{getMediaTitle(series)}</h1>
                <p className="max-w-2xl text-sm leading-7 text-zinc-200 sm:text-base">{series.overview}</p>
                <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">Seasons: {series.number_of_seasons}</span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">Episodes: {series.number_of_episodes}</span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">Rating: {formatVoteAverage(series.vote_average)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/70 p-4">
            <img src={getPosterUrl(series.poster_path)} alt={getMediaTitle(series)} className="w-full rounded-[18px] object-cover" />
          </div>
          <div className="space-y-4 rounded-[24px] border border-white/10 bg-zinc-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Storyline</h2>
            <p className="leading-8 text-zinc-300">{series.overview || "No synopsis available yet."}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">First Air Date</p>
                <p className="mt-2 text-lg text-white">{series.first_air_date || "—"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Popularity</p>
                <p className="mt-2 text-lg text-white">{series.popularity?.toFixed(0) || "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

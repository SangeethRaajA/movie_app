import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0b141e_0%,_#02040a_60%,_#000000_100%)] text-white">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 py-10 text-center sm:px-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Page not found</p>
        <h1 className="text-5xl font-semibold text-white">404</h1>
        <p className="max-w-xl text-base leading-8 text-zinc-400">
          The page you are looking for does not exist. Explore the latest movies, series, genres, and top IMDb picks.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Return Home
          </Link>
          <Link href="/search" className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
            Search Titles
          </Link>
        </div>
      </section>
    </main>
  );
}

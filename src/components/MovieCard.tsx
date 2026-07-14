import Link from "next/link";
import {
  formatVoteAverage,
  getMediaTitle,
  getPosterUrl,
  getReleaseYear,
  type MediaItem,
} from "../lib/tmdb";

type MovieCardProps = {
  item: MediaItem;
  href: string;
  type?: "movie" | "tv";
};

export function MovieCard({ item, href, type = "movie" }: MovieCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/70 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={getPosterUrl(item.poster_path)}
          alt={getMediaTitle(item)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {type === "tv" ? "Series" : "Movie"}
        </span>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{getMediaTitle(item)}</h3>
          <span className="text-sm text-zinc-400">{getReleaseYear(item)}</span>
        </div>
        <p className="text-sm text-zinc-400">
          {item.genres?.slice(0, 2).map((genre) => genre.name).join(" • ") || "Trending now"}
        </p>
        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>{type === "tv" ? "New episodes" : "Now streaming"}</span>
          <span className="font-medium text-cyan-300">★ {formatVoteAverage(item.vote_average)}</span>
        </div>
      </div>
    </Link>
  );
}

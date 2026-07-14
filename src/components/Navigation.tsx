'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useEffect, useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/genres', label: 'Genres' },
  { href: '/country', label: 'Country' },
  { href: '/movies', label: 'Movies' },
  { href: '/series', label: 'TV-Series' },
  { href: '/top-imdb', label: 'Top IMDb' },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('query') ?? '');
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setMenuOpen(false);
      return;
    }

    router.push('/search');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMenuOpen((state) => !state)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-100 transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white mt-1" />
            <span className="block h-0.5 w-5 bg-white mt-1" />
          </button>
          <Link href="/" className="text-lg font-semibold tracking-[0.24em] text-cyan-300 uppercase">
            Cineverse
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-3 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-cyan-400/15 text-cyan-300' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="hidden w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 lg:flex">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
          <button type="submit" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
            Search
          </button>
        </form>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 pb-4 lg:hidden">
          <div className="mt-4 flex flex-col gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm transition ${isActive ? 'bg-cyan-400/15 text-cyan-300' : 'text-zinc-300 hover:bg-white/10 hover:text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
            <button type="submit" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
              Search
            </button>
          </form>
        </div>
      ) : null}
    </header>
  );
}

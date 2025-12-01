"use client";
import useSWR from "swr";
import { Spotlight } from "../ui/spotlight-new";

type Quote = {
  id: number;
  quote: string;
  author: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function QuoteSection() {
  const { data = [] } = useSWR<Quote[]>("/api/quote", fetcher);
  const quote = data[0];

  if (!quote) return null;

  return (
    <div className="relative w-full py-24 md:py-32 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl -z-10 opacity-40" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <Spotlight />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <div className="space-y-8 text-center">
          {/* Quote Icon */}
          <div className="inline-block">
            <svg
              className="w-12 h-12 text-red-600 opacity-60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.45-5-7-5m0 0c-4.12 0-7 2.13-7 5.5M3 21c4.12 0 7-2.13 7-5.5" />
            </svg>
          </div>

          {/* Quote Text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light bg-clip-text text-transparent bg-linear-to-b from-white via-slate-100 to-slate-300 leading-tight tracking-tight max-w-4xl mx-auto">
            "{quote.quote}"
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-linear-to-r from-red-600 to-red-500" />
            <div className="h-1 w-12 bg-linear-to-r from-red-600 to-red-500" />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base md:text-lg text-red-600 font-light uppercase tracking-widest">
              {quote.author}
            </p>
            
          </div>

          {/* Decorative Line */}
          <div className="pt-6">
            <div className="h-px w-20 bg-linear-to-r from-transparent via-red-600 to-transparent mx-auto" />
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px bg-linear-to-r from-transparent via-red-600/30 to-transparent" />
      </div>
    </div>
  );
}
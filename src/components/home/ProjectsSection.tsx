"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  const slides = useMemo(
    () => projects.filter((p) => p.image_url && p.title && p.description),
    [projects]
  );

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
    setIsAutoPlay(false);
  }, [slides.length]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, slides.length]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.changedTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;
    if (distance > 50) next();
    else if (distance < -50) prev();
    setTouchStartX(null);
  };

  if (slides.length === 0) {
    return (
      <section id="projeler" className="py-48 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-light tracking-wider">Projelerimiz</h2>
          <p className="text-slate-400 text-lg">Yakında projeler burada yer alacak.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projeler" className="relative py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-950 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-950 rounded-full blur-3xl -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-6xl lg:text-7xl font-light tracking-wider mb-4 text-white">
            Projelerimiz
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-red-600 to-red-500 mx-auto mb-3" />
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-light">
            İç mimarlık ve tasarım alanında hayata geçirdiğimiz başarılı projeler
          </p>
        </div>

        {/* Main Carousel Container */}
        <div className="relative">
          <div
            className="relative rounded-3xl overflow-hidden bg-neutral-950"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Carousel Track */}
            <div className="flex relative h-[600px] lg:h-[700px]">
              {slides.map((project, idx) => {
                const isActive = idx === current;
                const isPrev = idx === (current - 1 + slides.length) % slides.length;
                const isNext = idx === (current + 1) % slides.length;

                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      zIndex: isActive ? 10 : 0,
                    }}
                  >
                    {/* Image */}
                    <Image
                      src={project.image_url!}
                      alt={project.title}
                      fill
                      priority={isActive}
                      className={`object-cover transition-all duration-1200 ease-out ${
                        isActive ? "scale-100" : "scale-110"
                      }`}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/30 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-neutral-950/50 to-transparent" />

                    {/* Content */} 
                    <div
                      className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 transition-all duration-1000 ease-out"
                      style={{
                        transform: isActive ? "translateY(0)" : "translateY(20px)",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="max-w-2xl">
                        <h3 className="text-5xl lg:text-6xl font-light tracking-tight mb-4 text-white">
                          {project.title}
                        </h3>
                        <div className="w-12 h-1 bg-linear-to-r from-red-600 to-red-500 mb-6" />
                        <p className="text-slate-200 text-lg font-light leading-relaxed max-w-xl">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Light Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute -top-40 -right-40 w-80 h-80 bg-neutral-950 rounded-full blur-3xl" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button
              aria-label="Önceki proje"
              onClick={prev}
              className="group absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-14 h-14 rounded-full bg-neutral-950/10 hover:bg-red-600/30 backdrop-blur-md border border-neutral-950/20 hover:border-red-500/50 transition-all duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              aria-label="Sonraki proje"
              onClick={next}
              className="group absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-14 h-14 rounded-full bg-neutral-950/10 hover:bg-red-600/30 backdrop-blur-md border border-neutral-950/20 hover:border-red-500/50 transition-all duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Proje ${idx + 1}`}
                  onClick={() => {
                    setCurrent(idx);
                    setIsAutoPlay(false);
                  }}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    idx === current
                      ? "w-12 bg-linear-to-r from-red-600 to-red-500"
                      : "w-2 bg-neutral-950 hover:bg-neutral-950/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Side Previews - Desktop Only */}
          <div className="hidden xl:flex absolute inset-0 pointer-events-none">
            {/* Left Preview */}
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-24 h-32 pointer-events-auto">
              <button
                onClick={prev}
                className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={slides[(current - 1 + slides.length) % slides.length].image_url!}
                  alt="Önceki"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            </div>

            {/* Right Preview */}
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-24 h-32 pointer-events-auto">
              <button
                onClick={next}
                className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={slides[(current + 1) % slides.length].image_url!}
                  alt="Sonraki"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
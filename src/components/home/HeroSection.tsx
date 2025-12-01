"use client";
import { useEffect, useState } from "react";
import RotatingTextAny from "@/components/RotatingTextAny";
import TrueFocus from "@/components/TrueFocus";

type HeroContent = {
  id: number;
  title: string;
  hashtags: string[];
  background: string;
};

export default function HeroSection() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        const heroData = data[0];
        // hashtags'i kontrol et ve array'e çevir
        if (heroData && heroData.hashtags) {
          if (typeof heroData.hashtags === 'string') {
            heroData.hashtags = heroData.hashtags
              .split(',')
              .map((s: string) => s.trim())
              .filter((s: string) => s.length > 0);
          } else if (Array.isArray(heroData.hashtags)) {
            // Eğer zaten array ise, her elemanı temizle
            heroData.hashtags = heroData.hashtags
              .map((tag: string) => typeof tag === 'string' ? tag.trim() : String(tag).trim())
              .filter((tag: string) => tag.length > 0);
          }
        } else {
          // hashtags yoksa veya boşsa default değer ata
          heroData.hashtags = ["İç Mimarlık", "Tasarım", "Yaşam Alanları"];
        }
        setHero(heroData);
      })
      .catch((error) => {
        console.error('Veri yüklenirken hata:', error);
        // Hata durumunda default değerler
        setHero({
          id: 1,
          title: "Hoş Geldiniz",
          hashtags: ["İç Mimarlık", "Tasarım", "Yaşam Alanları"],
          background: "/default-bg.jpg"
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section
        id="anasayfa"
        className="relative min-h-screen w-full bg-linear-to-b from-neutral-950 to-neutral-900 flex items-center justify-center"
      >
        <div className="text-white text-xl font-light">Yükleniyor...</div>
      </section>
    );
  }

  if (!hero) {
    return (
      <section
        id="anasayfa"
        className="relative min-h-screen w-full bg-linear-to-b from-neutral-950 to-neutral-900 flex items-center justify-center"
      >
        <div className="text-white text-xl font-light">Veri yüklenemedi</div>
      </section>
    );
  }

  // hashtags kontrolü - boş array veya undefined ise default değerler kullan
  const displayHashtags = hero.hashtags && hero.hashtags.length > 0 
    ? hero.hashtags 
    : ["İç Mimarlık", "Tasarım", "Yaşam Alanları"];

  return (
    <section
      id="anasayfa"
      className={`relative min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden`}
      style={{ backgroundImage: `url(${hero.background})` }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950/80 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800/10 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl -z-10 opacity-40" />

      {/* Animated lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-transparent z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent z-0" />

      <div className="relative z-10 grid min-h-screen place-items-center">
        <div className="max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 text-center text-white space-y-8 md:space-y-10">
          
          {/* Subtitle Accent */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-linear-to-r from-transparent to-red-500" />
            <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest font-light text-red-500 whitespace-nowrap">
              Yaratıcı Tasarım Çözümleri
            </p>
            <div className="h-px w-8 bg-linear-to-l from-transparent to-red-500" />
          </div>

          {/* Main Title with TrueFocus */}
          <div className="space-y-6">
            <TrueFocus 
              sentence={hero.title} 
              blurAmount={5} 
              borderColor="red"
            />
            
            
          </div>

          {/* Rotating Text with Tags */}
          <div className="space-y-6 w-full">
            {displayHashtags && displayHashtags.length > 0 ? (
              <div className="space-y-4 px-2 sm:px-0">
                {/* Responsive Rotating Text Container */}
                <div className="min-h-12 sm:min-h-16 md:min-h-20 lg:min-h-24 xl:min-h-28 flex items-center justify-center overflow-hidden">
                  <RotatingTextAny
                    texts={displayHashtags}
                    mainClassName="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white tracking-tight leading-tight px-2"
                    rotationInterval={3000}
                  />
                </div>
              </div>
            ) : (
              <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-red-500">
                #İçMimarlık
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-8 px-2 sm:px-0">
            <a
              href="#projeler"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-light rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 inline-flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
            >
              Projelerimizi Görün
              <svg
                className="w-4 sm:w-5 h-4 sm:h-5 group-hover:tranneutral-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#iletisim"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-light rounded-lg border border-white/20 hover:border-red-500/50 transition-all duration-300 backdrop-blur-md inline-flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
            >
              İletişime Geçin
              <svg
                className="w-4 sm:w-5 h-4 sm:h-5 group-hover:tranneutral-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -tranneutral-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <p className="text-xs sm:text-sm text-neutral-400 font-light">Aşağı Kaydırın</p>
            <svg
              className="w-4 sm:w-5 h-4 sm:h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
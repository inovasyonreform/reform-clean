"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BackgroundBeams } from "../ui/background-beams";

type AboutContent = {
  id: number;
  title: string;
  description: string;
  image_url: string;
};

export default function AboutSection() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAbout(data[0]));
  }, []);

  useEffect(() => {
    fetch("/api/about-features")
      .then((res) => res.json())
      .then((data) => setFeatures(data.map((f: any) => f.text)));
  }, []);

  if (!about) return null;

  return (
    <section
      id="hakkimizda"
      className="relative bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-24 md:py-32 overflow-hidden"
    >
      <BackgroundBeams />

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-800/10 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl -z-10 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl lg:text-7xl font-light tracking-wider text-white mb-4">
            Hakkımızda
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-red-600 to-red-500 mx-auto mb-6" />
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto font-light">
            Yaratıcı ve yenilikçi tasarım çözümleri sunuyoruz
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Görsel Sol */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <Image
              src={about.image_url}
              alt="Hakkımızda görseli"
              width={800}
              height={600}
              className="relative rounded-2xl w-full h-auto object-cover shadow-2xl group-hover:shadow-2xl transition-all duration-500"
            />
            <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-neutral-950/20 via-transparent to-transparent" />
          </div>

          {/* Metin Sağ */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
                {about.title}
              </h2>
              <div className="w-12 h-1 bg-linear-to-r from-red-600 to-red-500" />
            </div>

            <p className="text-neutral-300 text-lg font-light leading-relaxed max-w-xl">
              {about.description}
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              {features.map((text, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-600/20 group-hover:bg-red-600/40 transition-colors duration-300">
                      <svg
                        className="h-4 w-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-neutral-300 font-light text-base leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <a
                href="#iletisim"
                className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-light rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 group"
              >
                Hayal Ettiğinizi Gerçekleştirelim
                <svg
                  className="w-5 h-5 group-hover:tranneutral-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
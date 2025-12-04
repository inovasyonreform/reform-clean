"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import {
  CubeTransparentIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
  GlobeEuropeAfricaIcon,
  SparklesIcon,
  MegaphoneIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

interface Principle {
  id: number;
  icon: string; // string olarak Supabase'den geliyor
  title: string;
  description: string;
  vurgu: string;
}

export default function ModernMimariTasarim() {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/architecture/principles", {
        cache: "no-store",
      });
      const json = await res.json();
      setPrinciples(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Icon stringini Heroicon componentine map et
  const resolveIcon = (iconName: string) => {
    switch (iconName) {
      case "CubeTransparentIcon":
        return CubeTransparentIcon;
      case "GlobeEuropeAfricaIcon":
        return GlobeEuropeAfricaIcon;
      case "LightBulbIcon":
        return LightBulbIcon;
      case "SparklesIcon":
        return SparklesIcon;
      default:
        return CubeTransparentIcon;
    }
  };

  return (
    <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section
        id="header"
        className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={"/refwhite.png"}
            alt="Reform Mimari Arka Plan"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-transparent z-10" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <MegaphoneIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-white">Geleceğin Mimarisini</span>{" "}
            <span className="text-red-500">Tasarla</span>
          </h1>
          <p className="text-xl font-light text-neutral-300 max-w-3xl mx-auto">
            Biz, sadece binalar inşa etmiyoruz; yenilikçi prensipler, ileri
            teknoloji ve sürdürülebilirlik odaklı modern mimari sanat eserleri
            yaratıyoruz.
          </p>
        </div>
      </section>

      {/* PRENSİPLER */}
      <section id="principles" className="py-24 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Modern Tasarımın <span className="text-red-500">Temel Taşları</span>
          </h2>

          {loading && (
            <p className="text-neutral-400">Prensipler yükleniyor...</p>
          )}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((item) => {
                const IconComponent = resolveIcon(item.icon);
                return (
                  <div
                    key={item.id}
                    className="p-6 bg-neutral-800/70 rounded-xl border border-neutral-700 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-red-500/15"
                  >
                    <IconComponent className={`w-10 h-10 mb-4 ${item.vurgu}`} />
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* TEKNİK YAKLAŞIM */}
      <section id="technical-approach" className="py-24 text-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <WrenchScrewdriverIcon className="w-12 h-12 text-red-500" />
            <h2 className="text-4xl font-extrabold">
              Teknolojiyi <span className="text-neutral-300">Sanatla</span>{" "}
              Buluşturuyoruz
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Proje sürecimizin her aşamasında, en son BIM (Yapı Bilgi
              Modellemesi) araçlarını ve parametrik tasarım yazılımlarını
              kullanırız. Bu, sadece estetik olarak değil, mühendislik ve
              maliyet verimliliği açısından da optimize edilmiş sonuçlar elde
              etmemizi sağlar.
            </p>
            <ul className="space-y-3 text-neutral-300 border-l-4 border-red-500 pl-4 pt-2">
              <li className="flex items-start">
                <CommandLineIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                Yapı Bilgi Modellemesi (BIM)
              </li>
              <li className="flex items-start">
                <CommandLineIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                Parametrik Cephe Tasarımı
              </li>
              <li className="flex items-start">
                <CommandLineIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                Enerji Performansı Simülasyonları
              </li>
            </ul>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-red-950/80">
            <Image
              src={"/refwhite.png"}
              alt="BIM Modelleme"
              fill
              className="transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta-projects" className="py-24 text-white px-6">
        <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50">
          <h3 className="text-3xl font-bold mb-4 text-red-400">
            Modern Tasarım Anlayışımızı Projelerimizde Görün
          </h3>
          <p className="text-lg text-neutral-300 mb-8">
            Mimari prensiplerimizin hayata geçtiği tamamlanmış ve devam eden
            projelere göz atın.
          </p>
          <a
            href="/projeler"
            className="inline-flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
          >
            <ArrowRightIcon className="w-5 h-5" />
            Tüm Projeleri Keşfet
          </a>
        </div>
      </section>
    </main>
  );
}

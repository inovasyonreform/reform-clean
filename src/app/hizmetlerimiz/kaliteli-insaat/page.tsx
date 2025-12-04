"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import {
  ShieldCheckIcon,
  ScaleIcon,
  ClipboardDocumentCheckIcon,
  EyeIcon,
  ArrowRightIcon,
  CodeBracketSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

interface Pillar {
  id: number;
  icon: string; // string olarak Supabase'den geliyor
  title: string;
  description: string;
  vurgu: string;
}

export default function YuksekKaliteliInsaat() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/quality/pillars", { cache: "no-store" });
      const json = await res.json();
      setPillars(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Icon stringini Heroicon componentine map et
  const resolveIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheckIcon":
        return ShieldCheckIcon;
      case "ScaleIcon":
        return ScaleIcon;
      case "ClipboardDocumentCheckIcon":
        return ClipboardDocumentCheckIcon;
      case "EyeIcon":
        return EyeIcon;
      default:
        return ShieldCheckIcon;
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

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <CodeBracketSquareIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-white">Mükemmeliyet</span>{" "}
            <span className="text-red-500"> İnşa Ediyoruz</span>
          </h1>
          <p className="text-xl font-light text-neutral-300 max-w-3xl mx-auto">
            Bizim için inşaat kalitesi bir seçenek değil, bir taahhüttür. En yüksek standartları, sıfır hatayla uyguluyoruz.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="py-24 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Kalite Taahhüdümüzün <span className="text-red-500">Temel İlkeleri</span>
          </h2>

          {loading && <p className="text-neutral-400">İlkeler yükleniyor...</p>}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((item) => {
                const IconComponent = resolveIcon(item.icon);
                return (
                  <div
                    key={item.id}
                    className="p-6 py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 rounded-xl border border-neutral-700 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-red-500/50"
                  >
                    <div className="p-3 bg-red-900/30 rounded-full inline-block mb-4">
                      <IconComponent className={`w-8 h-8 ${item.vurgu}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-neutral-400 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* TEKNİK SÜREÇ VE GARANTİ */}
      <section id="technical-guarantee" className="py-24 text-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-neutral-800/80">
            <Image
              src="/refwhite.png"
              alt="Teknik Çizimler ve Kontrol"
              fill
              className="transition-transform duration-500 hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0" />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold">
              <span className="text-red-500">Ömür Boyu</span> Güvenlik ve Dayanıklılık
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Projelerimizin temelinde sadece en iyi malzemeler değil, aynı zamanda hatasız bir mühendislik vizyonu yatar. İnşaat tamamlandıktan sonra bile, yapılarımızın uzun ömürlü olması için detaylı garanti ve bakım süreçleri sunuyoruz.
            </p>
            <ul className="space-y-3 text-neutral-300 border-l-4 border-neutral-700 pl-4 pt-2">
              <li className="flex items-start font-semibold">
                <CodeBracketSquareIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                Yapısal Garanti: 10 Yıl
              </li>
              <li className="flex items-start font-semibold">
                <CodeBracketSquareIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                Malzeme İade Takibi: Dijital kayıt sistemi
              </li>
              <li className="flex items-start font-semibold">
                <CodeBracketSquareIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                Müşteri Onaylı Teslimat: Her aşama için
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta-contact" className="py-24 text-white px-6">
        <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-red-500 shadow-2xl shadow-red-950/50">
          <h3 className="text-3xl font-bold mb-4">Kalitemiz Hakkında Daha Fazla Bilgi Alın</h3>
          <p className="text-lg text-neutral-200 mb-8">
            Bir sonraki projenizde yüksek kalite standartlarımızla çalışmak için bize ulaşın ve detaylı bilgi alın.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:bg-red-500"
          >
            <PhoneIcon className="w-5 h-5" />
            Hemen İletişime Geç
          </a>
        </div>
      </section>
    </main>
  );
}
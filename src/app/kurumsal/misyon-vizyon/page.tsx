"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  SparklesIcon,
  BookOpenIcon,
  CheckIcon,
  EnvelopeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

interface MissionVisionData {
  id: number;
  mission_text: string;
  mission_points: string[];
  vision_text: string;
  vision_points: string[];
  is_active: boolean;
}

export default function MisyonVizyon() {
  const [data, setData] = useState<MissionVisionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/corporate/mission-vision", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">

      {/* HERO */}
      <section id="focus-header" className="relative pt-40 pb-20 text-white text-center overflow-hidden border-b border-neutral-700">
        <div className="absolute inset-0">
          <Image
            src={"/refwhite.png"}
            alt="Reform Mimari Arka Plan"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-red-500">Vizyoner</span> Hedefler. <span className="text-white">Sağlam</span> Adımlar.
          </h1>
          <p className="text-xl font-light text-neutral-300">
            Mimari mükemmeliyet ve sürdürülebilir gelecek için temel ilkelerimizi keşfedin.
          </p>
        </div>
      </section>

      {/* MİSYON & VİZYON */}
      <section id="mission-vision-cards" className="py-24 text-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Misyon */}
          <div className="p-10 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50">
            <BookOpenIcon className="w-12 h-12 text-red-500 mb-6 border-b-2 border-red-500 pb-2 block" />
            <h2 className="text-3xl font-bold mb-4">🧭 Misyonumuz</h2>
            <p className="text-lg text-neutral-300 leading-relaxed mb-6">
              {data?.mission_text || "Misyon yükleniyor..."}
            </p>
            <ul className="text-neutral-400 space-y-2 text-sm">
              {data?.mission_points?.map((point, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" /> {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Vizyon */}
          <div className="p-10 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50">
            <SparklesIcon className="w-12 h-12 text-neutral-400 mb-6 border-b-2 border-neutral-500 pb-2 block" />
            <h2 className="text-3xl font-bold mb-4">🚀 Vizyonumuz</h2>
            <p className="text-lg text-neutral-300 leading-relaxed mb-6">
              {data?.vision_text || "Vizyon yükleniyor..."}
            </p>
            <ul className="text-neutral-400 space-y-2 text-sm">
              {data?.vision_points?.map((point, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-neutral-400 mt-1 mr-2 shrink-0" /> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta-action" className="py-16 text-white px-6">
        <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50">
          <h3 className="text-3xl font-bold mb-4">
            Vizyonumuzun <span className="text-red-500">Bir Parçası</span> Olun
          </h3>
          <p className="text-lg text-neutral-300 mb-8">
            Mimari mükemmellik ve yenilikçi çözümlerle geleceği birlikte inşa edelim.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
          >
            <EnvelopeIcon className="w-5 h-5" /> Bize Ulaşın
          </a>
        </div>
      </section>
    </main>
  );
}
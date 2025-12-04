"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  SparklesIcon,
  BookOpenIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  LightBulbIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";
import TeamSection from "@/components/home/TeamSection";
import { supabase } from "@/lib/supabase/client";

// --- İKON MAP ---
const ICON_MAP: { [key: string]: React.ElementType } = {
  CheckCircleIcon: CheckCircleIcon,
  LightBulbIcon: LightBulbIcon,
  UserGroupIcon: UserGroupIcon,
  PuzzlePieceIcon: PuzzlePieceIcon,
};

// --- Veri tipleri ---
interface CorporateAboutData {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  story_title: string;
  story_text: string;
  story_highlight: string;
  story_image_url: string;
  mission_text: string;
  vision_text: string;
  values_list: string[];
  cta_heading: string;
}

interface WhyUsFeature {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  color_class: string;
  border_class: string;
}

// --- Varsayılan boş veri ---
const initialData: CorporateAboutData = {
  id: 1,
  hero_title: "İnovasyon. Güven. Gelecek.",
  hero_subtitle:
    "Sıradan yapıları, kalıcı değere sahip ikonik yaşam alanlarına dönüştürüyoruz.",
  story_title: "Başlangıcımızdan Bugüne",
  story_text: "Yükleniyor...",
  story_highlight: "Hikaye özeti yükleniyor...",
  story_image_url: "/refwhite.png",
  mission_text: "Yükleniyor...",
  vision_text: "Yükleniyor...",
  values_list: ["Yükleniyor..."],
  cta_heading: "Vizyonunuzu Gerçeğe Dönüştürelim",
};

export default function AboutUs() {
  const [aboutData, setAboutData] = useState<CorporateAboutData>(initialData);
  const [whyUsFeatures, setWhyUsFeatures] = useState<WhyUsFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWhyUsLoading, setIsWhyUsLoading] = useState(true);

  // --- Corporate About verisi çek ---
  const fetchAboutData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/corporate/about", {
        method: "GET",
        cache: "no-store", // cache kapalı
      });
      const result = await response.json();

      if (response.ok && result) {
        const cleanedData: CorporateAboutData = {
          ...result,
          values_list: Array.isArray(result.values_list)
            ? result.values_list
            : [],
          story_image_url:
            result.story_image_url || initialData.story_image_url,
          story_highlight:
            result.story_highlight || initialData.story_highlight,
        };

        setAboutData(cleanedData);
      }
    } catch (error) {
      console.error("Hakkımızda verisi çekilemedi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Why Us verisi çek ---
  const fetchWhyUsData = async () => {
  setIsWhyUsLoading(true);
  try {
    const { data, error } = await supabase
      .from("corporate_why_us")
      .select("*")
      .eq("is_active", true) // sadece aktif olanlar
      .order("order_index", { ascending: true });

    if (!error) setWhyUsFeatures(data ?? []);
  } catch (error) {
    console.error("Neden Biz verisi çekilemedi:", error);
  } finally {
    setIsWhyUsLoading(false);
  }
};

  useEffect(() => {
    fetchAboutData();
    fetchWhyUsData();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Başlık parçalama
  // Hero başlık parçalama
  const titleParts = (aboutData?.hero_title ?? "")
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const part1 = titleParts[0] || "İnovasyon";
  const part2 = titleParts[1] || "Güven";
  const part3 = titleParts[2] || "Gelecek";

  // Story başlık parçalama
  const storyTitle = aboutData?.story_title ?? "";
  const storyWords = storyTitle.split(" ");
  const firstWord = storyWords[0] || "Başlangıcımızdan";
  const restWords = storyWords.slice(1).join(" ") || "Bugüne";

  // --- RENDER ---
  return (
    <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section
        id="about-hero"
        className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0">
          <Image
            src={"/refwhite.png"}
            alt="Reform Mimari Arka Plan"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-20 max-w-4xl px-6 text-white pt-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-red-500">{part1}.</span>{" "}
            <span className="text-red-400">{part2}.</span> {part3}.
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-300">
            {aboutData.hero_subtitle}
          </p>
          <button
            onClick={() => scrollTo("our-story")}
            className="mt-8 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg shadow-red-600/30 hover:bg-red-500 transition duration-300 transform hover:scale-105"
          >
            Hikayemizi Keşfet
          </button>
        </div>
      </section>

      {/* STORY */}
      <section id="our-story" className="py-24 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 text-center">
            {firstWord} <span className="text-red-500">{restWords}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              {aboutData.story_image_url && (
                <Image
                  src={aboutData.story_image_url}
                  alt="Ekip Planları İnceliyor"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>
            <div className="space-y-6">
              <p className="text-lg text-neutral-300 leading-relaxed">
                {aboutData.story_text}
              </p>
              <p className="text-lg text-neutral-300 leading-relaxed border-l-4 border-red-500 pl-4 italic bg-neutral-800 p-3 rounded-r-lg">
                {aboutData.story_highlight}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="core-principles" className="py-24 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Kurumsal <span className="text-red-400">Prensiplerimiz</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Misyon */}
            <div className="p-8 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50">
              <BookOpenIcon className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Misyonumuz</h3>
              <p className="text-neutral-400">{aboutData.mission_text}</p>
            </div>
            {/* Vizyon */}
            <div className="p-8 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50">
              <SparklesIcon className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Vizyonumuz</h3>
              <p className="text-neutral-400">{aboutData.vision_text}</p>
            </div>
            {/* Değerler */}
            <div className="p-8 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50">
              <BuildingOfficeIcon className="w-10 h-10 text-red-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Değerlerimiz</h3>
              <ul className="text-neutral-400 list-disc pl-5 space-y-1">
                {aboutData.values_list.map((value, index) => (
                  <li key={index}>{value}</li>
                ))}
                {aboutData.values_list.length === 0 && isLoading && (
                  <li>Yükleniyor...</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-24 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            Neden <span className="text-red-500">REFORM'u</span> Tercih
            Etmelisiniz?
          </h2>

          {isWhyUsLoading && (
            <div className="text-center text-neutral-400">
              Özellikler Yükleniyor...
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {whyUsFeatures.map((feature) => {
              const Icon = ICON_MAP[feature.icon_name] || CheckCircleIcon;
              return (
                <div
                  key={feature.id}
                  className={`flex items-start gap-4 p-6 rounded-xl bg-neutral-900 border-l-4 ${feature.border_class} transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/50`}
                >
                  <div className="mt-1 shrink-0">
                    <Icon className={`w-8 h-8 ${feature.color_class}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-neutral-100">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-400 text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <TeamSection />

      {/* CTA */}
      <section id="contact-cta" className="py-24 text-white px-6">
        <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50">
          <h3 className="text-3xl font-bold mb-4 text-red-400">
            {aboutData.cta_heading}
          </h3>
          <p className="text-lg text-neutral-300 mb-8">
            Proje fikirlerinizi bizimle paylaşın ve mükemmeliyeti birlikte inşa
            etmeye başlayalım.
          </p>
          <a
            href="#iletisim"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
          >
            <EnvelopeIcon className="w-5 h-5" />
            Ücretsiz Danışmanlık Alın
          </a>
        </div>
      </section>
    </main>
  );
}

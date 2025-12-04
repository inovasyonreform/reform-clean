"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

interface ContactInfo {
  id: number;
  icon: string;
  title: string;
  details: string[];
  link_prefix?: string;
  map_link?: string;
}

const ContactForm = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-neutral-900 rounded-xl shadow-2xl shadow-black/50 border border-red-900/50"
    >
      <h3 className="text-3xl font-extrabold mb-6 text-white border-l-4 border-red-500 pl-4">
        Bize Doğrudan Ulaşın
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <input type="text" placeholder="Adınız Soyadınız *" required className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg" />
        <input type="email" placeholder="E-Posta Adresiniz *" required className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg" />
      </div>
      <input type="text" placeholder="Konu Başlığı" className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg mb-6" />
      <textarea placeholder="Mesajınız..." rows={6} required className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg mb-8 resize-none" />
      <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center gap-3 w-full px-8 py-3 bg-red-600 text-white font-bold rounded-lg">
        {status === "submitting" ? "Gönderiliyor..." : <>Gönder <PaperAirplaneIcon className="w-5 h-5" /></>}
      </button>
      {status === "success" && <p className="mt-4 text-center text-red-400 font-semibold">Mesajınız başarıyla iletildi.</p>}
    </form>
  );
};

export default function IletisimSayfasi() {
  const [infos, setInfos] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfos = async () => {
      const res = await fetch("/api/contact/info", { cache: "no-store" });
      const json = await res.json();
      setInfos(json);
      setLoading(false);
    };
    fetchInfos();
  }, []);

  const resolveIcon = (iconName: string) => {
    switch (iconName) {
      case "BuildingOffice2Icon": return BuildingOffice2Icon;
      case "PhoneIcon": return PhoneIcon;
      case "EnvelopeIcon": return EnvelopeIcon;
      default: return PhoneIcon;
    }
  };

  return (
    <main className="bg-neutral-950 min-h-screen text-white">
      <Navbar />

      {/* HERO */}
      <section id="header" className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden border-b border-neutral-700">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <PhoneIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-white">İletişime</span>{" "}
            <span className="text-red-500">Geçin</span>
          </h1>
          <p className="text-xl font-light text-neutral-300">Projeniz ne olursa olsun, bize ulaşın.</p>
        </div>
        <div className="absolute inset-0">
          <Image src={"/refwhite.png"} alt="Reform Mimari Arka Plan" fill className="object-cover opacity-20" priority />
        </div>
      </section>

      {/* İLETİŞİM FORMU + BİLGİLER */}
      <section id="contact-content" className="py-24 text-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1 space-y-8 p-6 bg-neutral-900 rounded-xl border border-neutral-700">
            <h3 className="text-2xl font-bold text-red-500 mb-6">Doğrudan Bilgiler</h3>
            {loading ? <p className="text-neutral-400">Bilgiler yükleniyor...</p> : infos.map((item) => {
              const InfoIcon = resolveIcon(item.icon);
              return (
                <div key={item.id} className="space-y-2 pb-4 border-b border-neutral-800 last:border-b-0">
                  <div className="flex items-center text-white">
                    <InfoIcon className="w-6 h-6 text-red-500 mr-3 shrink-0" />
                    <span className="text-xl font-bold">{item.title}</span>
                  </div>
                  <ul className="text-neutral-400 pl-9 space-y-1">
                    {item.details.map((detail, dIndex) => (
                      <li key={dIndex}>
                        <a
                          href={item.link_prefix ? `${item.link_prefix}${detail.replace(/\s/g, "")}` : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-red-400 transition-colors"
                        >
                          {detail}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HARİTA + SOSYAL */}
      <section id="map-social" className="py-24 text-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Harita */}
          <div className="relative h-72 rounded-xl overflow-hidden shadow-xl border border-neutral-700">
            <Image
              src={"/images/istanbul-office-map-placeholder.jpg"}
              alt="Genel Merkez Konumu Haritası"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
              {infos.length > 0 && infos[0].map_link && (
                <a
                  href={infos[0].map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 shadow-lg"
                >
                  <MapPinIcon className="w-5 h-5" /> Haritada Gör
                </a>
              )}
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="p-6 bg-neutral-950 rounded-xl space-y-6 flex flex-col justify-center">
            <GlobeAltIcon className="w-12 h-12 text-red-500" />
            <h4 className="text-3xl font-bold text-white">Bizi Sosyal Medyada Takip Edin</h4>
            <p className="text-neutral-400">
              En son proje güncellemelerimiz, sektörel haberler ve mimari trendler için bizi sosyal medya ağlarımızdan takip edin.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" className="p-3 bg-neutral-800 rounded-full text-red-500 hover:bg-neutral-700 transition">
                LinkedIn
              </a>
              <a href="https://instagram.com" className="p-3 bg-neutral-800 rounded-full text-red-500 hover:bg-neutral-700 transition">
                Instagram
              </a>
              <a href="https://twitter.com" className="p-3 bg-neutral-800 rounded-full text-red-500 hover:bg-neutral-700 transition">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
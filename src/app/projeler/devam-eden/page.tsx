"use client";
import React from "react";
import Image from "next/image";
import {
    MapPinIcon,
    CalendarIcon,
    CheckBadgeIcon,
    ArrowRightIcon,
    WrenchScrewdriverIcon,
    BoltIcon // Enerji ve moderniteyi temsil eden yeni ikon
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

// DEVAM EDEN PROJELER VERİ YAPISI
const ONGOING_PROJECTS = [
    {
        id: 1,
        title: "Kozmos Kuleleri (Faz II)",
        location: "İstanbul, Ataşehir",
        status: "İnşaat Hızı: %75",
        completion: "Tahmini Tamamlanma: Q4 2026",
        description: "Bölgenin en yüksek ve en yeşil ofis kuleleri projesi. Akıllı bina teknolojileri ve LEED Gold sertifikası hedefleniyor.",
        imageSrc: "/refwhite.png", // Kendi görsel yolunuzu ekleyin
        vurguColor: "text-red-500",
        tag: "Yüksek Katlı / Ticari"
    },
    {
        id: 2,
        title: "Marina Yaşam Konutları",
        location: "İzmir, Urla",
        status: "İnşaat Hızı: %40",
        completion: "Tahmini Tamamlanma: Q2 2027",
        description: "Denize sıfır, düşük yoğunluklu lüks konut projesi. Sürdürülebilir ahşap yapı elemanları kullanılıyor.",
        imageSrc: "/refwhite.png",
        vurguColor: "text-neutral-400",
        tag: "Lüks Konut / Sürdürülebilir"
    },
    {
        id: 3,
        title: "Teknopark AR-GE Merkezi",
        location: "Ankara, ODTÜ",
        status: "İnşaat Hızı: %90",
        completion: "Tahmini Tamamlanma: Q1 2026",
        description: "Yapay zeka ve robotik çalışmalarına ev sahipliği yapacak modern ve esnek çalışma alanları.",
        imageSrc: "/refwhite.png",
        vurguColor: "text-red-500",
        tag: "Kurumsal / Teknoloji"
    }
];

export default function DevamEdenProjeler() {
    
    return (
       <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
             <Navbar />
            {/* 1. GİRİŞ VE BAŞLIK BÖLÜMÜ (HERO) */}
            <section 
                id="header" 
                className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden border-b border-neutral-700"
            >
                {/* Arka Plan Görseli (Devam Eden bir inşaat sitesi ya da mimari çizim) */}
                <div className="absolute inset-0">
                          {/* GÖRSEL: Mimari blueprint görseli
                                      AMAÇ: Kırmızı ve nötr tonlarla uyumlu mimari estetik sağlamak.
                                    */}
                          <Image
                            // Varsayılan olarak Next.js'e ait placeholder kullanıldı.
                            // Bunu kendi görsel yolunuzla değiştirmelisiniz: pl "/images/architectural-hero.jpg"
                            src={"/refwhite.png"}
                            alt="Reform Mimari Arka Plan"
                            layout="fill"
                            objectFit="cover"
                            className="opacity-20" // Görsel opaklığı düşürülerek neutral-950 arka plana entegre edildi
                            priority
                          />
                          {/* KOYU KAPLAMA (OVERLAY): bg-black/70 (neutral-950 tonlarına yakınlık için) */}
                          <div className="absolute inset-0 bg-transparent z-10" />
                        </div>

                {/* İçerik */}
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <WrenchScrewdriverIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-white">İnşa Edilen</span> <span className="text-red-500">Gelecek</span>
                    </h1>
                    <p className="text-xl font-light text-neutral-300">
                        Halen devam eden, yenilikçi ve yüksek standartlı projelerimizle sektöre yön vermeye devam ediyoruz.
                    </p>
                </div>
            </section>

            {/* 2. PROJE LİSTESİ */}
            <section id="project-list" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto space-y-16">

                    {ONGOING_PROJECTS.map((project, index) => (
                        <div 
                            key={project.id} 
                            // Çift/Tek projelere göre hafif renk değişimi (Teal yerine neutral-800/red-500)
                            className={`p-8 rounded-xl shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-8 
                                ${index % 2 === 0 
                                    ? 'py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 border border-red-800/50 hover:shadow-red-500/20' 
                                    : 'py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 border-neutral-700 hover:shadow-neutral-500/20'
                                }`}
                        >
                            {/* Proje Görseli */}
                            <div className="md:w-1/3 relative h-64 md:h-auto shrink-0">
                                {/*  */}
                                <Image
                                    src={project.imageSrc} 
                                    alt={project.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg transition-transform duration-500 hover:scale-[1.03]"
                                />
                                <span className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-xs font-bold rounded-full">
                                    {project.tag}
                                </span>
                            </div>

                            {/* Proje Detayları */}
                            <div className="md:w-2/3 space-y-4">
                                <h2 className="text-3xl font-bold mb-2">
                                    <span className={project.vurguColor}>{project.title}</span>
                                </h2>
                                
                                <p className="text-lg text-neutral-400 border-l-4 border-red-500 pl-4 py-1">
                                    {project.description}
                                </p>
                                
                                <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-700/50">
                                    {/* Durum */}
                                    <div className="flex items-center text-sm">
                                        <BoltIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                                        <span className="font-semibold text-neutral-300 mr-1">Durum:</span> 
                                        <span className="text-neutral-400">{project.status}</span>
                                    </div>
                                    
                                    {/* Tamamlanma */}
                                    <div className="flex items-center text-sm">
                                        <CalendarIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                                        <span className="font-semibold text-neutral-300 mr-1">Bitiş:</span> 
                                        <span className="text-neutral-400">{project.completion}</span>
                                    </div>
                                    
                                    {/* Konum */}
                                    <div className="flex items-center text-sm sm:col-span-2">
                                        <MapPinIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                                        <span className="font-semibold text-neutral-300 mr-1">Konum:</span> 
                                        <span className="text-neutral-400">{project.location}</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <a 
                                        href={`/projeler/${project.id}`}
                                        className="inline-flex items-center gap-2 px-6 py-2 border border-red-600 text-red-500 font-semibold rounded-lg hover:bg-red-900/40 transition duration-300"
                                    >
                                        Proje Detaylarını Gör
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </section>

            {/* 3. TÜM PROJELERE YÖNLENDİRME (CTA) */}
            <section id="cta-all-projects" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4 text-white">
                        Tamamlanan <span className="text-red-500">Başarı Hikayelerimizi</span> Keşfedin
                    </h3>
                    <p className="text-lg text-neutral-400 mb-8">
                        Başarıyla tamamladığımız yüzlerce projeyi inceleyerek kalitemiz hakkında daha fazla bilgi edinin.
                    </p>
                    <a 
                        href="/projeler/tamamlanan"
                        className="inline-flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
                    >
                        <CheckBadgeIcon className="w-5 h-5" />
                        Tamamlanan Projeler
                    </a>
                </div>
            </section>
        </main>
    );
}
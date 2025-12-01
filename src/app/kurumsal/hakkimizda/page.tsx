// app/hakkimizda/page.tsx
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
    // Kullanılacak ikonların map'te tanımlanması için
    // Bu map'i fonksiyon dışında tanımlayalım
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";
import TeamSection from "@/components/home/TeamSection";

// --- YARDIMCI İKON MAP'İ ---
// İkon isimlerini string'den gerçek bileşenlere çevirmek için gereklidir.
const ICON_MAP: { [key: string]: React.ElementType } = {
    CheckCircleIcon: CheckCircleIcon,
    LightBulbIcon: LightBulbIcon,
    UserGroupIcon: UserGroupIcon,
    PuzzlePieceIcon: PuzzlePieceIcon,
    // Gelecekte eklenecek ikonlar buraya eklenecek
};
// ----------------------------

// CorporateAboutEditor'dan gelen ana veri yapısı (Aynı kaldı)
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

// Neden Biz özelliğinin veri yapısı (YENİ)
interface WhyUsFeature {
    id: number;
    title: string;
    description: string;
    icon_name: string; // string olarak veritabanında tutulacak
    color_class: string; 
    border_class: string; 
}

// Varsayılan boş veri (Aynı kaldı)
const initialData: CorporateAboutData = {
    id: 1, 
    hero_title: 'İnovasyon. Güven. Gelecek.',
    hero_subtitle: 'Sıradan yapıları, kalıcı değere sahip ikonik yaşam alanlarına dönüştürüyoruz.',
    story_title: 'Başlangıcımızdan Bugüne',
    story_text: 'Yükleniyor...',
    story_highlight: 'Hikaye özeti yükleniyor...',
    story_image_url: '/refwhite.png', 
    mission_text: 'Yükleniyor...',
    vision_text: 'Yükleniyor...',
    values_list: ['Yükleniyor...'],
    cta_heading: 'Vizyonunuzu Gerçeğe Dönüştürelim',
};

// Statik WHY_US_FEATURES kaldırıldı. Artık dinamik çekeceğiz.

export default function AboutUs() {
    const [aboutData, setAboutData] = useState<CorporateAboutData>(initialData);
    const [whyUsFeatures, setWhyUsFeatures] = useState<WhyUsFeature[]>([]); // YENİ STATE
    const [isLoading, setIsLoading] = useState(true);
    const [isWhyUsLoading, setIsWhyUsLoading] = useState(true); // YENİ LOADING STATE

    // --- 1. Corporate About Veri Çekme Fonksiyonu (Aynı kaldı) ---
    const fetchAboutData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/corporate/about', { 
                method: 'GET',
            });
            const result = await response.json();

            if (response.ok && result.id) {
                const cleanedData: CorporateAboutData = {
                    ...result,
                    values_list: Array.isArray(result.values_list) ? result.values_list : [],
                    story_image_url: result.story_image_url || initialData.story_image_url,
                    story_highlight: result.story_highlight || initialData.story_highlight,
                };
                setAboutData(cleanedData);
            }
        } catch (error) {
            console.error("Hakkımızda Verisi Çekilemedi:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- 2. Neden Bizi Tercih Etmelisiniz Verisi Çekme Fonksiyonu (YENİ) ---
    const fetchWhyUsData = async () => {
        setIsWhyUsLoading(true);
        try {
            // NOT: /api/corporate/why-us endpoint'ini oluşturmanız gerekecektir.
            const response = await fetch('/api/corporate/why-us', {
                method: 'GET',
            });
            const result = await response.json();
            
            if (response.ok && Array.isArray(result)) {
                setWhyUsFeatures(result);
            }
        } catch (error) {
            console.error("Neden Biz Verisi Çekilemedi:", error);
        } finally {
            setIsWhyUsLoading(false);
        }
    }

    useEffect(() => {
        fetchAboutData();
        fetchWhyUsData(); // YENİ VERİ ÇEKME İŞLEMİ
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Dinamik Başlık Parçalarını Ayırma
    const titleParts = aboutData.hero_title.split('.').map(s => s.trim()).filter(s => s.length > 0);
    const part1 = titleParts[0] || 'İnovasyon';
    const part2 = titleParts[1] || 'Güven';
    const part3 = titleParts[2] || 'Gelecek';

    // RENDER KISMI
    return (
        <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
            <Navbar />
            
            {/* 1. GİRİŞ VE BAŞLIK BÖLÜMÜ (HERO) - (Aynı kaldı) */}
            <section
                id="about-hero"
                className="relative h-[60vh] md:h-[75vh] flex items-center justify-center text-center overflow-hidden pt-20"
            >
                <div className="absolute inset-0">
                    <Image
                        src={"/refwhite.png"} 
                        alt="Reform Mimari Arka Plan"
                        layout="fill"
                        objectFit="cover"
                        className="opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-transparent z-10" />
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

            {/* 2. HİKAYEMİZ VE TARİHÇE (Aynı kaldı) */}
            <section
                id="our-story"
                className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6"
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold mb-12 text-center">
                        {aboutData.story_title.split(' ')[0]} <span className="text-red-500">{aboutData.story_title.split(' ').slice(1).join(' ')}</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                            {aboutData.story_image_url && (
                                <Image
                                    src={aboutData.story_image_url} 
                                    alt="Ekip Planları İnceliyor"
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 " />
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

            {/* 3. MİSYON, VİZYON VE DEĞERLERİMİZ (Aynı kaldı) */}
            <section
                id="core-principles"
                className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6"
            >
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16">
                        Kurumsal <span className="text-red-400">Prensiplerimiz</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Misyon Kartı */}
                        <div id="misyon-vizyon" className="p-8 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50 transition-all duration-300 hover:shadow-red-500/20 hover:scale-[1.02]">
                            <BookOpenIcon className="w-10 h-10 text-red-500 mb-4" />
                            <h3 className="text-2xl font-semibold mb-3">Misyonumuz</h3>
                            <p className="text-neutral-400">
                                {aboutData.mission_text}
                            </p>
                            <a href="/misyon-vizyon" className="mt-4 inline-block text-red-400 hover:text-red-500 text-sm font-medium border-b border-red-400 transition">
                                Daha Fazla Oku
                            </a>
                        </div>

                        {/* Vizyon Kartı */}
                        <div id="misyon-vizyon" className="p-8 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50 transition-all duration-300 hover:shadow-red-500/20 hover:scale-[1.02]">
                            <SparklesIcon className="w-10 h-10 text-red-400 mb-4" />
                            <h3 className="text-2xl font-semibold mb-3">Vizyonumuz</h3>
                            <p className="text-neutral-400">
                                {aboutData.vision_text}
                            </p>
                            <a href="/misyon-vizyon" className="mt-4 inline-block text-red-400 hover:text-red-500 text-sm font-medium border-b border-red-400 transition">
                                Daha Fazla Oku
                            </a>
                        </div>

                        {/* Değerler Kartı */}
                        <div id="degerlerimiz" className="p-8 border border-neutral-700 rounded-xl shadow-lg bg-neutral-900/50 transition-all duration-300 hover:shadow-red-500/20 hover:scale-[1.02]">
                            <BuildingOfficeIcon className="w-10 h-10 text-red-400 mb-4" />
                            <h3 className="text-2xl font-semibold mb-3">Değerlerimiz</h3>
                            <ul className="text-neutral-400 list-disc pl-5 space-y-1">
                                {aboutData.values_list.map((value, index) => (
                                    <li key={index}>{value}</li> 
                                ))}
                                {aboutData.values_list.length === 0 && isLoading && <li>Yükleniyor...</li>}
                            </ul>
                            <a href="/degerlerimiz" className="mt-4 inline-block text-red-400 hover:text-red-500 text-sm font-medium border-b border-red-400 transition">
                                Detaylı İncele
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. NEDEN BİZİ SEÇMELİSİNİZ? (DİNAMİKLEŞTİRİLDİ) */}
            <section id="why-us" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-12">
                        Neden <span className="text-red-500">REFORM'u</span> Tercih Etmelisiniz?
                    </h2>
                    
                    {/* Yüklenme Durumu */}
                    {isWhyUsLoading && (
                         <div className="text-center text-neutral-400">Özellikler Yükleniyor...</div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* DİNAMİK RENDER: whyUsFeatures */}
                        {whyUsFeatures.map((feature) => {
                            // İKON ADINI KULLANARAK BİLEŞENİ ÇEK
                            const Icon = ICON_MAP[feature.icon_name] || CheckCircleIcon; // Bulunamazsa varsayılan ikon

                            return (
                                <div key={feature.id} className={`flex items-start gap-4 p-6 rounded-xl bg-neutral-900 border-l-4 ${feature.border_class} transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/50`}>
                                    <div className="mt-1 shrink-0">
                                        <Icon className={`w-8 h-8 ${feature.color_class}`} /> {/* DİNAMİK İKON VE RENK */}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 text-neutral-100">
                                            {feature.title} {/* DİNAMİK BAŞLIK */}
                                        </h3>
                                        <p className="text-neutral-400 text-base">
                                            {feature.description} {/* DİNAMİK AÇIKLAMA */}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <TeamSection />

            {/* 5. SON ÇAĞRIYA HAREKETE GEÇİREN BÖLÜM (CTA) - (Aynı kaldı) */}
            <section id="contact-cta" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50">
                    <h3 className="text-3xl font-bold mb-4 text-red-400">
                        {aboutData.cta_heading}
                    </h3>
                    <p className="text-lg text-neutral-300 mb-8">
                        Proje fikirlerinizi bizimle paylaşın ve mükemmeliyeti birlikte inşa etmeye başlayalım.
                    </p>
                    <a
                        href="#iletisim"
                        className="inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-red-600 to-red-500 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
                    >
                        <EnvelopeIcon className="w-5 h-5" />
                        Ücretsiz Danışmanlık Alın
                    </a>
                </div>
            </section>
        </main>
    );
}
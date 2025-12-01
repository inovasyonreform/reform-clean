"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    PencilSquareIcon, // Yazı İkonu
    CalendarIcon,
    TagIcon,
    ArrowRightIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

// BLOG VERİ YAPISI
const ALL_POSTS = [
    {
        id: 1,
        title: "Modern Mimari Trendleri: 2025'te Bizi Neler Bekliyor?",
        summary: "Sürdürülebilirlik ve yapay zeka entegrasyonu, geleceğin mimari tasarımını nasıl şekillendiriyor?",
        date: "24 Ekim 2025",
        category: "Mimari Tasarım",
        imageSrc: "/refwhite.png",
        readTime: "8 dk okuma"
    },
    {
        id: 2,
        title: "İnşaat Kalitesinde Sıfır Hata Protokolleri",
        summary: "Yüksek kaliteli inşaat projelerimizde uyguladığımız titiz denetim ve malzeme seçim süreçleri.",
        date: "15 Eylül 2025",
        category: "İnşaat Teknolojisi",
        imageSrc: "/refwhite.png",
        readTime: "6 dk okuma"
    },
    {
        id: 3,
        title: "Kırmızı Tuğla Geri Dönüşümü: Çevreye Etkisi",
        summary: "Atık yönetiminde yenilikçi yaklaşımlarımız ve döngüsel ekonomi prensiplerini inşaat sektörüne uygulamamız.",
        date: "01 Eylül 2025",
        category: "Sürdürülebilirlik",
        imageSrc: "/refwhite.png",
        readTime: "5 dk okuma"
    },
    {
        id: 4,
        title: "Akıllı Ev Sistemleri: Konfor ve Verimlilik",
        summary: "Binalarımızda kullanılan en yeni akıllı otomasyon sistemleri ve enerji tasarrufuna katkıları.",
        date: "10 Ağustos 2025",
        category: "İnşaat Teknolojisi",
        imageSrc: "/refwhite.png",
        readTime: "7 dk okuma"
    }
];

// KATEGORİ LİSTESİ
const CATEGORIES = ["Tümü", "Mimari Tasarım", "İnşaat Teknolojisi", "Sürdürülebilirlik"];


export default function BlogSayfasi() {
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = ALL_POSTS.filter(post => {
        const categoryMatch = selectedCategory === "Tümü" || post.category === selectedCategory;
        const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.summary.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        
        <main className="bg-neutral-950 min-h-screen text-white">
<Navbar />
            {/* 1. GİRİŞ VE BAŞLIK BÖLÜMÜ (HERO) */}
            <section 
                id="header" 
                className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden "
            >
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <PencilSquareIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-white">İnşaat Sektörüne</span> <span className="text-red-500">Işık Tutuyoruz</span>
                    </h1>
                    <p className="text-xl font-light text-neutral-300">
                        Modern mimariden sürdürülebilirliğe, en güncel trendler ve teknik analizler.
                    </p>
                </div>
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
            </section>

            {/* 2. FİLTRELEME VE ARAMA BÖLÜMÜ */}
            <section id="filters" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
                    
                    {/* Arama Kutusu */}
                    <div className="md:col-span-2 relative">
                        <input
                            type="text"
                            placeholder="Makale başlıklarında veya özetlerde ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3 pl-12 pr-4 bg-neutral-800 border border-neutral-700 text-white rounded-lg placeholder-neutral-500 focus:ring-red-500 focus:border-red-500 transition duration-200"
                        />
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    </div>

                    {/* Kategori Seçimi (Dropdown) */}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="appearance-none w-full py-3 px-4 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-200 cursor-pointer"
                        >
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                    </div>

                </div>
            </section>

            {/* 3. İÇERİK LİSTESİ */}
            <section id="posts" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <div 
                                key={post.id} 
                                className="bg-neutral-900 rounded-xl shadow-lg border border-neutral-800 overflow-hidden transition-all duration-300 hover:shadow-red-500/10 hover:border-red-800/50 group"
                            >
                                {/* Görsel */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.imageSrc} 
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-500 group-hover:scale-[1.05]"
                                    />
                                </div>

                                {/* İçerik */}
                                <div className="p-6 space-y-4">
                                    {/* Meta Bilgiler */}
                                    <div className="flex items-center text-sm text-neutral-500 space-x-4">
                                        <span className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 text-red-500 mr-1" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center">
                                            <TagIcon className="w-4 h-4 text-red-500 mr-1" />
                                            {post.category}
                                        </span>
                                        <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-800 rounded-full text-neutral-400">
                                            {post.readTime}
                                        </span>
                                    </div>
                                    
                                    {/* Başlık ve Özet */}
                                    <h2 className="text-2xl font-bold text-white leading-tight group-hover:text-red-400 transition duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-neutral-400 text-base line-clamp-3">
                                        {post.summary}
                                    </p>

                                    {/* Detay Butonu */}
                                    <a 
                                        href={`/blog/${post.id}`}
                                        className="inline-flex items-center gap-2 pt-2 text-red-500 font-semibold group-hover:text-red-400 transition duration-300"
                                    >
                                        Makalenin Tamamını Oku
                                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition duration-300" />
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="md:col-span-3 text-center py-16">
                            <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-neutral-600 mb-4" />
                            <p className="text-xl text-neutral-400">Aradığınız kriterlere uygun makale bulunamadı.</p>
                            <p className="text-neutral-500">Lütfen filtreleri veya arama terimini değiştirin.</p>
                        </div>
                    )}

                </div>
            </section>

            {/* 4. TÜM İÇERİKLERİ GÖSTER CTA (Sayfalama yerine basitleştirilmiş bir son) */}
            <section id="cta-archive" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <a 
                    href="/blog/arsiv"
                    className="inline-flex items-center gap-3 px-8 py-3 bg-neutral-700 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-black/50 transform hover:-translate-y-1 hover:bg-neutral-600"
                >
                    <CalendarIcon className="w-5 h-5" />
                    Tüm Arşivi Görüntüle
                </a>
            </section>
        </main>
    );
}
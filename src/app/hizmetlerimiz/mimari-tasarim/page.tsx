"use client";
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
    CommandLineIcon
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

// MODERN MİMARİ PRENSİPLERİ
const ARCHITECTURE_PRINCIPLES = [
    {
        icon: CubeTransparentIcon,
        title: "Fonksiyonellik ve Minimalizm",
        description: "Formun işlevi takip etmesini esas alarak, gereksiz süslemelerden kaçınır, temiz çizgiler ve açık alanlar yaratırız.",
        vurgu: "text-red-500"
    },
    {
        icon: GlobeEuropeAfricaIcon,
        title: "Sürdürülebilirlik ve Eko-Bilinci",
        description: "Enerji verimliliği, yerel malzemeler ve doğal ışık kullanımıyla çevreye saygılı, uzun ömürlü yapılar tasarlarız.",
        vurgu: "text-neutral-400"
    },
    {
        icon: LightBulbIcon,
        title: "Akıllı Teknoloji Entegrasyonu",
        description: "Bina otomasyonu, akıllı sistemler ve dijital çözümleri mimariye entegre ederek kullanıcı deneyimini optimize ederiz.",
        vurgu: "text-red-500"
    },
    {
        icon: SparklesIcon,
        title: "Mekanik ve Estetik Dengesi",
        description: "Yapısal elemanların (beton, çelik) estetik bir unsur olarak kullanılmasını sağlayarak, ham ve dürüst bir tasarım dili oluştururuz.",
        vurgu: "text-neutral-400"
    },
];

export default function ModernMimariTasarim() {
    
    return (
       <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
             <Navbar />
            {/* 1. GİRİŞ VE BAŞLIK BÖLÜMÜ (HERO) */}
            <section 
                id="header" 
                className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden"
            >
                {/* Arka Plan Görseli */}
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
                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <MegaphoneIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-white">Geleceğin Mimarisini</span> <span className="text-red-500">Tasarla</span>
                    </h1>
                    <p className="text-xl font-light text-neutral-300 max-w-3xl mx-auto">
                        Biz, sadece binalar inşa etmiyoruz; yenilikçi prensipler, ileri teknoloji ve sürdürülebilirlik odaklı modern mimari sanat eserleri yaratıyoruz.
                    </p>
                </div>
            </section>

            {/* 2. MODERN MİMARİNİN TEMEL PRENSİPLERİ */}
            <section id="principles" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16">
                        Modern Tasarımın <span className="text-red-500">Dört Temel Taşı</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ARCHITECTURE_PRINCIPLES.map((item, index) => (
                            <div 
                                key={index} 
                                className="p-6 bg-neutral-800/70 rounded-xl border border-neutral-700 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-red-500/15"
                            >
                                <item.icon className={`w-10 h-10 mb-4 ${item.vurgu}`} />
                                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                <p className="text-neutral-400 text-sm">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. UYGULAMA VE TEKNİK YAKLAŞIM */}
            <section id="technical-approach" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    
                    <div className="space-y-6">
                        <WrenchScrewdriverIcon className="w-12 h-12 text-red-500" />
                        <h2 className="text-4xl font-extrabold">
                            Teknolojiyi <span className="text-neutral-300">Sanatla</span> Buluşturuyoruz
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Proje sürecimizin her aşamasında, en son BIM (Yapı Bilgi Modellemesi) araçlarını ve parametrik tasarım yazılımlarını kullanırız. Bu, sadece estetik olarak değil, **mühendislik ve maliyet verimliliği** açısından da optimize edilmiş sonuçlar elde etmemizi sağlar.
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
                        {/*  */}
                        <Image
                            src={"/refwhite.png"} // Kendi görsel yolunuzu ekleyin
                            alt="BIM Modelleme"
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 hover:scale-105"
                        />
                         <div className="absolute inset-0" /> {/* Kırmızı Vurgu */}
                    </div>

                </div>
            </section>

            {/* 4. ÇAĞRIYA HAREKETE GEÇİREN BÖLÜM (CTA) - Projelerimize Yönlendirme */}
            <section id="cta-projects" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50">
                    <h3 className="text-3xl font-bold mb-4 text-red-400">
                        Modern Tasarım Anlayışımızı Projelerimizde Görün
                    </h3>
                    <p className="text-lg text-neutral-300 mb-8">
                        Mimari prensiplerimizin hayata geçtiği tamamlanmış ve devam eden projelere göz atın.
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
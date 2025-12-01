"use client";
import React from "react";
import Image from "next/image";
import {
    ShieldCheckIcon, // Premium Malzeme ve Kaliteyi Temsil Eder
    ScaleIcon, // Ustalık ve Hassasiyeti Temsil Eder
    ClipboardDocumentCheckIcon, // Sertifika ve Standartları Temsil Eder
    EyeIcon, // Sürekli Denetim ve Gözetimi Temsil Eder
    ArrowRightIcon,
    CodeBracketSquareIcon, // Teknik Yeterliliği Temsil Eder
    PhoneIcon // İletişimi Temsil Eder
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

// KALİTE PİLLERİ
const QUALITY_PILLARS = [
    {
        icon: ShieldCheckIcon,
        title: "Sadece Premium Malzeme",
        description: "Uluslararası standartlara uygun, en dayanıklı ve sertifikalı yapı elemanlarını kullanıyoruz. Kaliteden ödün vermeyen tedarikçi ağı.",
        vurgu: "text-red-500"
    },
    {
        icon: ScaleIcon,
        title: "Ustalık ve Hassasiyet",
        description: "Projenin her aşaması, alanında uzmanlaşmış, deneyimli ekiplerce en ince detayına kadar titizlikle uygulanır.",
        vurgu: "text-neutral-400"
    },
    {
        icon: ClipboardDocumentCheckIcon,
        title: "Uluslararası Sertifikalar",
        description: "Tüm inşaat süreçlerimiz, en katı yerel ve global kalite, çevre ve iş güvenliği yönetmeliklerine tam uyumludur.",
        vurgu: "text-red-500"
    },
    {
        icon: EyeIcon,
        title: "Sürekli Denetim Protokolü",
        description: "Her fazda bağımsız kalite kontrol mühendisleri tarafından sıfır toleransla denetimler yapılır. Hata payı yoktur.",
        vurgu: "text-neutral-400"
    },
];

export default function YuksekKaliteliInsaat() {
    
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
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <CodeBracketSquareIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                   
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-white">Mükemmeliyet</span> <span className="text-red-500"> İnşa Ediyoruz</span>
                    </h1>
                    <p className="text-xl font-light text-neutral-300 max-w-3xl mx-auto">
                        Bizim için inşaat kalitesi bir seçenek değil, bir taahhüttür. En yüksek standartları, sıfır hatayla uyguluyoruz.
                    </p>
                </div>
            </section>

            {/* 2. KALİTENİN DÖRT TEMEL PİLARI */}
            <section id="pillars" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16">
                        Kalite Taahhüdümüzün <span className="text-red-500">Temel İlkeleri</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {QUALITY_PILLARS.map((item, index) => {
                             const PillarIcon = item.icon;
                             return (
                                <div 
                                    key={index} 
                                    className="p-6 py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 rounded-xl border border-neutral-700 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-red-500/50"
                                >
                                    <div className="p-3 bg-red-900/30 rounded-full inline-block mb-4">
                                        <PillarIcon className={`w-8 h-8 ${item.vurgu}`} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                                    <p className="text-neutral-400 text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. TEKNİK SÜREÇ VE GARANTİ */}
            <section id="technical-guarantee" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    
                    <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-neutral-800/80">
                        {/* 

[Image of modern architectural blueprint overlay on dark background]
 */}
                        <Image
                            src="/refwhite.png" // Görsel kimliği kullanıldı
                            alt="Teknik Çizimler ve Kontrol"
                            layout="fill"
                            objectFit="cover"
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
                                **Yapısal Garanti:** 10 Yıl
                            </li>
                            <li className="flex items-start font-semibold">
                                <CodeBracketSquareIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                                **Malzeme İade Takibi:** Dijital kayıt sistemi
                            </li>
                            <li className="flex items-start font-semibold">
                                <CodeBracketSquareIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" />
                                **Müşteri Onaylı Teslimat:** Her aşama için
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* 4. ÇAĞRIYA HAREKETE GEÇİREN BÖLÜM (CTA) - İletişime Geçin */}
            <section id="cta-contact" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-red-500 shadow-2xl shadow-red-950/50">
                    <h3 className="text-3xl font-bold mb-4">
                        Kalitemiz Hakkında Daha Fazla Bilgi Alın
                    </h3>
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
"use client";
import React from "react";
import Image from "next/image";
import {
    HomeModernIcon, // Yeşil Bina ve Eko Yaşamı Temsil Eder (LeafingHouseIcon yerine)
   ArrowPathIcon, // DÜZELTİLDİ: RecycleIcon yerine ArrowPathIcon kullanıldı (Döngüyü Temsil Eder)
    BoltIcon, // Enerji Verimliliğini Temsil Eder
    SunIcon, // Yenilenebilir Enerjiyi Temsil Eder
    ArrowRightIcon,
    GlobeEuropeAfricaIcon, // Global Sürdürülebilirliği Temsil Eder
    ChartBarIcon // Ölçülebilirliği Temsil Eder
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

// SÜRDÜRÜLEBİLİRLİK ODAK ALANLARI
const SUSTAINABILITY_FOCUS = [
    {
        icon: BoltIcon,
        title: "Sıfır Enerji Hedefi",
        description: "Bina zarfı optimizasyonu, yüksek yalıtım ve verimli mekanik sistemler ile minimum enerji tüketimini garantileriz.",
        vurgu: "text-red-500"
    },
    {
        icon: SunIcon,
        title: "Yenilenebilir Enerji Entegrasyonu",
        description: "Güneş enerjisi panelleri ve rüzgar türbinleri gibi yenilenebilir kaynakları aktif olarak projelere entegre ediyoruz.",
        vurgu: "text-neutral-400"
    },
    {
        icon: ArrowPathIcon,
        title: "Atık ve Kaynak Yönetimi",
        description: "İnşaat sahasında oluşan atıkların %80'inden fazlasını geri dönüştürme ve yerel, sertifikalı malzeme kullanma taahhüdü.",
        vurgu: "text-red-500"
    },
    {
        icon: HomeModernIcon,
        title: "Biyoçeşitlilik ve Peyzaj",
        description: "Yeşil çatılar, dikey bahçeler ve yerel bitki örtüsünü kullanarak, kentsel alandaki biyoçeşitliliği destekliyoruz.",
        vurgu: "text-neutral-400"
    },
];

export default function CevreDostuUygulamalar() {
    
    return (
        
       <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
             <Navbar />
            {/* 1. GİRİŞ VE BAŞLIK BÖLÜMÜ (HERO) */}
            <section 
                id="header" 
                className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden border-b border-neutral-700"
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
                    <GlobeEuropeAfricaIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-white">Gezegen İçin</span> <span className="text-red-500">İnşa Ediyoruz</span>
                    </h1>
                    <p className="text-xl font-light text-neutral-300 max-w-3xl mx-auto">
                        Çevre dostu uygulamalarımız ve sürdürülebilirlik felsefemizle, geleceğe daha yaşanabilir binalar ve şehirler miras bırakmayı hedefliyoruz.
                    </p>
                </div>
            </section>

            {/* 2. SÜRDÜRÜLEBİLİRLİK ODAK ALANLARI */}
            <section id="focus-areas" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16">
                        Sürdürülebilirlik <span className="text-red-500">Taahhütlerimiz</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {SUSTAINABILITY_FOCUS.map((item, index) => {
                             const FocusIcon = item.icon;
                             return (
                                <div 
                                    key={index} 
                                    className="p-6 py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 rounded-xl border border-neutral-700 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-red-500/15"
                                >
                                    <div className="p-3 bg-red-900/30 rounded-full inline-block mb-4">
                                        <FocusIcon className={`w-8 h-8 ${item.vurgu}`} />
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

            {/* 3. ÖLÇÜLEBİLİR BAŞARI VE SERTİFİKALAR */}
            <section id="certifications" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    
                    <div className="space-y-6">
                        <ChartBarIcon className="w-12 h-12 text-red-500" />
                        <h2 className="text-4xl font-extrabold">
                            Sürdürülebilirliği <span className="text-neutral-300">Ölçüyoruz</span>
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Yeşil bina standartlarına olan bağlılığımız, uluslararası sertifikalarla kanıtlanmıştır. Her projemizde enerji performansı hedeflerini belirler ve bağımsız denetimlerle doğrulama yaparız.
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-3">
                                <span className="text-red-500 text-3xl font-bold">LEED</span>
                                <p className="text-neutral-300">Minimum **LEED Silver** sertifikasyonu hedefi</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-red-500 text-3xl font-bold">BREEAM</span>
                                <p className="text-neutral-300">Çevre etki değerlendirmesinde üst düzey puanlama</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-red-950/80">
                        {/*  */}
                        <Image
                            src="/refwhite.png" // Kendi görsel yolunuzu ekleyin
                            alt="Yeşil Bina Performans Verileri"
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 hover:scale-105"
                        />
                         <div className="absolute inset-0" />
                    </div>

                </div>
            </section>

            {/* 4. ÇAĞRIYA HAREKETE GEÇİREN BÖLÜM (CTA) - Sürdürülebilir Projelere Yönlendirme */}
            <section id="cta-projects" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50">
                    <h3 className="text-3xl font-bold mb-4 text-red-400">
                        Sürdürülebilir Yaşam Alanları Yaratmaya Başlayalım
                    </h3>
                    <p className="text-lg text-neutral-300 mb-8">
                        Çevre dostu çözümlerimizi projelerinize nasıl entegre edebileceğimizi konuşmak için bize ulaşın.
                    </p>
                    <a 
                        href="/iletisim"
                        className="inline-flex items-center gap-3 px-8 py-3 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
                    >
                        <ArrowRightIcon className="w-5 h-5" />
                        Sürdürülebilir Proje Teklifi Alın
                    </a>
                </div>
            </section>
        </main>
    );
}
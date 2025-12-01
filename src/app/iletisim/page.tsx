"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    PaperAirplaneIcon, // Form Gönderme İkonu
    BuildingOffice2Icon, // Ofis Binası İkonu
    ArrowRightIcon,
    GlobeAltIcon // Sosyal Medya/Global İletişim
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

// İLETİŞİM BİLGİLERİ VERİ YAPISI
const CONTACT_INFO = [
    {
        icon: BuildingOffice2Icon,
        title: "Genel Merkez",
        details: ["Büyükdere Cad. No: 120, Kat: 5", "Şişli / İstanbul, Türkiye"],
        mapLink: "https://www.google.com/maps?ll=37.907738,32.518501&z=19&t=m&hl=tr&gl=TR&mapclient=embed&q=10436.+Sk.+No:1+Fevziçakmak+42050+Karatay/Konya" 
    },
    {
        icon: PhoneIcon,
        title: "Telefon & Faks",
        details: ["Proje Yönetimi: +90 212 555 1010", "Satış Ofisi: +90 212 555 1011"],
        linkPrefix: "tel:"
    },
    {
        icon: EnvelopeIcon,
        title: "E-Posta Adresleri",
        details: ["Genel Bilgi: info@sirketadi.com", "İnsan Kaynakları: ik@sirketadi.com"],
        linkPrefix: "mailto:"
    }
];

// Basit Form Bileşeni
const ContactForm = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        // Simülasyon
        setTimeout(() => {
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-neutral-900 rounded-xl shadow-2xl shadow-black/50 border border-red-900/50">
            <h3 className="text-3xl font-extrabold mb-6 text-white border-l-4 border-red-500 pl-4">
                Bize Doğrudan Ulaşın
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                    type="text"
                    placeholder="Adınız Soyadınız *"
                    required
                    className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:ring-red-500 focus:border-red-500"
                />
                <input
                    type="email"
                    placeholder="E-Posta Adresiniz *"
                    required
                    className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:ring-red-500 focus:border-red-500"
                />
            </div>
            
            <input
                type="text"
                placeholder="Konu Başlığı"
                className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:ring-red-500 focus:border-red-500 mb-6"
            />
            
            <textarea
                placeholder="Mesajınız..."
                rows={6}
                required
                className="w-full p-4 bg-neutral-800 text-white border border-neutral-700 rounded-lg placeholder-neutral-500 focus:ring-red-500 focus:border-red-500 mb-8 resize-none"
            />

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-3 w-full px-8 py-3 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-red-600/50 transform hover:-translate-y-0.5 hover:bg-red-500 disabled:opacity-50"
            >
                {status === 'submitting' ? (
                    'Gönderiliyor...'
                ) : (
                    <>
                        Gönder <PaperAirplaneIcon className="w-5 h-5" />
                    </>
                )}
            </button>

            {status === 'success' && (
                <p className="mt-4 text-center text-red-400 font-semibold">
                    Mesajınız başarıyla iletildi. En kısa sürede size geri dönüş yapacağız.
                </p>
            )}
        </form>
    );
};

export default function IletisimSayfasi() {
    
    return (
        <main className="bg-neutral-950 min-h-screen text-white">
<Navbar />
            {/* 1. GİRİŞ VE BAŞLIK BÖLÜMÜ (HERO) */}
            <section 
                id="header" 
                className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden border-b border-neutral-700"
            >
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <PhoneIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-white">İletişime</span> <span className="text-red-500">Geçin</span>
                    </h1>
                    <p className="text-xl font-light text-neutral-300">
                        Projeniz ne olursa olsun, bir sonraki adımı konuşmak için bize ulaşın. Ekibimiz daima hazırdır.
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

            {/* 2. ANA İLETİŞİM İÇERİĞİ (FORM + BİLGİLER) */}
            <section id="contact-content" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
                    
                    {/* SOL TARAF: İLETİŞİM FORMU (2/3 GENİŞLİK) */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>

                    {/* SAĞ TARAF: OFİS VE DİĞER BİLGİLER (1/3 GENİŞLİK) */}
                    <div className="lg:col-span-1 space-y-8 p-6 bg-neutral-900 rounded-xl border border-neutral-700">
                        
                        <h3 className="text-2xl font-bold text-red-500 mb-6">
                            Doğrudan Bilgiler
                        </h3>

                        {CONTACT_INFO.map((item, index) => {
                            const InfoIcon = item.icon;
                            return (
                                <div key={index} className="space-y-2 pb-4 border-b border-neutral-800 last:border-b-0">
                                    <div className="flex items-center text-white">
                                        <InfoIcon className="w-6 h-6 text-red-500 mr-3 shrink-0" />
                                        <span className="text-xl font-bold">{item.title}</span>
                                    </div>
                                    <ul className="text-neutral-400 pl-9 space-y-1">
                                        {item.details.map((detail, dIndex) => (
                                            <li key={dIndex}>
                                                <a 
                                                    href={item.linkPrefix ? `${item.linkPrefix}${detail.replace(/\s/g, '')}` : undefined}
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

            {/* 3. SOSYAL MEDYA VE HARİTA (AYRI BÖLÜM) */}
            <section id="map-social" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
                    
                    {/* Harita / Konum Vurgusu */}
                    <div className="relative h-72 rounded-xl overflow-hidden shadow-xl shadow-black/50 border border-neutral-700">
                        {/*  */}
                        <Image
                            src={"/images/istanbul-office-map-placeholder.jpg"} // Harita görseli için placeholder
                            alt="Genel Merkez Konumu Haritası"
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                            <a 
                                href={CONTACT_INFO[0].mapLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg transition hover:bg-red-500 shadow-lg"
                            >
                                <MapPinIcon className="w-5 h-5" />
                                Haritada Gör
                            </a>
                        </div>
                    </div>

                    {/* Sosyal Medya ve Global Ağ */}
                    <div className="p-6 bg-neutral-950 rounded-xl space-y-6 flex flex-col justify-center">
                        <GlobeAltIcon className="w-12 h-12 text-red-500" />
                        <h4 className="text-3xl font-bold text-white">Bizi Sosyal Medyada Takip Edin</h4>
                        <p className="text-neutral-400">
                            En son proje güncellemelerimiz, sektörel haberler ve mimari trendler için bizi sosyal medya ağlarımızdan takip edin.
                        </p>
                        <div className="flex gap-4">
                            {/* Sosyal Medya İkonları İçin Placeholder */}
                            <a href="#" className="p-3 bg-neutral-800 rounded-full text-red-500 hover:bg-neutral-700 transition"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="p-3 bg-neutral-800 rounded-full text-red-500 hover:bg-neutral-700 transition"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="p-3 bg-neutral-800 rounded-full text-red-500 hover:bg-neutral-700 transition"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
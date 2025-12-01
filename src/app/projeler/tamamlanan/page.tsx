"use client";
import React from "react";
import Image from "next/image";
import {
    MapPinIcon,
    CalendarDaysIcon, // Tamamlanmış tarihi vurgulamak için yeni ikon
    TrophyIcon, // Başarıyı ve teslimatı vurgulamak için
    ArrowRightIcon,
    HomeModernIcon, // Konut ve modern yapıyı temsil eden ikon
    BuildingOffice2Icon // Kurumsal ve ofis yapısını temsil eden ikon
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

// TAMAMLANAN PROJELER VERİ YAPISI
const COMPLETED_PROJECTS = [
    {
        id: 101,
        title: "Agora İş Merkezi",
        location: "Ankara, Söğütözü",
        completionYear: 2023,
        status: "Teslim Edildi",
        description: "Yüksek teknoloji ile donatılmış, A sınıfı ofis binaları kompleksi. Şehrin merkezinde kurumsal yaşamın yeni adresi.",
        imageSrc: "/refwhite.png", // Kendi görsel yolunuzu ekleyin
        vurguColor: "text-red-500",
        tag: "Kurumsal / Ofis",
        icon: BuildingOffice2Icon
    },
    {
        id: 102,
        title: "Yeşil Vadi Evleri",
        location: "Bursa, Nilüfer",
        completionYear: 2024,
        status: "Teslim Edildi",
        description: "Doğayla iç içe, düşük karbon ayak izi hedefleyen, modern ve konforlu villa projesi.",
        imageSrc: "/refwhite.png",
        vurguColor: "text-neutral-400",
        tag: "Lüks Konut / Eko Yaşam",
        icon: HomeModernIcon
    },
    {
        id: 103,
        title: "Hub İnovasyon Laboratuvarı",
        location: "İstanbul, Maslak",
        completionYear: 2023,
        status: "Teslim Edildi",
        description: "Geleceğin AR-GE çalışmalarına uygun esnek çalışma alanları ve laboratuvarlar içeren akıllı yapı.",
        imageSrc: "/refwhite.png",
        vurguColor: "text-red-500",
        tag: "Endüstriyel / Teknoloji",
        icon: BuildingOffice2Icon
    }
];

export default function TamamlananProjeler() {
    
    return (
        <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
              <Navbar />
            {/* 1. GİRİŞ VE BAŞLIK BÖLÜMÜ (HERO) */}
            <section 
                id="header" 
                className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden border-b border-neutral-700"
            >
                {/* Arka Plan Görseli (Tamamlanmış İkonik Bir Bina) */}
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
                    <TrophyIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-red-500">Teslim Edilen</span> <span className="text-white">Başarılar</span>
                    </h1>
                    <p className="text-xl font-light text-neutral-300">
                        Zamanında, bütçesinde ve söz verdiğimiz kalitede tamamlayıp teslim ettiğimiz projelerimizi inceleyin.
                    </p>
                </div>
            </section>

            {/* 2. PROJE LİSTESİ */}
            <section id="project-list" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto space-y-16">

                    {COMPLETED_PROJECTS.map((project, index) => {
                        const ProjectIcon = project.icon;

                        return (
                            <div 
                                key={project.id} 
                                // Çift/Tek projelere göre hafif renk değişimi 
                                className={`p-8 rounded-xl shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-8 
                                    ${index % 2 === 0 
                                        ? 'py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 border border-red-800/50 hover:shadow-red-500/20' 
                                        : 'py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 border border-neutral-700 hover:shadow-neutral-500/20'
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
                                    <span className="absolute top-3 right-3 px-3 py-1 bg-neutral-600 text-xs font-bold rounded-full">
                                        {project.tag}
                                    </span>
                                </div>

                                {/* Proje Detayları */}
                                <div className="md:w-2/3 space-y-4">
                                    <h2 className="text-3xl font-bold mb-2">
                                        <span className={project.vurguColor}>{project.title}</span>
                                    </h2>
                                    
                                    <p className="text-lg text-neutral-400 border-l-4 border-neutral-500 pl-4 py-1">
                                        {project.description}
                                    </p>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-700/50">
                                        {/* Tamamlanma Yılı */}
                                        <div className="flex items-center text-sm">
                                            <CalendarDaysIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                                            <span className="font-semibold text-neutral-300 mr-1">Tamamlanma:</span> 
                                            <span className="text-white font-bold">{project.completionYear}</span>
                                        </div>
                                        
                                        {/* Teslim Durumu */}
                                        <div className="flex items-center text-sm">
                                            <ProjectIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                                            <span className="font-semibold text-neutral-300 mr-1">Durum:</span> 
                                            <span className="text-red-400 font-bold">{project.status}</span>
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
                                            href={`/projeler/tamamlanan/${project.id}`}
                                            className="inline-flex items-center gap-2 px-6 py-2 border border-red-600 text-red-500 font-semibold rounded-lg hover:bg-red-900/40 transition duration-300"
                                        >
                                            Proje Detaylarını Gör
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </section>

            {/* 3. TÜM PROJELERE YÖNLENDİRME (CTA) - Devam Eden Projelere Link */}
            <section id="cta-ongoing-projects" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4 text-white">
                        Şu Anda <span className="text-red-500">İnşa Edilen</span> Projelerimiz
                    </h3>
                    <p className="text-lg text-neutral-400 mb-8">
                        Geleceğin ikonlarını inşa etmeye devam ediyoruz. Devam eden projelerimizin ilerlemesini görün.
                    </p>
                    <a 
                        href="/projeler/devam-eden"
                        className="inline-flex items-center gap-3 px-8 py-3 bg-neutral-700 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-black/50 transform hover:-translate-y-1 hover:bg-neutral-600"
                    >
                        <BuildingOffice2Icon className="w-5 h-5" />
                        Devam Eden Projelere Git
                    </a>
                </div>
            </section>
        </main>
    );
}
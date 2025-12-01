"use client";
import React from "react";
import Image from "next/image"; // Image bileşenini import etmeyi unutmayın
import {
  SparklesIcon,
  BookOpenIcon,
  CheckIcon,
  EnvelopeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

export default function MisyonVizyon() {
    
    return (
        <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
<Navbar />
            {/* 1. GİRİŞ BÖLÜMÜ (FOCUS HEADER) - GÖRSEL EKLENDİ */}
            <section 
                id="focus-header" 
                className="relative pt-40 pb-20 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white text-center overflow-hidden border-b border-neutral-700"
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
                <div className="relative z-10 max-w-4xl mx-auto px-6 ">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="text-red-500">Vizyoner</span> Hedefler. <span className="text-white">Sağlam</span> Adımlar.
                    </h1>
                    <p className="text-xl font-light text-neutral-300">
                        Mimari mükemmeliyet ve sürdürülebilir gelecek için temel ilkelerimizi keşfedin.
                    </p>
                </div>
            </section>

            {/* 2. MİSYON VE VİZYON KARTLARI (THE CORE) - Önceki ile aynı */}
            <section id="mission-vision-cards" className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

                    {/* MİSYON KARTI */}
                    <div className="p-10 border border-neutral-700 rounded-xl shadow-lg bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950/50 transition-all duration-500 hover:shadow-red-500/30 hover:scale-[1.01] transform-gpu">
                        <BookOpenIcon className="w-12 h-12 text-red-500 mb-6 border-b-2 border-red-500 pb-2 block" />
                        <h2 className="text-3xl font-bold mb-4 text-white border-b border-neutral-600/50 pb-2 inline-block">
                            🧭 Misyonumuz
                        </h2>
                        <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                            Mimari tasarımda **inovasyonu** ve inşaatta **kaliteyi** merkeze alarak, müşterilerimizin hayallerini aşan, fonksiyonel ve estetik değeri yüksek, çevreye duyarlı yapılar inşa etmektir. Toplum için kalıcı değerler yaratırken, sürdürülebilir bir geleceğe katkıda bulunmayı hedefliyoruz.
                        </p>
                        <ul className="text-neutral-400 space-y-2 text-sm">
                            <li className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" /> Müşteri beklentilerini aşan, özel çözümler sunmak.
                            </li>
                            <li className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-red-500 mt-1 mr-2 shrink-0" /> Her projede etik değerlere ve şeffaflığa bağlı kalmak.
                            </li>
                        </ul>
                    </div>

                    {/* VİZYON KARTI */}
                    <div className="p-10 border border-neutral-700 rounded-xl shadow-lg bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950/50 transition-all duration-500 hover:shadow-neutral-500/30 hover:scale-[1.01] transform-gpu">
                        <SparklesIcon className="w-12 h-12 text-neutral-400 mb-6 border-b-2 border-neutral-500 pb-2 block" />
                        <h2 className="text-3xl font-bold mb-4 text-white border-b border-neutral-600/50 pb-2 inline-block">
                            🚀 Vizyonumuz
                        </h2>
                        <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                            Mimarlık ve inşaat sektöründe, **geleceğin yapılarını** bugünden tasarlayan ve uygulayan, teknolojik gelişmeleri öncü bir şekilde benimseyen, uluslararası alanda tanınan ve tercih edilen lider bir marka olmaktır. Sektör standartlarını belirleyen, ilham veren projelere imza atmayı hedefliyoruz.
                        </p>
                        <ul className="text-neutral-400 space-y-2 text-sm">
                            <li className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-neutral-400 mt-1 mr-2 shrink-0" /> Sektördeki yenilikçi çözümlerle öncü olmak.
                            </li>
                            <li className="flex items-start">
                                <CheckIcon className="w-5 h-5 text-neutral-400 mt-1 mr-2 shrink-0" /> Uluslararası arenada mimari mükemmellik ile anılmak.
                            </li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* 3. DEĞERLERİMİZDEN KISA BİR ÖZET (SUPPORTING SECTION) - Önceki ile aynı */}
            <section id="values-summary" className="py-20 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 border-t border-neutral-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-8">
                        <span className="text-red-500">Temel</span> Değerlerimiz
                    </h3>
                    <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                        Her projede ve her ilişkide bize rehberlik eden kurumsal değerlerimiz, kalitemizin ve güvenilirliğimizin temelini oluşturur.
                    </p>
                    
                    <div className="flex justify-center gap-6 flex-wrap">
                        {/* Değerler Listesi - Küçük Kartlar */}
                        <span className="px-5 py-2 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 rounded-full text-sm font-medium text-red-400 border border-neutral-700 hover:bg-red-900/20 transition duration-300">
                            #İnovasyon
                        </span>
                        <span className="px-5 py-2 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 rounded-full text-sm font-medium text-neutral-400 border border-neutral-700 hover:bg-red-900/20 transition duration-300">
                            #Dürüstlük
                        </span>
                        <span className="px-5 py-2 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 rounded-full text-sm font-medium text-red-400 border border-neutral-700 hover:bg-red-900/20 transition duration-300">
                            #Sürdürülebilirlik
                        </span>
                        <span className="px-5 py-2 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 rounded-full text-sm font-medium text-neutral-400 border border-neutral-700 hover:bg-red-900/20  transition duration-300">
                            #MüşteriOdaklılık
                        </span>
                    </div>
                    
                    <a 
                        href="/kurumsal/degerlerimiz"
                        className="mt-10 inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition duration-300 font-semibold border-b border-red-500 hover:border-red-400"
                    >
                        Tüm Değerlerimizi Gör
                        <ArrowRightIcon className="w-4 h-4" />
                    </a>
                </div>
            </section>

            {/* 4. ÇAĞRIYA HAREKETE GEÇİREN BÖLÜM (CTA) - Önceki ile aynı */}
            <section id="cta-action" className="py-16 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6">
                <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50">
                    <h3 className="text-3xl font-bold mb-4 text-white">
                        Vizyonumuzun <span className="text-red-500">Bir Parçası</span> Olun
                    </h3>
                    <p className="text-lg text-neutral-300 mb-8">
                        Mimari mükemmellik ve yenilikçi çözümlerle geleceği birlikte inşa edelim.
                    </p>
                    <a 
                        href="/iletisim"
                        className="inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-red-600 to-red-500 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
                    >
                        <EnvelopeIcon className="w-5 h-5" />
                        Bize Ulaşın
                    </a>
                </div>
            </section>
        </main>
    );
}
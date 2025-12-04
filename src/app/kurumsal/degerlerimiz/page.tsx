"use client";
import React, { useEffect, useState } from "react";
import {
  SparklesIcon,
  HandRaisedIcon,
  GlobeEuropeAfricaIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase/client";

// Heroicons map: DB'den gelen icon string -> gerçek component
const ICON_MAP: Record<string, React.ElementType> = {
  SparklesIcon,
  HandRaisedIcon,
  GlobeEuropeAfricaIcon,
  CheckBadgeIcon,
  UserGroupIcon,
};

type CorporateValue = {
  id: number;
  title: string;
  description: string;
  icon?: string;
  color_class?: string;
  shadow_class?: string;
  order_index?: number;
};

export default function Degerlerimiz() {
  const [values, setValues] = useState<CorporateValue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValues = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("corporate_values")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Supabase error:", error.message);
        setValues([]);
      } else {
        setValues(data ?? []);
      }
      setLoading(false);
    };
    fetchValues();
  }, []);

  return (
    <main>
      <Navbar />

      <div className="relative z-10">
        {/* HEADER */}
        <section
          id="focus-header"
          className="relative pt-40 pb-20 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white text-center overflow-hidden border-b border-neutral-700"
        >
          <div className="absolute inset-0">
            <Image
              src={"/refwhite.png"}
              alt="Reform Mimari Arka Plan"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-transparent z-10" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 ">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="text-red-500">Kültürümüzün</span> Temeli
            </h1>
            <p className="text-xl font-light text-neutral-300">
              REFORM'un her projesine ve ilişkisine rehberlik eden, bizi biz
              yapan kurumsal değerlerimizi inceleyin.
            </p>
          </div>
        </section>

        {/* DEĞER KARTLARI */}
        <section
          id="value-cards"
          className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading && <p className="text-neutral-400">Yükleniyor...</p>}
            {!loading &&
              values.map((value, index) => {
                const Icon = value.icon ? ICON_MAP[value.icon] : SparklesIcon;
                const isSecondary = index % 2 !== 0;

                return (
                  <div
                    key={value.id}
                    className={`p-8 border border-neutral-700 rounded-xl shadow-2xl bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 transition-all duration-500 hover:scale-[1.02] transform-gpu hover:${value.shadow_class}`}
                  >
                    <Icon
                      className={`w-12 h-12 mb-6 ${value.color_class} border-b-2 border-opacity-70 pb-2 block`}
                    />

                    <h2
                      className={`text-xl font-bold mb-3 ${
                        isSecondary ? "text-neutral-300" : "text-red-400"
                      }`}
                    >
                      {value.title}
                    </h2>

                    <p className="text-base text-neutral-400 leading-relaxed mb-4">
                      {value.description}
                    </p>

                    <div className="flex items-center text-sm font-medium text-red-500">
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Kurumsal Prensiplerimiz
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* VİZYON BAĞLANTISI */}
        <section
          id="vision-link"
          className="py-16 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-t border-b border-neutral-700/50 px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Değerlerimizi{" "}
              <span className="text-red-500">Harekete Geçiren</span> Vizyon
            </h3>
            <p className="text-lg text-neutral-400 mb-8">
              Değerlerimiz, Misyon ve Vizyonumuzla birleşerek şirket kültürümüzün
              tamamını oluşturur.
            </p>
            <a
              href="/kurumsal/misyon-vizyon"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-red-500 transition duration-300 font-semibold border-b border-neutral-500 hover:border-red-500"
            >
              Misyon & Vizyon Sayfasına Geç
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta-action"
          className="py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6"
        >
          <div className="max-w-4xl mx-auto text-center p-8 rounded-xl border border-neutral-700 shadow-2xl shadow-black/50 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Projelerinizde <span className="text-red-500">Değerlerimizi</span>{" "}
              Deneyimleyin
            </h3>
            <p className="text-lg text-neutral-300 mb-8">
              Değerlerimizin taahhüdü altında, mükemmeliyeti garantiliyoruz.
            </p>
            <a
              href="/iletisim"
              className="inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-red-600 to-red-500 text-white font-bold rounded-lg transition-all duration-300 shadow-xl shadow-red-600/50 transform hover:-translate-y-1 hover:from-red-500 hover:to-red-400"
            >
              <EnvelopeIcon className="w-5 h-5" />
              İletişime Geçin
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import {
  MapPinIcon,
  CalendarDaysIcon,
  TrophyIcon,
  ArrowRightIcon,
  HomeModernIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/Navbar";

interface CompletedProject {
  id: number;
  title: string;
  location: string;
  completion_year: number;
  status: string;
  description: string;
  image_src: string;
  vurgu_color: string;
  tag: string;
  icon: string; // string olarak geliyor
}

export default function TamamlananProjeler() {
  const [projects, setProjects] = useState<CompletedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/projects/completed", { cache: "no-store" });
      const json = await res.json();
      setProjects(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Icon stringini Heroicon componentine map et
  const resolveIcon = (iconName: string) => {
    switch (iconName) {
      case "HomeModernIcon":
        return HomeModernIcon;
      case "BuildingOffice2Icon":
        return BuildingOffice2Icon;
      default:
        return BuildingOffice2Icon;
    }
  };

  return (
    <main className="bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section
        id="header"
        className="relative pt-40 pb-24 bg-neutral-950 text-center overflow-hidden border-b border-neutral-700"
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

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <TrophyIcon className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-red-500">Teslim Edilen</span>{" "}
            <span className="text-white">Başarılar</span>
          </h1>
          <p className="text-xl font-light text-neutral-300">
            Zamanında, bütçesinde ve söz verdiğimiz kalitede tamamlayıp teslim ettiğimiz projelerimizi inceleyin.
          </p>
        </div>
      </section>

      {/* PROJE LİSTESİ */}
      <section id="project-list" className="py-24 text-white px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {loading && <p className="text-neutral-400">Projeler yükleniyor...</p>}
          {!loading &&
            projects.map((project, index) => {
              const ProjectIcon = resolveIcon(project.icon);

              return (
                <div
                  key={project.id}
                  className={`p-8 rounded-xl shadow-2xl transition-all duration-500 flex flex-col md:flex-row gap-8 
                    ${
                      index % 2 === 0
                        ? "py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 border border-red-800/50 hover:shadow-red-500/20"
                        : "py-24 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white px-6 border border-neutral-700 hover:shadow-neutral-500/20"
                    }`}
                >
                  {/* Görsel */}
                  <div className="md:w-1/3 relative h-64 md:h-auto shrink-0">
                    <Image
                      src={project.image_src}
                      alt={project.title}
                      fill
                      className="rounded-lg transition-transform duration-500 hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-neutral-600 text-xs font-bold rounded-full">
                      {project.tag}
                    </span>
                  </div>

                  {/* Detaylar */}
                  <div className="md:w-2/3 space-y-4">
                    <h2 className="text-3xl font-bold mb-2">
                      <span className={project.vurgu_color}>{project.title}</span>
                    </h2>

                    <p className="text-lg text-neutral-400 border-l-4 border-neutral-500 pl-4 py-1">
                      {project.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-700/50">
                      <div className="flex items-center text-sm">
                        <CalendarDaysIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                        <span className="font-semibold text-neutral-300 mr-1">Tamamlanma:</span>
                        <span className="text-white font-bold">{project.completion_year}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ProjectIcon className="w-5 h-5 text-red-500 mr-2 shrink-0" />
                        <span className="font-semibold text-neutral-300 mr-1">Durum:</span>
                        <span className="text-red-400 font-bold">{project.status}</span>
                      </div>
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

      {/* CTA */}
      <section id="cta-ongoing-projects" className="py-24 text-white px-6">
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
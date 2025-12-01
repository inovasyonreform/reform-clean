"use client";
import AboutEditor from "@/components/admin/AboutEditor";
import BlogEditor from "@/components/admin/BlogEditor";
import FooterEditor from "@/components/admin/FooterEditor";
import HeroEditor from "@/components/admin/HeroEditor";
import QuoteEditor from "@/components/admin/QuoteEditor";
import SiteInfoEditor from "@/components/admin/SiteInfoEditor";
import ProjectEditor from "@/components/admin/ProjectEditor";
import TeamEditor from "@/components/admin/TeamEditor";
import { useState } from "react";
import AboutFeaturesEditor from "@/components/admin/AboutFeatureEditor";
import CorporateAboutEditor from "@/components/admin/CorporateAboutEditor";
import CorporateFeaturesEditor from "@/components/admin/CorporateFeaturesEditor";
// Sekme verilerine ikon ekliyoruz ve labelları netleştiriyoruz
const tabs = [
  { key: "hero", label: "Giriş (Hero)", icon: "🚀" },
  { key: "siteInfo", label: "Genel Site Bilgisi", icon: "⚙️" },
  { key: "projects", label: "Projeler", icon: "💡" },
  { key: "team", label: "Ekip Yönetimi", icon: "👥" },
  { key: "about", label: "Hakkımızda Metni", icon: "📝" },
  { key: "aboutFeatures", label: "Hakkımızda Özellikleri", icon: "⭐" },
  { key: "corpAbout", label: "Neden Biz", icon: "🏢" }, // YENİ
  { key: "corpFeatures", label: "Kurumsal Sayfa Özellikleri", icon: "✅" }, // YENİ
  { key: "quotes", label: "Alıntılar/Referanslar", icon: "💬" },
  { key: "blog", label: "Blog Yazıları", icon: "📰" },
  { key: "footer", label: "Footer İçeriği", icon: "⬇️" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("hero");

  // İçeriği döndüren işlev
  const renderContent = () => {
    switch (activeTab) {
      case "team":
        return <TeamEditor />;
      case "about":
        return <AboutEditor />;
      case "aboutFeatures":
        return <AboutFeaturesEditor />;
      case "corpAbout": // YENİ
        return <CorporateAboutEditor />;
      case "corpFeatures": // YENİ
        return <CorporateFeaturesEditor />;
      case "projects":
        return <ProjectEditor />;
      case "quotes":
        return <QuoteEditor />;
      case "siteInfo":
        return <SiteInfoEditor />;
      case "hero":
        return <HeroEditor />;
      case "blog":
        return <BlogEditor />;
      case "footer":
        return <FooterEditor />;
      default:
        return (
          <div className="p-8 text-center text-neutral-500">
            Lütfen düzenlemek istediğiniz bir bölüm seçin.
          </div>
        );
    }
  };

  return (
    // Ana kapsayıcı: Koyu arka plan ve ekranı kapla
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* 1. Sidebar (Kenar Çubuğu) */}
      <aside className="w-72 bg-neutral-800 flex flex-col shadow-2xl z-10 border-r border-neutral-700">
        {/* Panel Başlığı */}
        <div className="p-6 text-2xl font-extrabold text-red-400 border-b border-neutral-700">
          ⚙️ Yönetim Paneli
        </div>

        {/* Navigasyon Alanı */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg 
                font-medium transition-all duration-200 ease-in-out
                ${
                  activeTab === tab.key
                    ? // Aktif sekme: red vurgu, hafif gölge
                      "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : // Pasif sekme: Hover ile rengi aç ve vurgula
                      "text-neutral-300 hover:bg-neutral-700 hover:text-red-400"
                }
              `}
              title={tab.label}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* 2. Main Content (Ana İçerik) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Başlık Dinamik Olarak Güncellenir */}
          <h1 className="text-3xl font-bold mb-6 text-red-400 border-b border-neutral-700 pb-2">
            {tabs.find((t) => t.key === activeTab)?.label}
          </h1>

          {/* İçerik Kartı: Koyu Temada Hafif Açık Kart */}
          <div className="bg-neutral-800 p-6 md:p-10 rounded-xl shadow-2xl border border-neutral-700 min-h-[80vh]">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

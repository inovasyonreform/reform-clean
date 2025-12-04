"use client";
import AboutEditor from "@/components/admin/AboutEditor";
import BlogEditor from "@/components/admin/BlogPostsEditor";
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
import DegerlerimizEditor from "@/components/admin/DegerlerimizEditor";
import CorporateWhyUsEditor from "@/components/admin/CorporateWhyUsEditor";
import CorporateMissionVisionEditor from "@/components/admin/CorporateMissionVisionEditor";
import OngoingProjectsEditor from "@/components/admin/OngoingProjectsEditor";
import CompletedProjectsEditor from "@/components/admin/CompletedProjectsEditor";
import ArchitecturePrinciplesEditor from "@/components/admin/ArchitecturePrincipleEditor";
import QualityPillarsEditor from "@/components/admin/QualityPillarsEditor";
import EcoFocusEditor from "@/components/admin/EcoFocusEditor";
import ContactInfoEditor from "@/components/admin/ContactInfoEditor";

// Gruplu sekmeler
const sections = [
  {
    group: "Ana Sayfa",
    items: [
      { key: "hero", label: "Giriş (Hero)", icon: "🚀" },
      { key: "about", label: "Hakkımızda", icon: "📝" },
      { key: "projects", label: "Projeler", icon: "💡" },
      { key: "team", label: "Ekip", icon: "👥" },
      { key: "blog", label: "Blog", icon: "📰" },
      { key: "quotes", label: "Alıntılar", icon: "💬" },
      { key: "footer", label: "Footer", icon: "⬇️" },
    ],
  },
  {
    group: "Kurumsal",
    items: [
      { key: "kurumsal_hakkimizda", label: "Hakkımızda", icon: "🏢" },
      { key: "kurumsal_misyon", label: "Misyon & Vizyon", icon: "🎯" },
      { key: "kurumsal_degerler", label: "Değerlerimiz", icon: "💎" },
      { key: "kurumsal_nedenbiz", label: "Neden Biz", icon: "❓" }, // YENİ
    ],
  },
  {
    group: "Hizmetlerimiz",
    items: [
      { key: "hizmet_mimari", label: "Mimari Tasarım", icon: "🏛️" },
      { key: "hizmet_insaat", label: "Kaliteli İnşaat", icon: "🧱" },
      { key: "hizmet_cevreci", label: "Çevre Dostu", icon: "🌿" },
    ],
  },
  {
    group: "Projeler",
    items: [
      { key: "proje_devam", label: "Devam Eden", icon: "🔄" },
      { key: "proje_tamam", label: "Tamamlanan", icon: "✅" },
    ],
  },
  {
    group: "İletişim",
    items: [
      { key: "iletisim_bilgi", label: "İletişim Bilgileri", icon: "📞" },
      { key: "iletisim_form", label: "Form Ayarları", icon: "📨" },
    ],
  },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("hero");

  const renderContent = () => {
    switch (activeTab) {
      case "kurumsal_hakkimizda":
        return <CorporateAboutEditor />;
      case "kurumsal_misyon":
        return <CorporateMissionVisionEditor />; // misyon/vizyon için
      case "kurumsal_degerler":
        return <DegerlerimizEditor />;
      case "kurumsal_nedenbiz":
        return <CorporateWhyUsEditor />;
      case "team":
        return <TeamEditor />;
      case "about":
        return <AboutEditor />;
      case "aboutFeatures":
        return <AboutFeaturesEditor />;
      case "projects":
        return <ProjectEditor />;
      case "proje_devam":
        return <OngoingProjectsEditor />; // Devam Eden Projeler Editor
      case "proje_tamam":
        return <CompletedProjectsEditor />;
      case "hizmet_mimari":
        return <ArchitecturePrinciplesEditor />;
      case "hizmet_insaat":
        return <QualityPillarsEditor />;
      case "hizmet_cevreci":
        return <EcoFocusEditor />;
      case "iletisim_bilgi":
        return <ContactInfoEditor />;
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
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-neutral-800 flex flex-col shadow-2xl z-10 border-r border-neutral-700">
        <div className="p-6 text-2xl font-extrabold text-red-400 border-b border-neutral-700">
          ⚙️ Yönetim Paneli
        </div>

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
          {sections.map((section) => (
            <div key={section.group}>
              <h2 className="text-sm font-bold text-neutral-400 mb-2 uppercase">
                {section.group}
              </h2>
              {section.items.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out ${
                    activeTab === tab.key
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "text-neutral-300 hover:bg-neutral-700 hover:text-red-400"
                  }`}
                  title={tab.label}
                >
                  <span className="text-xl leading-none">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-red-400 border-b border-neutral-700 pb-2">
            {
              sections.flatMap((s) => s.items).find((t) => t.key === activeTab)
                ?.label
            }
          </h1>
          <div className="bg-neutral-800 p-6 md:p-10 rounded-xl shadow-2xl border border-neutral-700 min-h-[80vh]">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";
import React from "react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  PhotoIcon,
  SparklesIcon,
  BookOpenIcon,
  EnvelopeIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
// Next.js'de sayfa yönlendirmesi için genellikle 'next/link' kullanılır.
// Ancak mevcut yapıyı korumak adına sadece href'leri güncelleyeceğiz.

// Yeni Menü Yapısı (URL tabanlı href'ler ile güncellendi)
const NAV_MENU = [
  { name: "Anasayfa", icon: HomeIcon, href: "/", sub: [] }, // Ana sayfa genellikle "/"
  { 
    name: "Kurumsal", 
    icon: BuildingOfficeIcon, 
    href: "/kurumsal/hakkimizda", // Ana Kurumsal butonu Hakkımızda'ya yönlendirecek
    sub: [
      { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { name: "Misyon & Vizyon", href: "/kurumsal/misyon-vizyon" },
      { name: "Değerlerimiz", href: "/kurumsal/degerlerimiz" },
    ] 
  },
  { 
    name: "Projeler", 
    icon: PhotoIcon, 
    href: "/projeler/devam-eden", 
    sub: [
      { name: "Devam Eden Projeler", href: "/projeler/devam-eden" },
      { name: "Tamamlanan Projeler", href: "/projeler/tamamlanan" },
    ] 
  },
  { 
    name: "Hizmetlerimiz", 
    icon: SparklesIcon, 
    href: "/hizmetlerimiz/mimari-tasarim", 
    sub: [
      { name: "Modern Mimari Tasarım", href: "/hizmetlerimiz/mimari-tasarim" },
      { name: "Yüksek Kaliteli İnşaat", href: "/hizmetlerimiz/kaliteli-insaat" },
      { name: "Çevre Dostu Uygulamalar", href: "/hizmetlerimiz/cevre-dostu" },
    ] 
  },
  { name: "Blog", icon: BookOpenIcon, href: "/blog", sub: [] },
  { name: "İletişim", icon: EnvelopeIcon, href: "/iletisim", sub: [] },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false); // Mobil menü açık mı?
  const [isScrolling, setIsScrolling] = React.useState(false); // Kaydırma yapılıyor mu?
  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null); // Desktop alt menü yönetimi (adına göre)
  const [openMobileSubMenu, setOpenMobileSubMenu] = React.useState<string | null>(null); // Mobile alt menü (akordiyon)

  const handleOpen = () => setOpen((cur) => !cur);
  const closeMenu = () => {
    setOpen(false);
    setOpenSubMenu(null);
    setOpenMobileSubMenu(null);
  };
  
  // Desktop Alt Menü Açma/Kapama
  const handleMouseEnter = (name: string, hasSub: boolean) => {
    if (hasSub) setOpenSubMenu(name);
  };
  const handleMouseLeave = () => {
    setOpenSubMenu(null);
  };

  // Yeni yönlendirme fonksiyonu. Sayfa dışı yönlendirmeler için.
  // Not: Bu fonksiyonu kullanmak yerine direkt 'a' etiketine 'href' vermek daha sade olacaktır.
  // Ancak, mobil menüyü kapatmak için bu fonksiyonu koruyup yönlendirme yapalım.
  const navigateTo = (href: string) => {
    closeMenu();
    window.location.href = href; // Sayfa yönlendirmesi yapar
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50);
      setOpenSubMenu(null); 
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // Mobil alt menü akordiyon toggle
  const toggleMobileSubMenu = (name: string) => {
    setOpenMobileSubMenu(openMobileSubMenu === name ? null : name);
  };

  return (
    <>
      {/* Sabit Navigasyon Çubuğu */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolling
            ? "bg-neutral-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-neutral-800/50"
            : "bg-transparent"
        }`}
        role="navigation"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo - Anasayfaya yönlendirme */}
          <a
            href="/" // Anasayfa URL'i
            className="flex items-center hover:opacity-80 transition-opacity duration-300 group"
            aria-label="Anasayfa"
          >
            <div className="relative ">
              <Image
                src="/logo.png"
                alt="Reform Logo"
                width={220}
                height={220}
                className="h-auto w-32 md:w-44"
                priority
              />
              {/* Vurgu Işık Efekti */}
              <div className="absolute -inset-2 bg-linear-to-r from-red-600/0 to-red-500/0 rounded-lg blur-md transition-all duration-300" />
            </div>
          </a>

          {/* Desktop Menu */}
          <ul
            className={`hidden lg:flex items-center gap-1 ${
              isScrolling ? "text-neutral-200" : "text-white"
            }`}
          >
            {NAV_MENU.map(({ name, icon: Icon, href, sub }) => (
              <li 
                key={name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(name, sub.length > 0)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Ana Menü Öğesi (Yönlendirme yapıyorsa 'a' etiketi kullanıldı) */}
                <a
                  href={href}
                  onClick={(e) => { 
                    // Eğer alt menüsü varsa ve tıklanıyorsa, hover/açma işlemini desteklemek için 
                    // yönlendirmeyi engellemek iyi bir uygulama olabilir. Ancak basitlik için direkt linke yönlendiriyoruz.
                    // e.preventDefault();
                    sub.length > 0 ? handleMouseEnter(name, true) : navigateTo(href);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-light text-sm transition-all duration-300 group hover:bg-white/10 ${openSubMenu === name ? 'bg-white/10 text-red-500' : 'hover:text-red-500'}`}
                  aria-expanded={openSubMenu === name}
                  aria-haspopup={sub.length > 0 ? "true" : "false"}
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{name}</span>
                  {sub.length > 0 && (
                    <ChevronDownIcon 
                      className={`h-4 w-4 transition-transform duration-300 ${openSubMenu === name ? 'rotate-180' : ''}`} 
                    />
                  )}
                  <div className="h-0.5 w-0 bg-linear-to-r from-red-600 to-red-500 rounded-full transition-all duration-300 group-hover:w-4" />
                </a>
                
                {/* Alt Menü (Dropdown) */}
                {sub.length > 0 && (
                  <ul
                    className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 ${
                      openSubMenu === name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                    } transition-all duration-200 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl shadow-black/40 p-1`}
                  >
                    {sub.map((subItem) => (
                      <li key={subItem.name}>
                        <a
                          href={subItem.href}
                          onClick={() => navigateTo(subItem.href)}
                          className="w-full flex items-center px-3 py-2 text-sm text-neutral-300 rounded-md transition-all duration-200 hover:bg-red-600/10 hover:text-red-400"
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button Desktop */}
          <a
            href="/iletisim" // İletişim sayfasına yönlendir
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-light rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 group"
          >
            Danışmanlık Al
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          {/* Mobile Menu Button - unchanged */}
          <button
            onClick={handleOpen}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolling
                ? "hover:bg-neutral-800"
                : "hover:bg-white/10"
            }`}
            aria-label="Mobil menüyü aç/kapat"
          >
            {open ? (
              <XMarkIcon
                className={`h-6 w-6 ${
                  isScrolling ? "text-neutral-200" : "text-white"
                }`}
              />
            ) : (
              <Bars3Icon
                className={`h-6 w-6 ${
                  isScrolling ? "text-neutral-200" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <aside
        className={`fixed top-0 left-0 h-screen w-80 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:hidden bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-r border-neutral-800/50`}
      >
        {/* Header (Logo) */}
        <div className="p-6 border-b border-neutral-800/50">
          <Image
            src="/logo.png"
            alt="Reform Logo"
            width={200}
            height={200}
            className="h-auto w-28"
            priority
          />
        </div>

        {/* Menu Items */}
        <nav className="py-6 px-4">
          <ul className="flex flex-col gap-1">
            {NAV_MENU.map(({ name, icon: Icon, href, sub }, index) => (
              <li key={name}>
                {/* Ana Menü Öğesi - Mobil (Clickable) */}
                <button
                  onClick={() => sub.length > 0 ? toggleMobileSubMenu(name) : navigateTo(href)}
                  className={`w-full flex items-center justify-between gap-4 px-4 py-3 text-neutral-300 rounded-lg font-light transition-all duration-300 group ${
                    openMobileSubMenu === name ? 'bg-red-600/20 text-red-400 border-l-2 border-red-500' : 'hover:bg-white/5 hover:text-red-400'
                  }`}
                  style={{ animationDelay: open ? `${index * 0.08}s` : '0s' }}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{name}</span>
                  </div>
                  {sub.length > 0 && (
                    <ChevronDownIcon 
                        className={`h-4 w-4 shrink-0 transition-transform duration-300 ${openMobileSubMenu === name ? 'rotate-180 text-red-400' : 'text-neutral-400'}`} 
                    />
                  )}
                </button>
                
                {/* Mobil Alt Menü (Akordiyon İçeriği) */}
                {sub.length > 0 && (
                    <ul 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openMobileSubMenu === name ? 'max-h-60 pt-2' : 'max-h-0'
                        }`}
                    >
                        {sub.map((subItem, subIndex) => (
                            <li key={subItem.name}>
                                <a
                                    href={subItem.href}
                                    onClick={() => navigateTo(subItem.href)}
                                    className="w-full flex items-center pl-14 pr-4 py-2 text-sm text-neutral-400 rounded-md transition-all duration-200 hover:bg-white/5 hover:text-red-400"
                                >
                                    <span className="text-red-500 mr-2">•</span> {subItem.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button Mobile */}
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <a
            href="/iletisim"
            onClick={() => navigateTo("/iletisim")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-light rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
          >
            Danışmanlık Al
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-800/50 text-center">
          <p className="text-neutral-500 text-xs font-light">
            © 2025 REFORM İNOVASYON YAPI
          </p>
        </footer>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Slide In Animation Style (Unchanged) */}
      <style>{`
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
      `}</style>
    </>
  );
}
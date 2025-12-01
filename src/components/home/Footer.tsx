"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type SiteInfo = {
  id: number;
  company_name: string;
  slogan: string;
  logo_url: string;
};

export default function Footer() {
  const [info, setInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("/api/site-info");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setInfo(data[0]);
        } else {
          setError("Site bilgisi bulunamadı.");
        }
      } catch (err) {
        setError("Veri alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (loading) return <footer className="py-8 text-center text-sm text-neutral-500">Yükleniyor...</footer>;
  if (error) return <footer className="py-8 text-center text-sm text-red-500">{error}</footer>;
  if (!info) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-300 border-t border-neutral-800">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800/5 rounded-full blur-3xl -z-10 opacity-20" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src={info.logo_url}
                    alt="logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-light text-lg text-white">{info.company_name}</h3>
                  <p className="text-sm font-light text-neutral-400">{info.slogan}</p>
                </div>
              </div>
              <p className="text-sm font-light text-neutral-400 leading-relaxed">
                İç mimarlık ve tasarım alanında yaratıcı çözümler sunuyoruz.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-light text-lg mb-6">Hızlı Linkler</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#anasayfa"
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 font-light"
                  >
                    Anasayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projeler"
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 font-light"
                  >
                    Projeler
                  </Link>
                </li>
                <li>
                  <Link
                    href="#hakkimizda"
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 font-light"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="#blog"
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 font-light"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-light text-lg mb-6">İletişim</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+905326283381"
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 font-light text-sm"
                  >
                    0 (532) 425 33 88
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@reforminovasyon.com"
                    className="text-neutral-400 hover:text-red-500 transition-colors duration-300 font-light text-sm"
                  >
                    info@reforminovasyon.com
                  </a>
                </li>
                <li>
                  <p className="text-neutral-400 font-light text-sm">
                    Karatay, KONYA
                  </p>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-light text-lg mb-6">Bizi Takip Edin</h4>
              <div className="flex gap-3">
                {/*
                  { name: "Instagram", icon: "📱" },
                  { name: "Facebook", icon: "👥" },
                  { name: "LinkedIn", icon: "💼" },
                  { name: "Twitter", icon: "🐦" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-red-600/30 border border-neutral-700 hover:border-red-500/50 flex items-center justify-center transition-all duration-300 group"
                    title={social.name}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
                */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-red-600/30 border border-neutral-700 hover:border-red-500/50 flex items-center justify-center transition-all duration-300 group"
                  title="Instagram"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    📱
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-red-600/30 border border-neutral-700 hover:border-red-500/50 flex items-center justify-center transition-all duration-300 group"
                  title="Facebook"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    👥
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-red-600/30 border border-neutral-700 hover:border-red-500/50 flex items-center justify-center transition-all duration-300 group"
                  title="LinkedIn"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    💼
                  </span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-red-600/30 border border-neutral-700 hover:border-red-500/50 flex items-center justify-center transition-all duration-300 group"
                  title="Twitter"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    🐦
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-red-700 to-transparent" />
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-light text-neutral-400">
              © {currentYear} {info.company_name}. Tüm hakları saklıdır.
            </p>

            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm font-light text-neutral-400 hover:text-red-500 transition-colors duration-300"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="#"
                className="text-sm font-light text-neutral-400 hover:text-red-500 transition-colors duration-300"
              >
                Kullanım Şartları
              </Link>
              <Link
                href="#iletisim"
                className="text-sm font-light text-neutral-400 hover:text-red-500 transition-colors duration-300"
              >
                İletişim
              </Link>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
"use client";
import { useEffect, useState, useCallback } from "react";

// Bileşen Adı: ScrollToTop
export default function ScrollToTop() {
  // State 1: Bileşenin görünür olup olmadığını kontrol eder (Scroll 120px'i geçti mi?)
  const [visible, setVisible] = useState(false);
  // State 2: Sayfanın yüzde kaçının kaydırıldığını tutar (0.00'dan 1.00'e kadar)
  const [progress, setProgress] = useState(0);

  /**
   * Sayfa kaydırma ve yeniden boyutlandırma olaylarını dinleyen işlev.
   * Görünürlük ve ilerleme yüzdesini hesaplar.
   */
  const onScroll = useCallback(() => {
    // Mevcut kaydırma pozisyonu (scrollTop)
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Toplam doküman yüksekliği (farklı tarayıcılar için en büyük değeri alır)
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    
    // Pencere (viewport) yüksekliği
    const winHeight = window.innerHeight;
    
    // Kaydırılabilir toplam mesafe (Doküman Yüksekliği - Pencere Yüksekliği)
    const total = Math.max(docHeight - winHeight, 1);
    
    // İlerleme yüzdesi (scrollTop / total) - 0 ile 1 arasında sınırlandırılır
    const pct = Math.min(Math.max(scrollTop / total, 0), 1);
    
    setProgress(pct);
    // 120 pikselden fazla kaydırıldıysa görünür yap
    setVisible(scrollTop > 120);
  }, []); // Bağımlılık dizisi boş olduğu için sadece bir kere oluşturulur

  useEffect(() => {
    // Bileşen yüklendiğinde bir kez çalıştır
    onScroll(); 

    // Olay dinleyicilerini ekle
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    // Temizleme işlevi (bileşen kaldırıldığında dinleyicileri kaldır)
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]); // onScroll'u bağımlılık olarak ekle

  /**
   * Tıklama olayını işler: Sayfayı yumuşak bir şekilde en üste kaydırır.
   */
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG Çember Konfigürasyonu
  const r = 18; // Yarıçap
  const stroke = 3.5; // Çizgi kalınlığı
  const circumference = 2 * Math.PI * r; // Çember çevresi (2 * π * r)
  // Kaydırma yüzdesine göre çizgi ofseti (çizginin ne kadarının gizleneceği)
  const dashOffset = circumference * (1 - progress); 

  // Renk tanımları (Tailwind uyumlu varsayılan koyu tema için)
  const ACCENT_COLOR = "#ff0000"; // sky-400
  const ICON_COLOR = "white"; 
  const BASE_CIRCLE_COLOR = "rgba(255,255,255,0.1)"; 

  return (
    <button
      // Erişilebilirlik etiketi
      aria-label="Sayfanın başına git"
      onClick={handleClick}
      // Tailwind CSS Sınıfları (Güncellenmiş Tasarım)
      className={`
        fixed z-50 
        right-5 bottom-6 md:right-8 md:bottom-8 
        flex items-center justify-center 
        w-14 h-14 md:w-16 md:h-16 rounded-full 
        bg-neutral-900/80 backdrop-blur-md 
        border border-neutral-700 
        shadow-xl 
        transition-all duration-300 
        
        hover:scale-105 hover:border-red-800/50
        ${visible 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-90 pointer-events-none"
        }
      `}
      title="Başa dön"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Temel Çember (İlerleme çubuğunun zemini) */}
        <circle
          cx="22"
          cy="22"
          r={r}
          stroke={BASE_CIRCLE_COLOR}
          strokeWidth={stroke}
        />
        
        {/* 2. İlerleme Çemberi (Vurgu rengi) */}
        <circle
          cx="22"
          cy="22"
          r={r}
          stroke={ACCENT_COLOR} 
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          // Çizgi başlangıcını yukarı (12 yönü) çevirdik
          transform="rotate(-90 22 22)"
        />
        
        {/* 3. Ok İkonu (SVG path) */}
        <g transform="translate(22 22)">
          {/* Ok Başı (Yukarı) */}
          <path
            d="M0 -6 L-4 0 L4 0 Z" 
            stroke={ICON_COLOR}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            transform="translate(0 3)"
          />
          {/* Ok Gövdesi */}
          <path
             d="M0 0 V 4"
             stroke={ICON_COLOR}
             strokeWidth="1.6"
             strokeLinecap="round"
             fill="none"
             transform="translate(0 3)"
          />
        </g>
      </svg>
    </button>
  );
}
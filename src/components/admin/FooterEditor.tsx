"use client";
import { useEffect, useState, useCallback } from "react";

// TypeScript Arayüzü
type SiteInfo = {
  id: number;
  company_name: string;
  slogan: string;
  logo_url: string;
};

// Vurgu renkleri (red)
const ACCENT_PRIMARY_CLASS = "bg-red-600 hover:bg-red-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const INPUT_BG_CLASS = "bg-neutral-700"; // Form alanları için
const CARD_BG_CLASS = "bg-neutral-800"; // Ana kart arka planı

export default function FooterEditor() {
  const [info, setInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // 🚩 DÜZELTME 1: 'info' tipini de içerecek şekilde message state'i güncellendi
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  // Veri çekme fonksiyonu
  const fetchInfo = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/site-info");
      if (!res.ok) throw new Error("API'den bilgi alınamadı.");
      
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setInfo(data[0]);
      } else {
        // API boş dönerse, varsayılan değerlerle yeni bir form başlat
        setInfo({ id: 1, company_name: "", slogan: "", logo_url: "" });
        // type: 'info' artık tanımlı olduğu için sorun yok
        setMessage({ type: 'info', text: "Yeni site bilgileri oluşturuluyor. Lütfen kaydedin." });
      }
    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Sunucuya bağlanılamadı veya bilinmeyen hata.";
      setMessage({ type: 'error', text: `Veri alınırken hata: ${errorText}` });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  // Veri güncelleme fonksiyonu
  const updateInfo = async () => {
    if (!info) return;
    setSaving(true);
    setMessage(null);

    try {
      // Endpoint ve Method ayarları doğru görünüyor.
      const method = info.id && info.id > 0 ? "PUT" : "POST";
      // PUT'ta ID'yi kullanmak yaygın olsa da, API'niz ID olmadan sadece PUT kabul ediyorsa endpoint'i düzeltmeniz gerekebilir.
      // Mevcut endpoint'i koruyorum, ancak API'nizin PUT için ID'yi nasıl beklediğini kontrol edin.
      const endpoint = "/api/site-info"; 

      const res = await fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Güncelleme başarısız.");
      } 
      
      // Kaydetme başarılıysa API'den gelen son veriyi al
      const updated = await res.json();
      setInfo(updated); 
      setMessage({ type: 'success', text: "✅ Site bilgileri başarıyla kaydedildi!" });

    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Sunucuya bağlanılamadı veya bilinmeyen hata.";
      setMessage({ type: 'error', text: errorText });
    } finally {
      setSaving(false);
    }
  };

  // Yükleme durumu
  if (loading) return (
    <div className={`p-6 ${CARD_BG_CLASS} rounded-xl shadow-lg text-white`}>
        <p className="flex items-center gap-2 text-neutral-400">
            {/* 🚩 DÜZELTME 2: Hatalı SVG etiketi, geçerli bir spinner ile değiştirildi */}
            <svg className="animate-spin h-5 w-5 text-red-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Site bilgileri yükleniyor...
        </p>
    </div>
  );
  
  if (!info) return <p className="text-neutral-500">Düzenlenecek site bilgisi yok.</p>;


  return (
    // Ana Kapsayıcı: Koyu temaya uygun kart
    <section className={`p-8 rounded-xl shadow-2xl text-white border border-neutral-700 ${CARD_BG_CLASS}`}>
      
      <h2 className={`text-2xl font-bold mb-6 border-b border-neutral-700 pb-2 ${TEXT_ACCENT_CLASS}`}>
        ⬇️ Footer & Genel Site Bilgileri
      </h2>

      {/* Mesaj Geri Bildirimi */}
      {message && (
        <div className={`p-3 mb-6 rounded-lg font-medium ${
          message.type === 'success' ? 'bg-green-600/30 border border-green-500 text-green-300' :
          message.type === 'info' ? 'bg-blue-600/30 border border-blue-500 text-blue-300' :
          'bg-red-600/30 border border-red-500 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* 1. Firma Adı */}
      <div className="mb-6">
        <label htmlFor="company_name" className="block text-sm font-medium text-neutral-300 mb-2">Firma Adı</label>
        <input
          id="company_name"
          type="text"
          value={info.company_name}
          onChange={(e) => setInfo({ ...info, company_name: e.target.value })}
          className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
          placeholder="Örn: Xyz Teknoloji A.Ş."
          disabled={saving}
        />
      </div>

      {/* 2. Slogan */}
      <div className="mb-6">
        <label htmlFor="slogan" className="block text-sm font-medium text-neutral-300 mb-2">Slogan</label>
        <input
          id="slogan"
          type="text"
          value={info.slogan}
          onChange={(e) => setInfo({ ...info, slogan: e.target.value })}
          className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
          placeholder="Örn: Geleceği bugünden inşa ediyoruz."
          disabled={saving}
        />
      </div>

      {/* 3. Logo URL */}
      <div className="mb-6">
        <label htmlFor="logo_url" className="block text-sm font-medium text-neutral-300 mb-2">Logo URL</label>
        <div className="flex items-center gap-4">
          <input
            id="logo_url"
            type="text"
            value={info.logo_url}
            onChange={(e) => setInfo({ ...info, logo_url: e.target.value })}
            className={`flex-1 border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
            placeholder="https://adresiniz.com/logo.svg"
            disabled={saving}
          />
          {info.logo_url && (
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-neutral-600 shrink-0 bg-white/10">
              {/* Logo önizleme */}
              <img 
                src={info.logo_url} 
                alt="Logo Önizleme" 
                className="w-full h-full object-contain p-1" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = "https://via.placeholder.com/80?text=LOGO"; 
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="pt-4 border-t border-neutral-700 flex justify-end">
        <button
          onClick={updateInfo}
          disabled={saving}
          className={`
            ${ACCENT_PRIMARY_CLASS} text-white font-semibold 
            px-6 py-3 rounded-lg shadow-lg 
            transition duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {saving ? "💾 Kaydediliyor..." : "Kaydet ve Güncelle"}
        </button>
      </div>
    </section>
  );
}
"use client";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/supabase/uploadImage";
import { mutate } from "swr";

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
const BORDER_CLASS = "border-neutral-700";

export default function SiteInfoEditor() {
  const [info, setInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Veri Çekme İşlemi
  useEffect(() => {
    setLoading(true);
    setMessage(null);
    fetch("/api/site-info")
      .then((res) => {
        if (!res.ok) throw new Error("API'den bilgi alınamadı.");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
            setInfo(data[0]);
        } else {
             // API'den veri gelmezse varsayılan değerler ata
            setInfo({ id: 0, company_name: "", slogan: "", logo_url: "" });
            setMessage({ type: 'error', text: "Mevcut site bilgisi bulunamadı. Lütfen yeni bilgiler girin." });
        }
      })
      .catch((err) => {
        setMessage({ type: 'error', text: "Veri yüklenirken hata oluştu." });
        setInfo({ id: 0, company_name: "", slogan: "", logo_url: "" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Bilgi Güncelleme İşlemi
  const updateInfo = async () => {
    if (!info) return;
    setSaving(true);
    setMessage(null);
    
    // API'nin PUT veya POST'u desteklediğinden emin olmak için (ID > 0 ise PUT, değilse POST)
    const method = info.id && info.id > 0 ? "PUT" : "POST";

    try {
      const res = await fetch("/api/site-info", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Güncelleme başarısız. Hata kodu: ${res.status}`);
      }
      
      setMessage({ type: 'success', text: "✅ Site bilgileri başarıyla güncellendi!" });
      mutate("/api/site-info"); // Anasayfa güncelle
      
    } catch (err) {
        setMessage({ type: 'error', text: `Kaydetme Hatası: ${err instanceof Error ? err.message : "Bilinmeyen Hata"}` });
    } finally {
        setSaving(false);
    }
  };

  // Logo Yükleme İşlemi
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!info) return;
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    try {
        const url = await uploadImage(file);
        setInfo({ ...info, logo_url: url });
        setMessage({ type: 'success', text: "Logo başarıyla yüklendi. Kaydetmeyi unutmayın." });
    } catch (error) {
        setMessage({ type: 'error', text: "Logo yüklenirken hata oluştu." });
    } finally {
        setSaving(false);
    }
  };

  // Yükleme durumu
  if (loading) return (
    <div className={`p-6 ${CARD_BG_CLASS} rounded-xl shadow-lg text-white ${BORDER_CLASS}`}>
        <p className="flex items-center gap-2 text-neutral-400">
            <svg className="animate-spin h-5 w-5 text-red-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Site bilgileri yükleniyor...
        </p>
    </div>
  );

  if (!info) return null;

  return (
    // Ana Kapsayıcı: Koyu temaya uygun kart
    <section className={`p-8 rounded-xl shadow-2xl text-white border ${BORDER_CLASS} ${CARD_BG_CLASS}`}>
      
      <h2 className={`text-2xl font-bold mb-6 border-b ${BORDER_CLASS} pb-2 ${TEXT_ACCENT_CLASS}`}>
        ⚙️ Genel Site Bilgileri
      </h2>
      
      {/* Mesaj Geri Bildirimi */}
      {message && (
        <div className={`p-3 mb-6 rounded-lg font-medium ${
          message.type === 'success' ? 'bg-green-600/30 border border-green-500 text-green-300' :
          'bg-red-600/30 border border-red-500 text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form Alanları */}
      <div className="space-y-6">
        
        {/* 1. Şirket Adı */}
        <div className="space-y-2">
            <label htmlFor="company_name" className="block text-sm font-medium text-neutral-300">Şirket/Firma Adı</label>
            <input
                id="company_name"
                type="text"
                value={info.company_name}
                onChange={(e) =>
                    setInfo({ ...info, company_name: e.target.value })
                }
                className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
                placeholder="Örn: Xyz Teknoloji A.Ş."
                disabled={saving}
            />
        </div>
        
        {/* 2. Slogan */}
        <div className="space-y-2">
            <label htmlFor="slogan" className="block text-sm font-medium text-neutral-300">Slogan / Kısa Açıklama</label>
            <input
                id="slogan"
                type="text"
                value={info.slogan}
                onChange={(e) =>
                    setInfo({ ...info, slogan: e.target.value })
                }
                className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
                placeholder="Örn: Geleceği bugünden inşa ediyoruz."
                disabled={saving}
            />
        </div>
        
        {/* 3. Logo Yükleme ve Önizleme */}
        <div className="space-y-2">
            <label htmlFor="logo_upload" className="block text-sm font-medium text-neutral-300">Logo Görseli Yükle</label>
            <input
                id="logo_upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className={`w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600`}
                disabled={saving}
            />
            
            {info.logo_url && (
                <div className="mt-4 flex items-center gap-4 p-4 rounded-lg border border-neutral-600 bg-neutral-900">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-neutral-500 bg-white shrink-0">
                         <img
                            src={info.logo_url}
                            alt="Logo Önizleme"
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; 
                                target.src = "https://via.placeholder.com/80?text=Logo+Hata"; 
                            }}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-neutral-300">Mevcut Logo URL:</p>
                        <p className="text-xs text-neutral-400 truncate">{info.logo_url}</p>
                    </div>
                </div>
            )}
        </div>


        {/* Kaydet Butonu */}
        <div className="pt-4 border-t ${BORDER_CLASS} flex justify-end">
            <button
                onClick={updateInfo}
                disabled={saving || !info.company_name}
                className={`
                    ${ACCENT_PRIMARY_CLASS} text-white font-semibold 
                    px-6 py-3 rounded-lg shadow-lg 
                    transition duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                {saving ? "💾 Kaydediliyor..." : "Bilgileri Güncelle"}
            </button>
        </div>
      </div>
    </section>
  );
}
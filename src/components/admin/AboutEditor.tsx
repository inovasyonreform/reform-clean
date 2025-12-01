"use client";
import { useEffect, useState, useCallback } from "react";

// TypeScript Arayüzü
type AboutContent = {
  id: number;
  title: string;
  description: string;
  image_url: string;
};

// Vurgu renkleri (Önceki AdminPanel ile uyumlu: red)
const ACCENT_COLOR_CLASS = "bg-red-600 hover:bg-red-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const NEUTRAL_BG_CLASS = "bg-neutral-800"; // Form alanları için

export default function AboutEditor() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  // Veri çekme fonksiyonu
  const fetchAbout = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/about");
      if (!res.ok) {
        throw new Error("API isteği başarısız.");
      }
      const data = await res.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setAbout(data[0]);
      } else {
        setMessage({ type: 'error', text: "Veri bulunamadı. Lütfen kontrol edin." });
      }
    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Veri alınırken beklenmeyen bir hata oluştu.";
      setMessage({ type: 'error', text: errorText });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  // Veri güncelleme fonksiyonu
  const updateAbout = async () => {
    if (!about) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/about/${about.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Güncelleme başarısız.");
      } 
      
      // Başarılı güncelleme sonrası state'i yenile
      const updated = await res.json();
      setAbout(updated);
      setMessage({ type: 'success', text: "✨ Hakkımızda içeriği başarıyla güncellendi!" });

    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Sunucuya bağlanılamadı veya bilinmeyen hata.";
      setMessage({ type: 'error', text: errorText });
    } finally {
      setSaving(false);
    }
  };

  // State güncelleyici (Form inputları için)
  const handleChange = (field: keyof AboutContent, value: string) => {
    setAbout((prev) => (prev ? { ...prev, [field]: value } : null));
    setMessage(null); // Kullanıcı düzenlemeye başladığında mesajı temizle
  };

  // Yükleme durumu
  if (loading) return (
    <div className={`p-6 ${NEUTRAL_BG_CLASS} rounded-xl shadow-lg text-white`}>
        <p className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-red-400" viewBox="0 0 24 24">...</svg> Yükleniyor...
        </p>
    </div>
  );
  
  // Hata durumu (Veri çekme hatası)
  if (message?.type === 'error' && !about) return (
    <p className="p-4 bg-red-800 text-white rounded-lg">
      Hata: {message.text}
    </p>
  );

  // Veri yoksa ve yükleme bittiyse (API 200 döner ama boş liste dönerse)
  if (!about) return <p className="text-neutral-500">Düzenlenecek bir 'Hakkımızda' içeriği bulunamadı.</p>;


  return (
    // Ana Kapsayıcı: Koyu temaya uygun kart
    <section className={`p-8 rounded-xl shadow-2xl text-white border border-neutral-700 ${NEUTRAL_BG_CLASS}`}>
      
      <h2 className={`text-2xl font-bold mb-6 border-b border-neutral-700 pb-2 ${TEXT_ACCENT_CLASS}`}>
        Hakkımızda İçerik Düzenleyici
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

      {/* 1. Başlık Alanı */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-2">Başlık</label>
        <input
          id="title"
          type="text"
          value={about.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className={`w-full ${NEUTRAL_BG_CLASS} border border-neutral-600 p-3 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150`}
          placeholder="Örn: Hikayemiz ve Değerlerimiz"
        />
      </div>

      {/* 2. Açıklama Alanı */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-2">Açıklama (Uzun Metin)</label>
        <textarea
          id="description"
          value={about.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={6}
          className={`w-full ${NEUTRAL_BG_CLASS} border border-neutral-600 p-3 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150`}
          placeholder="Kurumsal hikayenizi, misyonunuzu ve vizyonunuzu buraya girin..."
        />
      </div>

      {/* 3. Görsel URL Alanı */}
      <div className="mb-6">
        <label htmlFor="image_url" className="block text-sm font-medium text-neutral-300 mb-2">Görsel URL</label>
        <div className="flex items-center gap-4">
          <input
            id="image_url"
            type="text"
            value={about.image_url}
            onChange={(e) => handleChange('image_url', e.target.value)}
            className={`flex-1 ${NEUTRAL_BG_CLASS} border border-neutral-600 p-3 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150`}
            placeholder="https://gorsel-adresiniz.com/hakkimizda.jpg"
          />
          {about.image_url && (
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-neutral-600 shrink-0">
              {/* Resim önizleme */}
              <img 
                src={about.image_url} 
                alt="Önizleme" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = "https://via.placeholder.com/80?text=Yüklenemedi"; 
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="pt-4 border-t border-neutral-700 flex justify-end">
        <button
          onClick={updateAbout}
          disabled={saving}
          className={`
            ${ACCENT_COLOR_CLASS} text-white font-semibold 
            px-6 py-3 rounded-lg shadow-lg 
            transition duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {saving ? "💾 Kaydediliyor..." : "Kaydet ve Yayınla"}
        </button>
      </div>
    </section>
  );
}
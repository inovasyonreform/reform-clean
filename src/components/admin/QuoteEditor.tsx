"use client";
import { useEffect, useState } from "react";
import { mutate } from "swr"; // SWR kütüphanesini kullanıyoruz

// TypeScript Arayüzü
type Quote = {
  id: number;
  quote: string;
  author: string;
};

// Vurgu renkleri (red)
const ACCENT_PRIMARY_CLASS = "bg-red-600 hover:bg-red-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const INPUT_BG_CLASS = "bg-neutral-700"; // Form alanları için
const CARD_BG_CLASS = "bg-neutral-800"; // Ana kart arka planı
const BORDER_CLASS = "border-neutral-700";

export default function QuoteEditor() {
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);


  // Veri Çekme İşlemi
  useEffect(() => {
    setLoading(true);
    setMessage(null);
    fetch("/api/quote")
      .then((res) => {
        if (!res.ok) throw new Error("Söz bilgisi alınamadı.");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
            setQuoteData(data[0]);
        } else {
             // API'den veri gelmezse varsayılan değerler ata
            setQuoteData({ id: 0, quote: "", author: "" });
            setMessage({ type: 'error', text: "Mevcut söz bulunamadı. Lütfen yeni bir söz girin." });
        }
      })
      .catch((err) => {
        setMessage({ type: 'error', text: "Veri yüklenirken hata oluştu." });
        setQuoteData({ id: 0, quote: "", author: "" }); // Formu açmak için boş değer ata
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Söz Güncelleme İşlemi
  const updateQuote = async () => {
    if (!quoteData) return;
    setSaving(true);
    setMessage(null);

    // API'nin PUT veya POST'u desteklediğinden emin olmak için (ID > 0 ise PUT, değilse POST kabul edilebilir)
    const method = quoteData.id && quoteData.id > 0 ? "PUT" : "POST";
    
    try {
      const res = await fetch("/api/quote", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteData),
      });
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Güncelleme başarısız. Hata kodu: ${res.status}`);
      }

      setMessage({ type: 'success', text: "✨ Söz başarıyla güncellendi!" });
      mutate("/api/quote"); // Anasayfa güncelle
      
    } catch (err) {
        setMessage({ type: 'error', text: `Kaydetme Hatası: ${err instanceof Error ? err.message : "Bilinmeyen Hata"}` });
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
            Söz bilgisi yükleniyor...
        </p>
    </div>
  );

  if (!quoteData) return null; // Yükleme bitti ama veri yoksa (API hatası yakalandı)

  return (
    // Ana Kapsayıcı: Koyu temaya uygun kart
    <section className={`p-8 rounded-xl shadow-2xl text-white border ${BORDER_CLASS} ${CARD_BG_CLASS}`}>
      
      <h2 className={`text-2xl font-bold mb-6 border-b ${BORDER_CLASS} pb-2 ${TEXT_ACCENT_CLASS}`}>
        💬 Mimari Söz & Alıntı Düzenleyici
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

      <div className="space-y-6">
        {/* 1. Söz Alanı */}
        <div className="space-y-2">
            <label htmlFor="quote" className="block text-sm font-medium text-neutral-300">Alıntı / Söz</label>
            <textarea
                id="quote"
                rows={4}
                value={quoteData.quote}
                onChange={(e) =>
                    setQuoteData({ ...quoteData, quote: e.target.value })
                }
                className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white text-lg italic focus:ring-red-500 focus:border-red-500 transition duration-150`}
                placeholder="İlham verici sözü buraya girin..."
                disabled={saving}
            />
        </div>
        
        {/* 2. Yazar Alanı */}
        <div className="space-y-2">
            <label htmlFor="author" className="block text-sm font-medium text-neutral-300">Yazar / Kaynak</label>
            <input
                id="author"
                type="text"
                value={quoteData.author}
                onChange={(e) =>
                    setQuoteData({ ...quoteData, author: e.target.value })
                }
                className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
                placeholder="Örn: Mimar Sinan"
                disabled={saving}
            />
        </div>
        
        {/* Önizleme */}
        <div className="p-4 rounded-lg border border-neutral-600 bg-neutral-900 shadow-inner">
            <p className="text-xl italic text-neutral-300">"{quoteData.quote || "Önizleme alanı..."}"</p>
            <p className="text-right mt-2 text-red-400 font-semibold">— {quoteData.author || "Yazar Adı"}</p>
        </div>


        {/* Kaydet Butonu */}
        <div className="pt-4 border-t ${BORDER_CLASS} flex justify-end">
            <button
                onClick={updateQuote}
                disabled={saving || !quoteData.quote || !quoteData.author}
                className={`
                    ${ACCENT_PRIMARY_CLASS} text-white font-semibold 
                    px-6 py-3 rounded-lg shadow-lg 
                    transition duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                {saving ? "💾 Kaydediliyor..." : "Sözü Güncelle"}
            </button>
        </div>
      </div>
    </section>
  );
}
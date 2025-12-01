"use client";
import { useEffect, useState, useCallback } from "react";
// mutate SWR'dan geliyorsa, kullanıldığından emin olalım.
import { mutate } from "swr"; 

// TypeScript Arayüzü
type Feature = {
  id: number;
  text: string;
  order?: number;
};

// Vurgu renkleri (Önceki AdminPanel ile uyumlu: red)
const ACCENT_COLOR_CLASS = "bg-red-600 hover:bg-red-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const INPUT_BG_CLASS = "bg-neutral-800"; // Form alanları için daha açık nötr ton

export default function AboutFeaturesEditor() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Veri çekme fonksiyonu
  const fetchFeatures = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/about-features");
      if (!res.ok) throw new Error("Özellikler API'den çekilemedi.");
      
      const data: Feature[] = await res.json();
      // 'order' alanı null veya undefined ise 0 kabul ederek sıralama
      setFeatures(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch (error) {
        console.error("Veri çekme hatası:", error);
        // Hata durumunda boş liste gösterebiliriz
        setFeatures([]);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);


  // Yeni Özellik Ekleme
  const addFeature = async () => {
    if (!newFeature.trim() || adding) return; // Boş girişi ve tekrar gönderimi engelle

    setAdding(true);
    try {
      const res = await fetch("/api/about-features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newFeature }),
      });
      
      if (!res.ok) throw new Error("Ekleme başarısız.");

      const created: Feature = await res.json();
      
      // Yeni öğeyi listenin sonuna ekle
      setFeatures((prev) => [...prev, created].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      setNewFeature("");
      
      // SWR önbelleğini güncelle (isteğe bağlı, state'i zaten güncelledik)
      mutate("/api/about-features"); 
    } catch (error) {
        console.error("Özellik eklenirken hata oluştu:", error);
    } finally {
        setAdding(false);
    }
  };

  // Özellik Silme
  const deleteFeature = async (id: number) => {
    // Optimistik Güncelleme: Önce UI'da sil, sonra API'ye gönder.
    const originalFeatures = features;
    setFeatures((prev) => prev.filter((f) => f.id !== id));

    try {
      const res = await fetch("/api/about-features", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      if (!res.ok) {
        // Hata durumunda geri al
        setFeatures(originalFeatures); 
        throw new Error("Silme başarısız.");
      }
      mutate("/api/about-features");
    } catch (error) {
      console.error("Özellik silinirken hata oluştu:", error);
      // Hata durumunda geri al
      setFeatures(originalFeatures);
    }
  };

  return (
    // Ana Kapsayıcı: Koyu temaya uygun kart stili
    <section className="p-8 rounded-xl shadow-2xl text-white border border-neutral-700 bg-neutral-800">
      
      <h2 className={`text-2xl font-bold mb-6 border-b border-neutral-700 pb-2 ${TEXT_ACCENT_CLASS}`}>
        ⭐ Hakkımızda Özellikleri Yönetimi
      </h2>

      {loading ? (
        <p className="flex items-center gap-2 text-neutral-400">
            <svg className="animate-spin h-5 w-5 text-red-400" viewBox="0 0 24 24">...</svg> Özellikler Yükleniyor...
        </p>
      ) : (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-300 mb-3">Mevcut Özellikler ({features.length})</h3>
            
            {/* Özellik Listesi */}
            <ul className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {features.length === 0 ? (
                <li className="text-neutral-500 italic">Henüz bir özellik eklenmedi.</li>
              ) : (
                features.map((f) => (
                  <li 
                    key={f.id} 
                    className="flex justify-between items-center bg-neutral-700 p-3 rounded-lg border border-neutral-600 transition duration-150 hover:bg-neutral-600"
                  >
                    <span className="text-neutral-200 flex-1 mr-4">{f.text}</span>
                    <button
                      onClick={() => deleteFeature(f.id)}
                      className="text-red-400 text-sm font-medium hover:text-red-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-400/50 p-1 rounded"
                      title="Özelliği Sil"
                    >
                      🗑️ Sil
                    </button>
                  </li>
                ))
              )}
            </ul>
        </div>
      )}

      {/* Yeni Özellik Ekleme Formu */}
      <div className="pt-6 border-t border-neutral-700">
        <h3 className="text-lg font-semibold text-neutral-300 mb-3">Yeni Özellik Ekle</h3>
        <div className="flex gap-3">
            <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className={`flex-1 border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
                placeholder="Yeni özellik metnini buraya girin..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addFeature();
                    }
                }}
                disabled={adding}
            />
            <button
                onClick={addFeature}
                disabled={!newFeature.trim() || adding}
                className={`
                    ${ACCENT_COLOR_CLASS} text-white font-semibold 
                    px-6 py-3 rounded-lg shadow-lg 
                    transition duration-200 
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                {adding ? "Ekleniyor..." : "✨ Ekle"}
            </button>
        </div>
      </div>
    </section>
  );
}
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// TypeScript Arayüzü
type HeroContent = {
  id: number;
  title: string;
  hashtags: string[];
  background: string;
};

// Vurgu renkleri (red)
const ACCENT_PRIMARY_CLASS = "bg-red-600 hover:bg-red-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const INPUT_BG_CLASS = "bg-neutral-700"; // Form alanları için
const CARD_BG_CLASS = "bg-neutral-800"; // Ana kart arka planı

export default function HeroEditor() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Hashtag dizesi için ayrı state
  const [hashtagInput, setHashtagInput] = useState<string>("");

  // Veri çekme fonksiyonu (API üzerinden)
  const fetchHero = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/hero");
      if (!res.ok) throw new Error("API'den bilgi alınamadı.");

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const heroData: HeroContent = data[0];

        // hashtags alanını normalize et
        let safeHashtags: string[] = [];
        if (Array.isArray(heroData.hashtags)) {
          safeHashtags = heroData.hashtags;
        } else if (typeof (heroData as any).hashtags === "string") {
          safeHashtags = ((heroData as any).hashtags as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }

        setHero({ ...heroData, hashtags: safeHashtags });
        setHashtagInput(safeHashtags.join(", "));
      } else {
        setError("Veri bulunamadı. Yeni içerik oluşturuluyor.");
        setHero({ id: 0, title: "", hashtags: [], background: "" });
      }
    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu.";
      setError(errorText);
      setMessage({ type: "error", text: `Veri alınırken hata: ${errorText}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []); // İlk yüklemede çalışır

  // Veri güncelleme fonksiyonu
  const updateHero = async () => {
    if (!hero) return;
    setSaving(true);
    setError(null);
    setMessage(null);

    // Hashtag dizesini diziye çevirip hero objesine atama
    const updatedHero: HeroContent = {
      ...hero,
      hashtags: hashtagInput
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };

    // UI'da hemen güncelle (Önizleme için)
    setHero(updatedHero);

    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHero),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Güncelleme başarısız.");
      }

      setMessage({ type: "success", text: "🚀 Giriş (Hero) bölümü başarıyla güncellendi!" });
    } catch (err) {
      const errorText = err instanceof Error ? err.message : "Sunucuya bağlanılamadı.";
      setError(errorText);
      setMessage({ type: "error", text: `HATA: ${errorText}` });
    } finally {
      setSaving(false);
    }
  };

  // Title ve Background için değişim yöneticisi
  const handleChange = (field: keyof Omit<HeroContent, "hashtags">, value: string) => {
    setHero((prev) => (prev ? { ...prev, [field]: value } : null));
    setMessage(null);
    setError(null);
  };

  // Yükleme durumu
  if (loading)
    return (
      <div className={`p-6 ${CARD_BG_CLASS} rounded-xl shadow-lg text-white`}>
        <p className="flex items-center gap-2 text-neutral-400">
          <svg className="animate-spin h-5 w-5 text-red-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Hero içeriği yükleniyor...
        </p>
      </div>
    );

  // Hata durumu
  if (error) return <p className="p-4 bg-red-800 text-white rounded-lg">Hata: {error}</p>;

  if (!hero) return null;

  return (
    // Ana Kapsayıcı: Koyu temaya uygun kart
    <section className={`p-8 rounded-xl shadow-2xl text-white border border-neutral-700 ${CARD_BG_CLASS}`}>
      <h2 className={`text-2xl font-bold mb-6 border-b border-neutral-700 pb-2 ${TEXT_ACCENT_CLASS}`}>
        🚀 Giriş Bölümü (Hero) Düzenleyici
      </h2>

      {/* Mesaj Geri Bildirimi */}
      {message && (
        <div
          className={`p-3 mb-6 rounded-lg font-medium ${
            message.type === "success"
              ? "bg-green-600/30 border border-green-500 text-green-300"
              : "bg-red-600/30 border border-red-500 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* 1. Başlık */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-neutral-300">
            Ana Başlık
          </label>
          <input
            id="title"
            type="text"
            value={hero.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white text-xl focus:ring-red-500 focus:border-red-500 transition duration-150`}
            placeholder="Sitenizin ana mesajı (H1)"
            disabled={saving || uploading}
          />
        </div>

        {/* 2. Hashtagler */}
        <div className="space-y-2">
          <label htmlFor="hashtags" className="block text-sm font-medium text-neutral-300">
            Etiketler/Hashtagler (Virgülle Ayırın)
          </label>
          <textarea
            id="hashtags"
            value={hashtagInput}
            // Hashtag dizisini string state'i ile yönet
            onChange={(e) => setHashtagInput(e.target.value)}
            rows={3}
            className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
            placeholder="Örn: Teknoloji, Yazılım, Yapay Zeka, Başarı"
            disabled={saving || uploading}
          />
          {/* Önizleme Etiketleri */}
          <div className="mt-2 flex flex-wrap gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-700">
            {hashtagInput
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s.length > 0)
              .map((tag, index) => (
                <span key={index} className="px-3 py-1 text-sm rounded-full bg-red-600/20 text-red-400 font-medium">
                  #{tag}
                </span>
              ))}
            {hashtagInput.trim() === "" && <span className="text-neutral-500 text-sm italic">Etiket yok.</span>}
          </div>
        </div>

        {/* 3. Arka Plan Görseli */}
        <div className="space-y-2">
          <label htmlFor="background" className="block text-sm font-medium text-neutral-300">
            Arka Plan Görsel URL
          </label>
          <input
            id="background"
            type="text"
            value={hero.background}
            onChange={(e) => handleChange("background", e.target.value)}
            className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
            placeholder="https://gorsel-adresiniz.com/hero.jpg"
            disabled={saving || uploading}
          />

          {/* Dosya seçme */}
          <input
            type="file"
            accept="image/*"
            className={`w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600`}
            disabled={saving}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setUploading(true);
              setError(null);
              setMessage(null);

              // Preview için local URL
              const previewUrl = URL.createObjectURL(file);
              setHero((prev) => (prev ? { ...prev, background: previewUrl } : null));

              // Dosya uzantısını koru ve benzersiz isim üret
              const ext = file.name.split(".").pop();
              const fileName = `hero-${Date.now()}.${ext ?? "png"}`;

              // Upload için Supabase Storage
              const { data, error } = await supabase.storage.from("images").upload(fileName, file, {
                upsert: false,
              });

              if (error) {
                setError(error.message);
                setMessage({ type: "error", text: `Görsel yüklenemedi: ${error.message}` });
              } else {
                // Public URL'i doğru şekilde al
                const { data: publicData } = supabase.storage.from("images").getPublicUrl(data.path);
                const publicUrl = publicData?.publicUrl ?? "";

                setHero((prev) => (prev ? { ...prev, background: publicUrl } : null));
                setMessage({ type: "success", text: "Görsel başarıyla yüklendi." });
              }

              // Preview URL'i serbest bırak
              URL.revokeObjectURL(previewUrl);
              setUploading(false);
            }}
          />

          {hero.background && (
            <div className="mt-3 relative w-full h-40 rounded-lg overflow-hidden border border-neutral-600">
              <img
                src={hero.background}
                alt="Arka Plan Önizleme"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://via.placeholder.com/400x160?text=Görsel+Yüklenemedi";
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-bold">
                ÖNİZLEME
              </div>
            </div>
          )}
        </div>

        {/* Kaydet Butonu */}
        <div className="pt-4 border-t border-neutral-700 flex justify-end">
          <button
            onClick={updateHero}
            disabled={saving || uploading}
            className={`
                ${ACCENT_PRIMARY_CLASS} text-white font-semibold 
                px-6 py-3 rounded-lg shadow-lg 
                transition duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
          >
            {saving ? "💾 Kaydediliyor..." : uploading ? "📤 Yükleniyor..." : "Kaydet ve Güncelle"}
          </button>
        </div>
      </div>
    </section>
  );
}
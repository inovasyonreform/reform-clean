"use client";
import { useEffect, useState } from "react";

type CorporateAbout = {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  story_title: string;
  story_text: string;
  story_highlight: string;
  story_image_url: string;
  mission_text: string;
  vision_text: string;
  values_list: string[];
  cta_heading: string;
};

export default function CorporateAboutEditor() {
  const [records, setRecords] = useState<CorporateAbout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form state for new record
  const [form, setForm] = useState<Omit<CorporateAbout, "id">>({
    hero_title: "",
    hero_subtitle: "",
    story_title: "",
    story_text: "",
    story_highlight: "",
    story_image_url: "",
    mission_text: "",
    vision_text: "",
    values_list: [],
    cta_heading: "",
  });

const fetchData = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/corporate/about", { cache: "no-store" });
    // 404 → boş veri durumu
    if (res.status === 404) {
      setRecords([]);
      setError(null);
    } else {
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Bilinmeyen hata");
        setRecords([]);
      } else {
        setRecords(Array.isArray(json) ? json : [json]);
        setError(null);
      }
    }
  } catch {
    setError("Veri çekilirken hata oluştu");
    setRecords([]);
  }
  setLoading(false);
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (field: keyof Omit<CorporateAbout, "id">, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const insertRecord = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/corporate/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error || "Insert başarısız");
      else {
        setError(null);
        setForm({
          hero_title: "",
          hero_subtitle: "",
          story_title: "",
          story_text: "",
          story_highlight: "",
          story_image_url: "",
          mission_text: "",
          vision_text: "",
          values_list: [],
          cta_heading: "",
        });
        await fetchData();
      }
    } catch {
      setError("Veri eklenirken hata oluştu");
    }
    setLoading(false);
  };

  const updateField = async (id: number, field: keyof CorporateAbout, value: any) => {
    const record = records.find((r) => r.id === id);
    if (!record) return;
    const { id: recordId, ...rest } = record;
    const updated = { ...rest, [field]: value };
    setRecords(records.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    try {
      const res = await fetch("/api/corporate/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updated, id: recordId }),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error || "Güncelleme başarısız");
      else setError(null);
    } catch {
      setError("Güncelleme sırasında hata oluştu");
    }
  };

  const deleteRecord = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/corporate/about", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) setError(json.error || "Silme başarısız");
      else {
        setError(null);
        setRecords(records.filter((r) => r.id !== id));
      }
    } catch {
      setError("Veri silinirken hata oluştu");
    }
    setLoading(false);
  };

  if (loading) return <p className="text-neutral-400">Yükleniyor...</p>;
  if (error) return <p className="text-red-500">Hata: {error}</p>;

  return (
    <div className="space-y-6">
      {/* Ekleme Formu */}
      <div className="space-y-2 p-4 border border-neutral-700 rounded">
        <h2 className="text-lg text-white">Yeni Hakkımızda Kaydı Ekle</h2>
        <input
          value={form.hero_title}
          onChange={(e) => handleFormChange("hero_title", e.target.value)}
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
          placeholder="Hero Başlık"
        />
        <textarea
          value={form.hero_subtitle}
          onChange={(e) => handleFormChange("hero_subtitle", e.target.value)}
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
          placeholder="Hero Alt Başlık"
        />
        <textarea
          value={form.story_text}
          onChange={(e) => handleFormChange("story_text", e.target.value)}
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
          placeholder="Hikaye Metni"
        />
        <textarea
          value={form.mission_text}
          onChange={(e) => handleFormChange("mission_text", e.target.value)}
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
          placeholder="Misyon"
        />
        <textarea
          value={form.vision_text}
          onChange={(e) => handleFormChange("vision_text", e.target.value)}
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
          placeholder="Vizyon"
        />
        <textarea
          value={form.cta_heading}
          onChange={(e) => handleFormChange("cta_heading", e.target.value)}
          className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
          placeholder="CTA Başlığı"
        />
        <button
          onClick={insertRecord}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500"
        >
          Kaydet
        </button>
      </div>

      {/* Kayıt Listesi */}
      {records.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg text-white">Kayıtlı Veriler</h2>
          {records.map((record) => (
            <div key={record.id} className="p-4 border border-neutral-700 rounded space-y-2">
              <input
                value={record.hero_title}
                onChange={(e) => updateField(record.id, "hero_title", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <textarea
                value={record.hero_subtitle}
                onChange={(e) => updateField(record.id, "hero_subtitle", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <textarea
                value={record.story_text}
                onChange={(e) => updateField(record.id, "story_text", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <textarea
                value={record.mission_text}
                onChange={(e) => updateField(record.id, "mission_text", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <textarea
                value={record.vision_text}
                onChange={(e) => updateField(record.id, "vision_text", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <textarea
                value={record.cta_heading}
                onChange={(e) => updateField(record.id, "cta_heading", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <button
                onClick={() => deleteRecord(record.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-500"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
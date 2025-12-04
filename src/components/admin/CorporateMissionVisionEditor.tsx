"use client";
import { useEffect, useState } from "react";

interface MissionVisionData {
  id: number;
  mission_text: string;
  vision_text: string;
  is_active: boolean;
}

export default function CorporateMissionVisionEditor() {
  const [form, setForm] = useState<MissionVisionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Veriyi çek
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/corporate/mission-vision", { cache: "no-store" });
      const json = await res.json();

      if (json?.id) {
        setForm({
          id: json.id,
          mission_text: json.mission_text ?? "",
          vision_text: json.vision_text ?? "",
          is_active: json.is_active ?? false,
        });
      } else {
        // Kayıt yoksa yeni oluştur
        const createRes = await fetch("/api/corporate/mission-vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mission_text: "",
            vision_text: "",
            is_active: false,
          }),
        });
        const created = await createRes.json();
        setForm({
          id: created.id,
          mission_text: created.mission_text ?? "",
          vision_text: created.vision_text ?? "",
          is_active: created.is_active ?? false,
        });
      }
    } catch (err) {
      setError("Veri çekilemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field: keyof MissionVisionData, value: any) => {
    if (!form) return;
    setForm((prev) => ({ ...prev!, [field]: value }));
  };

  const saveChanges = async () => {
    if (!form?.id) {
      setError("Kayıt ID'si eksik");
      return;
    }

    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/corporate/mission-vision", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Kaydetme hatası");
      } else {
        setSuccess("Değişiklikler kaydedildi ✅");
        setForm({
          id: json.id,
          mission_text: json.mission_text ?? "",
          vision_text: json.vision_text ?? "",
          is_active: json.is_active ?? false,
        });
      }
    } catch (err) {
      setError("Kaydetme sırasında hata oluştu");
    }
  };

  if (loading || !form) return <p className="text-neutral-400">Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-red-400">Misyon & Vizyon Editor</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <label className="block text-neutral-300 font-semibold mb-2">Misyon açıklaması</label>
      <textarea
        value={form.mission_text}
        onChange={(e) => handleChange("mission_text", e.target.value)}
        className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
        rows={4}
      />

      <label className="block text-neutral-300 font-semibold mb-2">Vizyon açıklaması</label>
      <textarea
        value={form.vision_text}
        onChange={(e) => handleChange("vision_text", e.target.value)}
        className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
        rows={4}
      />

      <label className="flex items-center gap-2 text-neutral-300">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => handleChange("is_active", e.target.checked)}
        />
        Aktif mi?
      </label>

      <button
        onClick={saveChanges}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-500"
      >
        Kaydet
      </button>
    </div>
  );
}